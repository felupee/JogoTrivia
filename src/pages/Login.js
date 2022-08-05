import React from 'react';

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
          onClick={ () => {} }
          data-testid="btn-play"
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
