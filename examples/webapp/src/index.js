import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as NPCore from '@speedsters/core';
import jsnpr from '@speedsters/react';
import jsnpp from '@speedsters/performance';

const OPTIONS = {
  name: 'Web React App',
};

const CONNECTIONS = [
  jsnpp.connect,
  jsnpr.connect,
];

NPCore.connect(OPTIONS, CONNECTIONS);
jsnpp.createGlobalLog();

ReactDOM.render(<App />, document.getElementById('root'));