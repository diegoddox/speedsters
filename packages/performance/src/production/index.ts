import { IPerformance } from '@speedsters/type';

const SPerformance: IPerformance = {
  data: {},
  connect: () => SPerformance,
  start: () => ({ stop: () => null }),
  stop: () => null,
  clear: () => {},
  createGlobalLog: () => {},
  log: () => {
    console.log('speedsters is on production mode.');
  },
};

export default SPerformance;