import { createStore, applyMiddleware } from 'redux';
import reducers from 'Common/Reducer';
import socketMiddleWare from '../Socket/middleware';
import State, { state as baseInitialState} from 'Common/State';

const middleWares: Array<any> = [socketMiddleWare];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleWares.push(logger);
}

export default (initialState?: State) => {
  const reduxState = {
    ...baseInitialState,
    ...initialState,
  };

  const store = createStore<State, any, {}, {}>(
    reducers,
    reduxState,
    applyMiddleware(...middleWares),
  );

  return store;
}