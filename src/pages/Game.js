import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { hideAnswer, questionIndex, triviaThunk } from '../redux/actions/index';
import QuestionCard from '../Components/QuestionCard';

class Game extends React.Component {
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
  }

  render() {
    return (
      <div>
        <Header />
        <QuestionCard />
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
