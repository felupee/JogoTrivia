import React from 'react';
import { connect } from 'react-redux';

class QuestionCard extends React.Component {
  render() {
    const { questions } = this.props;
    return (
      <div>
        <div
          data-testid="question-category"
        >
          Categoria
        </div>
        <div
          data-testid="question-text"
        >
          Questão
        </div>
        <div data-testid="answer-options">
          <button
            type="button"
            data-testid={ `wrong-answer-${index}` }
          >
            Alternativa
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.player.data,
});

export default connect(mapStateToProps)(QuestionCard);
