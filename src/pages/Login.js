import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { userData } from '../redux/actions';
import '../styles/Login.css';
import logo from './jogotrivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nome: '',
      isDisabled: true,
    };
  }

  handleGravatarSrc = () => {
    const { email } = this.state;
    const gravatar = md5(email).toString();
    const emailGravatar = `https://www.gravatar.com/avatar/${gravatar}`;
    this.setState({
      email: emailGravatar,
    });
  }

  handleUserData = () => {
    const { saveUserData } = this.props;
    saveUserData(this.state);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleButtonPlay());
  }

  handleButtonPlay = () => {
    const { nome, email } = this.state;
    if (email.length > 0 && nome.length > 0) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleButtonConfig = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  fetchToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    localStorage.setItem('token', json.token);
    const { history } = this.props;
    this.handleGravatarSrc();
    this.handleUserData();
    history.push('/game');
  }

  render() {
    const { nome, email, isDisabled } = this.state;
    return (
      <form className="App">
        <label
          htmlFor="nome"
        >
          <img src={ logo } alt="logo" width="300" />
          Nome:
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            onChange={ this.handleChange }
            value={ nome }
            name="nome"
            data-testid="input-player-name"
          />
        </label>
        <label
          htmlFor="email"
        >
          Email:
          <input
            type="email"
            id="email"
            placeholder="Digite seu email"
            onChange={ this.handleChange }
            value={ email }
            name="email"
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          disabled={ isDisabled }
          type="button"
          onClick={ this.fetchToken }
          data-testid="btn-play"
        >
          Play
        </button>
        <button
          type="button"
          onClick={ this.handleButtonConfig }
          data-testid="btn-settings"
        >
          Settings
        </button>

      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (payload) => dispatch(userData(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveUserData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
