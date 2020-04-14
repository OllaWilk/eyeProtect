import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: 'off',
    time: 0,
    timer: null,
  }

  formatTime(allSeconds) {
    const minutes = Math.floor(allSeconds/60);
    const seconds = Math.floor(allSeconds - (minutes*60));

    return `${(minutes < 10 ? `0${minutes}` : minutes)} : ${(seconds < 10 ? `0${seconds}` : seconds)}`;
  }

  step() {
    this.setState({ time: this.state.time - 1 });

    if(this.state.time === 0) {
      this.setState ({
        status: this.state.status === 'work'? 'rest' : 'work',
        time: this.state.status === 'work'? 20 : 1200,
      });
      this.playBell();
    }
  }

  timerInterval = setInterval(() => this.step(), 1000);

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
      timer: this.timerInterval,
    });
  }

  stopTimer = () => {
    this.setState({
      status: 'off',
      time: 0,
      timer: null,
    });
  }

  componentWillUnmount () {
    clearInterval(this.timerInterval);
  }

  closeApp() {
    window.close();
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.state.status === 'off' ? (
          <section>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
            <button className="btn" onClick={this.startTimer}>Start</button>
          </section>
        ):''}

        {this.state.status == 'work' ? (
          <img src="./images/Work.png" />
        ): ''}

        {this.state.status == 'rest' ? (
          <img src="./images/Rest.png" />
        ):''}

        {this.state.status !== 'off' ? (
          <section>
            <div className="timer">
              {this.formatTime(this.state.time)}
            </div>
            <button className="btn" onClick={this.stopTimer}>Stop</button>
          </section>
        ):''}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
