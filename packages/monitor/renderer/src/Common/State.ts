import { PerformanceReducerState } from '../Containers/PerformanceList/reducer';
import { SocketReducerState } from '../Containers/Socket/reducer';
import { TitleBarState } from '../Containers/TitleBar/reducer';

type GlobalReduxState = {
  socket: SocketReducerState;
  performance: PerformanceReducerState;
  titleBar: TitleBarState;
}

export default GlobalReduxState;