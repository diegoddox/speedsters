import { JsnpPerformance } from '@jsnp/type';

const nicePerformance: JsnpPerformance = {
  data: {},
  connect: () => nicePerformance,
  start: () => ({ stop: () => null }),
  stop: () => null,
  clear: () => {},
  createGlobalLog: () => {},
  log: () => {
    console.log('Jsnp is on production mode.');
  },
};

export default nicePerformance;