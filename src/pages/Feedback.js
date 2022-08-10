import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Feedback extends React.Component {
  showMsg = (assertions) => {
    const limitScoreMin = 3;
    if (assertions < limitScoreMin) {
      return 'Could be better...';
    }
    return 'Well Done!';
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">{this.showMsg(assertions)}</h2>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-total-score">{ score }</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
});

export default connect(mapStateToProps)(Feedback);
