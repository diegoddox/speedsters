import { combineReducers } from 'redux';
import socketReducer from '../Containers/Socket/reducer';
import performanceReducer from '../Containers/PerformanceList/reducer';
import titleBarReducer from '../Containers/TitleBar/reducer';

export default combineReducers({
  socket: socketReducer,
  performance: performanceReducer,
  titleBar: titleBarReducer
});