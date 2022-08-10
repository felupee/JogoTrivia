import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <tittle data-testid="ranking-title">ranking-title</tittle>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Ranking;
