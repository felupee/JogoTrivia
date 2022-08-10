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
    const { assertions } = this.props;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">{this.showMsg(assertions)}</h2>
      </div>
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
