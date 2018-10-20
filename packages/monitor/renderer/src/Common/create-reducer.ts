export default (initialState: any, fnMap: {[key: string]: (state: any, payload: any, mainState?: any) => any}) => {
  return (state = initialState, { type, payload}: any, mainState?: any) => {
    const handle = fnMap[type];
    return handle ? handle(state, payload, mainState) : state;
  }
}
