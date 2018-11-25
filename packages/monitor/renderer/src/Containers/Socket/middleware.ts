import { Dispatch } from 'redux'
import {
  SOCKET_PERFORMANCE_DATA,
  SOCKET_CONNECTING,
  SOCKET_CONNECTED,
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  SOCKET_CONNECTION_ERROR,
  SOCKET_CLIENT_MONITOR_CONNECTED,
  SOCKET_CLIENT_MESSAGE,
} from './reducer';

const socketMiddleWare = (() => {
  let socket: WebSocket | null;
  const onOpen = (ws: WebSocket, dispatch: Dispatch) => () => {
    ws.send(JSON.stringify({ type: SOCKET_CLIENT_MONITOR_CONNECTED }));
    dispatch({ type: SOCKET_CONNECTED });
  };

  const onMessage = (dispatch: Dispatch) => (e: any) => {
    let msg: any = {
      type: 'NONE',
    };

    try {
      msg = JSON.parse(e.data);
    } catch (e) {
      console.error('Error while parsing socket data: ', e);
    }

    switch (msg.type) {
      case SOCKET_PERFORMANCE_DATA:
        return dispatch({
          type: SOCKET_PERFORMANCE_DATA,
          payload: msg,
        });
      case SOCKET_CONNECTED:
        return dispatch({ type: SOCKET_CONNECTED });
      default:
        console.warn('Socket: unknown action: ', msg.type, msg);
    }
  };

  const onClose = (dispatch: Dispatch) => (e: any) => {
    dispatch({
      type: SOCKET_DISCONNECT,
    });
  };

  const onError = (dispatch: Dispatch) => (e: any) => {
    dispatch({
      type: SOCKET_CONNECTION_ERROR,
      payload: e
    })
  }

  return (store: any) => (next: any) => (action: any) => {
    const { dispatch } = store;
    switch (action.type) {
      case SOCKET_CONNECT:
        if (socket != null) {
          socket.close();
        }

        dispatch({
          type: SOCKET_CONNECTING,
        });

        socket = new WebSocket('ws://localhost:1338?nice-performance-monitor/');
        socket.onopen = onOpen(socket, dispatch);
        socket.onmessage = onMessage(dispatch);
        socket.onclose = onClose(dispatch);
        socket.onerror = onError(dispatch);

        break;
      case SOCKET_DISCONNECT:
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
        socket = null;
        break;
      case SOCKET_CLIENT_MESSAGE:
        if (socket && socket.OPEN) {
          socket.send(JSON.stringify(action));
        }
        break;
      default:
        return next(action);
    }
  };
})();

export default socketMiddleWare;