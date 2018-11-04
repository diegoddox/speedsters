import { createReducer } from '../../Utils';

const TOGGLE_TOP_LEFT_MENU = 'TOGGLE_TOP_LEFT_MENU';
const CLOSE_PERFORMANCE_MENU = 'CLOSE_PERFORMANCE_MENU';
const OPEN_PERFORMANCE_MENU = 'OPEN_PERFORMANCE_MENU';

const OPEN_QUICK_SEARCH = 'OPEN_QUICK_SEARCH';
const CLOSE_QUICK_SEARCH = 'CLOSE_QUICK_SEARCH';
const UPDATE_QUICK_SEARCH_TEXT = 'UPDATE_QUICK_SEARCH_TEXT';

export type TitleBarState = {
  openTopLeftMenu: boolean;
  displayPerformanceMenu: boolean;
  quickSearchIsOpen: boolean;
  quickSearchText: string;
}

export const initialState: TitleBarState = {
  openTopLeftMenu: false,
  displayPerformanceMenu: false,
  quickSearchIsOpen: false,
  quickSearchText: '',
};

export default createReducer(initialState, {
  [TOGGLE_TOP_LEFT_MENU]: (state: TitleBarState) => ({
    ...state,
    openTopLeftMenu: state.openTopLeftMenu,
  }),
  [CLOSE_PERFORMANCE_MENU]: (state: TitleBarState) => ({
    ...state,
    displayPerformanceMenu: false,
  }),
  [OPEN_PERFORMANCE_MENU]: (state: TitleBarState) => ({
    ...state,
    displayPerformanceMenu: true,
  }),
  [OPEN_QUICK_SEARCH]: (state: TitleBarState) => ({
    ...state,
    quickSearchIsOpen: true,
  }),
  [CLOSE_QUICK_SEARCH]: (state: TitleBarState) => ({
    ...state,
    quickSearchIsOpen: false,
  }),
  [UPDATE_QUICK_SEARCH_TEXT]: (state: TitleBarState, payload: string) => ({
    ...state,
    quickSearchText: payload,
  })
});

export const toggleTopLeftMenuAction = {
  type: TOGGLE_TOP_LEFT_MENU,
};

export const closePerformanceMenu = {
  type: CLOSE_PERFORMANCE_MENU,
};

export const openPerformanceMenu = {
  type: OPEN_PERFORMANCE_MENU,
};

export const openQuickSearchAction = {
  type: OPEN_QUICK_SEARCH,
};

export const closeQuickSearchAction = {
  type: CLOSE_QUICK_SEARCH,
};

export const updateQuickSearchText = (searchText: string) => ({
  type: UPDATE_QUICK_SEARCH_TEXT,
  payload: searchText,
});