import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { resetGame } from '../redux/actions';
import '../styles/Ranking.css';

class Ranking extends React.Component {
  handleHome = () => {
    const { history, restart } = this.props;
    restart();
    history.push('/');
  }

  render() {
    const rankingArray = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    return (
      <div className="ranking">
        <tittle data-testid="ranking-title">Ranking Geral</tittle>
        { rankingArray.map((player, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        ))}
        <button
          type="button"
          onClick={ this.handleHome }
          data-testid="btn-go-home"
        >
          Home
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  restart: () => dispatch(resetGame()),
});

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  restart: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
