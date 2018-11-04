import {
  PerformanceReducerState,
  initialState as performanceInitialState
} from '../Containers/PerformanceList/reducer';
import {
  SocketReducerState,
  initialState as socketInitialState
} from '../Containers/Socket/reducer';

import {
  TitleBarState,
  initialState as titleBarInitialState
} from '../Containers/TitleBar/reducer';

type GlobalReduxState = {
  socket: SocketReducerState;
  performance: PerformanceReducerState;
  titleBar: TitleBarState;
}

export const state: GlobalReduxState = {
  socket: socketInitialState,
  performance: performanceInitialState,
  titleBar: titleBarInitialState,
}

export default GlobalReduxState;