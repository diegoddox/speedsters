import * as redu from '../Containers/PerformanceList/reducer';

console.log(redu);

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

export const denormalizeData = (performanceData: any) => {
  if (!performanceData) {
    return null;
  }

  return Object.keys(performanceData).reduce((data: any[], key: string) => {
    const obj = performanceData[key];

    /**
     * Check if is an object and we
     * have the time property
     */
    if (obj && typeof obj === 'object' && obj.hasOwnProperty('value')) {
      data.push({
        name: key,
        ...obj,
      });

    /**
     * Else try again but add it to a property data
     * that should be an array of objects.
     */
    } else if (obj && typeof obj === 'object') {
      const newData: any = {
        name: key,
        data: denormalizeData(obj),
      };

      /**
       * Check if the object is a 
       * reactComponent and if so
       * add a flag.
       */
      if (obj.renderCount) {
        newData.isReactComponent = true;
      }

      data.push(newData);
    }
    return data;
  }, []);
}

export const getValueFromPixel = (value: string): number  => Number((value as string).replace('px', ''));

export const isMac = () => process.platform === 'darwin';

export const isWindows = () => process.platform === 'win32';