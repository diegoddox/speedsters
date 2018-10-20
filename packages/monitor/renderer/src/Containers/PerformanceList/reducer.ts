import createReducer from 'Common/create-reducer';
import { SOCKET_PERFORMANCE_DATA, SocketData } from '../Socket/reducer';

export const ALL_PERFORMANCES = 'ALL';
const SET_CURRENT_PERFORMANCE = 'SET_CURRENT_PERFORMANCE';

type PerformanceDataState = {
  [x: string]: any;
};

type ApplicationNames = Array<string>;

export type PerformanceReducerState = {
  byName: PerformanceDataState;
  applicationNames: ApplicationNames;
  selectedPerformance: string | null;
}

const initialState: PerformanceReducerState = {
  byName: {},
  applicationNames: [],
  selectedPerformance: ALL_PERFORMANCES,
}

const byName = createReducer({}, {
  [SOCKET_PERFORMANCE_DATA]: (state: PerformanceDataState, payload: SocketData) => ({
    ...state,
    [payload.applicationName]: {
      ...state[payload.applicationName],
      ...payload.data,
    },
  })
});

const applicationNames = createReducer([], {
  [SOCKET_PERFORMANCE_DATA]: (state: ApplicationNames, payload: any) => {
    if (state.indexOf(payload.applicationName) === -1) {
      return [
        ...state,
        payload.applicationName,
      ];
    }
    return state;
  },
});

const selectedPerformance = createReducer(ALL_PERFORMANCES, {
  [SET_CURRENT_PERFORMANCE]: (_: any, payload: string) => payload,
});

export default (state: PerformanceReducerState = initialState, action: any) => ({
  byName: byName(state.byName, action, state),
  applicationNames: applicationNames(state.applicationNames, action, state),
  selectedPerformance: selectedPerformance(state.selectedPerformance, action, state),
});

export const selectPerformance = (performanceName: string) => ({
  type: SET_CURRENT_PERFORMANCE,
  payload: performanceName,
});