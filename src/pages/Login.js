import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nome: '',
      isDisabled: true,
    };
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

  fetchToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    localStorage.setItem('token', json.token);
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { nome, email, isDisabled } = this.state;
    return (
      <form>
        <label
          htmlFor="nome"
        >
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
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
