import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/QuestionCard.css';
import { showAnswer } from '../redux/actions';

class QuestionCard extends React.Component {
  handleDataTestId = (alt, i) => {
    const { questions, index } = this.props;
    const corrAnswer = 'correct_answer';
    if (alt === questions[index][corrAnswer]) {
      return 'correct-answer';
    }
    return `wrong-answer-${i}`;
  }

  handleShow = () => {
    const { showAns } = this.props;
    showAns();
  }

  handleRandomAlternatives = (alternatives) => {
    const arrayAleatorio = [];
    while (arrayAleatorio.length < alternatives.length) {
      const num = Math.floor(Math.random() * alternatives.length);
      if (!(arrayAleatorio.find((item) => item === alternatives[num]))) {
        arrayAleatorio.push(alternatives[num]);
      }
    }
    return arrayAleatorio;
  }

  render() {
    const { questions, index, show } = this.props;
    if (questions.length === 0) return 'Loading';
    const incAnswer = 'incorrect_answers';
    const corrAnswer = 'correct_answer';
    const alternatives = [questions[index][corrAnswer], ...questions[index][incAnswer]];
    const randomAlternatives = this.handleRandomAlternatives(alternatives);
    return (
      <div>
        <div
          data-testid="question-category"
        >
          {questions[index].category}
        </div>
        <div
          data-testid="question-text"
        >
          {questions[index].question}
        </div>
        <div
          aria-hidden="true"
          data-testid="answer-options"
          onClick={ this.handleShow }
        >
          {
            randomAlternatives.map((alt, i) => (
              <button
                className={ show
                  && (alt === questions[index][corrAnswer] ? 'green' : 'red') }
                key={ i }
                type="button"
                data-testid={ this.handleDataTestId(alt, i) }
              >
                { alt }
              </button>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.player.data,
  index: state.player.index,
  show: state.player.show,
});

const mapDispatchToProps = (dispatch) => ({
  showAns: () => dispatch(showAnswer()),
});

QuestionCard.propTypes = {
  question: PropTypes.arrayOf(PropTypes.string),
  index: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
