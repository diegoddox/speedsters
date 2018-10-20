import { JsnpPerformance } from '@jsnp/type';

const nicePerformance: JsnpPerformance = {
  data: {},
  connect: () => nicePerformance,
  start: () => ({ stop: () => null }),
  stop: () => null,
  clear: () => {},
  createGlobalLog: () => {},
  log: () => {
    console.log('NPerformance is on production mode.');
  },
};

export default nicePerformance;