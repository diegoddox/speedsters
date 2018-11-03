import denormalizeData from 'denormalize';

export const createReducer = (initialState: any, fnMap: {[key: string]: (state: any, payload: any, mainState?: any) => any}) => {
  return (state = initialState, { type, payload}: any, mainState?: any) => {
    const handle = fnMap[type];
    return handle ? handle(state, payload, mainState) : state;
  }
}

export const hasPerformanceIssue = (performance: number | string, milliseconds: number) => {
  if (milliseconds) {
    return performance > milliseconds;
  }
}

export const sortPerformanceData = (data: Array<any>) => data.slice(0).sort((a) => {
  if (a.data) {
    return -1;
  }
  return 1;
});

export const millisecondsToSeconds = (mil: number) => ((mil % 60000) / 1000).toFixed(3) + 'ms';

export const denormalize = (performances: any, performanceName: string) => {
  const data: any = [];

  if (performanceName.toLocaleLowerCase() === 'all') {
    Object.keys(performances).forEach((key: string) => {
      data.push({
        applicationName: key,
        data: denormalizeData(performances[key]),
      });
    });
  } else {
    data.push({
      applicationName: performanceName,
      data: denormalizeData(performances[performanceName]),
    });
  }

  return data;
}

export const getValueFromPixel = (value: string): number  => Number((value as string).replace('px', ''));

export const isMac = () => process.platform === 'darwin';

export const isWindows = () => process.platform === 'win32';