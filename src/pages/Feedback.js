import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { resetGame } from '../redux/actions';

class Feedback extends React.Component {
  showMsg = (assertions) => {
    const limitScoreMin = 3;
    if (assertions < limitScoreMin) {
      return 'Could be better...';
    }
    return 'Well Done!';
  };

  handleResetClick = () => {
    const { restart, history } = this.props;
    restart();
    history.push('/');
  }

  handleRankingClick = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">{this.showMsg(assertions)}</h2>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleResetClick }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleRankingClick }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  restart: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  restart: () => dispatch(resetGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
