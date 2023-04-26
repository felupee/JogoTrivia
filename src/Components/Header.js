import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, score } = this.props;

    return (
      <header className="Appheader">
        <div>
          <p data-testid="header-player-name">
            Jogador:
            {' '}
            {name}
          </p>
        </div>
        <div>
          <p className="score" data-testid="header-score">
            Score:
            {' '}
            {score}
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
