import { AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import * as NPCore from '@jsnp/core';
import NPReact from '@jsnp/react';
import NPerformance from '@jsnp/performance';

const OPTIONS = {
  name: 'Native Blog',
  host: Platform.select({
    ios: 'localhost',
    android: '10.0.2.2',
  }),
};

const CONNECTIONS = [
  NPerformance.connect,
  NPReact.connect,
];

NPCore.connect(OPTIONS, CONNECTIONS);

const initReactRegisterComponent = NPerformance.start('register-component', null, { milliseconds: 1 });

AppRegistry.registerComponent(appName, () => App);
initReactRegisterComponent.stop();