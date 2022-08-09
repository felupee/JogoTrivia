import PropTypes from 'prop-types';
import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 30 };
  }

  componentDidMount() {
    const mil = 1000;
    this.interval = setInterval(() => this.tick(), mil);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState((state) => ({
      seconds: state.seconds - 1,
    }), () => {
      const { seconds } = this.state;
      if (seconds === 0) {
        this.setState({
          seconds: 30,
        });
        const { btndisable } = this.props;
        btndisable();
      }
    });
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        Timer:
        {' '}
        {seconds}
      </div>
    );
  }
}
Timer.propTypes = {
  btndisable: PropTypes.func.isRequired,
};

export default Timer;
