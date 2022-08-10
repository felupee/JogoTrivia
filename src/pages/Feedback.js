import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  showMsg = (score) => {
    const limitScoreMin = 3;
    if (score < limitScoreMin) {
      return 'Could be better...';
    }
    return 'Well Done!';
  };

  render() {
    const { assertions } = this.props;
    return (
      <h2 data-testid="feedback-text">{this.showMsg(assertions)}</h2>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
