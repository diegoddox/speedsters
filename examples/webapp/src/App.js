import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import jsnpr from '@jsnp/react';
import jsnpp from '@jsnp/performance';

class App extends Component {
  constructor(props) {
    super(props);

    jsnpr.component(this);
  }

  componentDidMount() {
    const mount = jsnpp.start('will-mount-timeout', null, {
      milliseconds: 1000
    });
    setTimeout(() => {
      mount.stop();

      this.setState({
        updateTheDom: true,
      })
    }, 2000)

    setTimeout(() => this.setState({
      updateTheDom: false,
    }), 4000)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
