import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import QuestionCard from '../Components/QuestionCard';
import Timer from '../Components/Timer';
import { hideAnswer,
  questionIndex, saveScore, triviaThunk } from '../redux/actions/index';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      seconds: 30,
    };
  }

  componentDidMount() {
    const { fetchQuestions, error, history } = this.props;
    fetchQuestions();
    const token = localStorage.getItem('token');
    if (token === 'INVALID_TOKEN')history.push('/');
    if (error.length > 0) history.push('/');
  }

  handleClickNextBtn = () => {
    const { changeIndex, hide } = this.props;
    changeIndex();
    hide();
    this.setState({
      disable: false,
      seconds: 30,
    });
  }

  handledisable = () => {
    this.setState({
      disable: true,
    });
  }

  tick = () => {
    this.setState((state) => ({
      seconds: state.seconds - 1,
    }), () => {
      const { seconds } = this.state;
      if (seconds === 0) {
        this.setState({
          seconds: 30,
        });
        this.handledisable();
      }
    });
  }

  operacao = ({ target }, difficulty) => {
    const { name } = target;
    const { seconds } = this.state;
    const { score } = this.props;
    const dez = 10;
    const dificuldades = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    if (name === 'correct') {
      const totalScore = dez + (seconds * dificuldades[difficulty]);
      score(totalScore);
    }
  }

  render() {
    const { disable, seconds } = this.state;
    return (
      <div>
        <Header />
        <Timer tick={ this.tick } seconds={ seconds } />
        <QuestionCard disable={ disable } operacao={ this.operacao } />
        <button
          type="button"
          onClick={ this.handleClickNextBtn }
        >
          Next
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.player.data,
  error: state.player.error,
  show: state.player.show,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(triviaThunk()),
  changeIndex: () => dispatch(questionIndex()),
  hide: () => dispatch(hideAnswer()),
  score: (payload) => dispatch(saveScore(payload)),
});

Game.propTypes = {
  error: PropTypes.string,
  fetchQuestions: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
