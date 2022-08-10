import PropTypes from 'prop-types';
import React from 'react';

class Timer extends React.Component {
  componentDidMount() {
    const { tick } = this.props;
    const mil = 1000;
    this.interval = setInterval(() => tick(), mil);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /*   tick() {
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
  } */

  render() {
    const { seconds } = this.props;
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
  tick: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default Timer;
