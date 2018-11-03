import { AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import * as score from '@speedsters/core';
import sreact from '@speedsters/react';
import sperformance from '@speedsters/performance';

const OPTIONS = {
  name: 'Native Blog',
  host: Platform.select({
    ios: 'localhost',
    android: '10.0.2.2',
  }),
};

const CONNECTIONS = [
  sperformance.connect,
  sreact.connect,
];

score.connect(OPTIONS, CONNECTIONS);

const initReactRegisterComponent = sperformance.start('register-component', null, { milliseconds: 1 });

AppRegistry.registerComponent(appName, () => App);
initReactRegisterComponent.stop();