import { createStore, applyMiddleware } from 'redux';
import reducers from 'Common/Reducer';
import socketMiddleWare from '../Socket/middleware';

const middleWares: Array<any> = [socketMiddleWare];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleWares.push(logger);
}

export default () => {
  const store = createStore(
    reducers,
    applyMiddleware(...middleWares)
  );

  return store;
}