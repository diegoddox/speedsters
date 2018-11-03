import { IPerformance } from '@speedsters/type';

const nicePerformance: IPerformance = {
  data: {},
  connect: () => nicePerformance,
  start: () => ({ stop: () => null }),
  stop: () => null,
  clear: () => {},
  createGlobalLog: () => {},
  log: () => {
    console.log('speedsters is on production mode.');
  },
};

export default nicePerformance;