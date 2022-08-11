import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import QuestionCard from '../Components/QuestionCard';
import Timer from '../Components/Timer';
import { hideAnswer, questionIndex, saveScore, triviaThunk } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      seconds: 30,
      showNextBtn: false,
    };
  }

  componentDidMount() {
    const { fetchQuestions, error, history } = this.props;
    fetchQuestions();
    const token = localStorage.getItem('token');
    if (token === 'INVALID_TOKEN')history.push('/');
    if (error.length > 0) history.push('/');
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
  }

  componentWillUnmount() {
    const { gravatarEmail, name, placar } = this.props;
    const player = {
      name,
      score: placar,
      picture: gravatarEmail,
    };
    console.log(player);
    const item = JSON.parse(localStorage.getItem('ranking'));
    this.setLocalStorage([...item, player]);
  }

  setLocalStorage=(player) => {
    localStorage.setItem('ranking', JSON.stringify(player));
  };

  handleClickNextBtn = () => {
    const { changeIndex, hide, index, history } = this.props;
    const four = 4;
    changeIndex();
    if (index === four) history.push('/feedback');
    hide();
    this.setState({
      disable: false,
      seconds: 30,
      showNextBtn: false,
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
    this.handleNextBtn();
    if (name === 'correct') {
      const totalScore = dez + (seconds * dificuldades[difficulty]);
      score(totalScore);
    }
  }

  handleNextBtn = () => {
    this.setState({
      showNextBtn: true,
    });
  }

  render() {
    const { disable, seconds, showNextBtn } = this.state;
    return (
      <div>
        <Header />
        <Timer tick={ this.tick } seconds={ seconds } />
        <QuestionCard
          disable={ disable }
          operacao={ this.operacao }
        />
        {
          showNextBtn && (
            <button
              type="button"
              onClick={ this.handleClickNextBtn }
              data-testid="btn-next"
            >
              Next
            </button>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.player.data,
  error: state.player.error,
  show: state.player.show,
  index: state.player.index,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  placar: state.player.score,
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
