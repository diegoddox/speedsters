export const performanceNow = () => {
  if (
    typeof window != 'undefined' &&
    'performance' in window === true &&
    navigator.product != 'ReactNative'
  ) {
    return performance.now();
  }
  return Date.now();
};


export const isObject = (obj: object) => typeof obj !== null && typeof obj === 'object';
