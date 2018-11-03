import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as score from '@speedsters/core';
import sreact from '@speedsters/react';
import sperformance from '@speedsters/performance';

const OPTIONS = {
  name: 'Web React App',
};

const CONNECTIONS = [
  sperformance.connect,
  sreact.connect,
];

score.connect(OPTIONS, CONNECTIONS);
sperformance.createGlobalLog();

ReactDOM.render(<App />, document.getElementById('root'));