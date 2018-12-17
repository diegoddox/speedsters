import createReducer from 'Common/create-reducer';

export const SOCKET_PERFORMANCE_DATA = 'SOCKET:PERFORMANCE_DATA';
export const SOCKET_CONNECTING = 'SOCKET:CONNECTING';
export const SOCKET_CONNECTED = 'SOCKET:CONNECTED';
export const SOCKET_CONNECT = 'SOCKET:CONNECT';
export const SOCKET_DISCONNECT = 'SOCKET:DISCONNECT';
export const SOCKET_CONNECTION_ERROR = 'SOCKET:CONNECTION:ERROR';
export const SOCKET_CLIENT_MONITOR_CONNECTED = 'SOCKET:CLIENT_MONITOR_CONNECTED';

/**
 * This will be used on the server-side
 * any change here should reflect the on
 * server as well.
 */
export const SOCKET_CLIENT_MESSAGE = 'SOCKET_CLIENT_MESSAGE';

export type SocketData = {
  applicationName: string;
  data: {
    [x: string]: any;
  };
}

export type SocketReducerState = {
  isConnecting?: boolean;
  isConnected?: boolean;
}

export const initialState = {
  isConnected: false,
};

export default createReducer(initialState, {
  [SOCKET_CONNECTING]: (state: SocketReducerState) => ({
    ...state,
    isConnecting: true,
  }),
  [SOCKET_CONNECTED]: (state: SocketReducerState, payload: any) => ({
    ...state,
    isConnecting: false,
    isConnected: true,
  }),
  [SOCKET_DISCONNECT]: (state: SocketReducerState) => ({
    ...state,
    isConnecting: false,
    isConnected: false
  }),
  [SOCKET_CONNECTION_ERROR]: (state: SocketReducerState) => ({
    ...state,
    isConnecting: false,
    isConnected: false,
  }),
});

export const connectSocketAction = {
  type: SOCKET_CONNECT,
};

type SendSocketMessagePayload = {
  name: string;
  packageId: string;
  socketPayload: {
    type: string;
    payload?: any;
  };
};

export const sendSocketMessage = (payload: SendSocketMessagePayload) => ({
  type: SOCKET_CLIENT_MESSAGE,
  payload,
});