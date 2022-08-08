import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { triviaThunk } from '../redux/actions/index';
import QuestionCard from '../Components/QuestionCard';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const { fetchQuestions, error, history } = this.props;
    fetchQuestions();
    if (error.length > 0) history.push('/');
  }

  render() {
    const { index } = this.state;
    return (
      <div>
        <Header />
        <QuestionCard index={ index } />
        <button
          type="button"
          onClick={ () => {} }
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
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(triviaThunk()),
});

Game.propTypes = {
  error: PropTypes.string,
  fetchQuestions: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
