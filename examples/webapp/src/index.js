import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import NPReact from '@jsnp/react';
import NPerformance from '@jsnp/performance';

const OPTIONS = {
  name: 'Web React App',
};

const CONNECTIONS = [
  NPerformance.connect,
  NPReact.connect,
];

NPCore.connect(OPTIONS, CONNECTIONS);
NPerformance.createGlobalLog();

ReactDOM.render(<App />, document.getElementById('root'));