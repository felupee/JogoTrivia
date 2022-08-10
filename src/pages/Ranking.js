import PropTypes from 'prop-types';
import React from 'react';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    const rankingArray = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    return (
      <div>
        <tittle data-testid="ranking-title">ranking-title</tittle>
        { rankingArray.map((player, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
            <img src={ player.picture } alt="gravatar" />
          </div>
        ))}
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
