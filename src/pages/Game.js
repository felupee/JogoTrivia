import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import QuestionCard from '../Components/QuestionCard';
import Timer from '../Components/Timer';
import { hideAnswer, questionIndex, triviaThunk } from '../redux/actions/index';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: false,
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
    });
  }

  handledisable = () => {
    this.setState({
      disable: true,
    });
  }

  render() {
    const { disable } = this.state;
    return (
      <div>
        <Header />
        <Timer btndisable={ this.handledisable } />
        <QuestionCard disable={ disable } />
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
});

Game.propTypes = {
  error: PropTypes.string,
  fetchQuestions: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
