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

    //return `${(minutes < 10 ? `0${minutes}` : minutes)} : ${(seconds < 10 ? `0${seconds}` : seconds)}`;

    const timeOutput = `${(minutes < 10 ? `0${minutes}` : minutes)} : ${(seconds < 10 ? `0${seconds}` : seconds)}`;
    return timeOutput;
  }

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.state.status == 'off' ? (
          <section>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
            <button className="btn">Start</button>
          </section>
        ):''}

        {this.state.status == 'work' ? (
          <img src="./images/work.png" />
        ): ''}

        {this.state.status == 'rest' ? (
          <img src="./images/rest.png" />
        ):''}

        {this.state.status !== 'off' ? (
          <section>
            <div className="timer">
              18:23
            </div>
            <button className="btn">Stop</button>
          </section>
        ):''}
        <button className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
