import { PerformanceData } from '@speedsters/type';

const isObject = (obj: object) => obj && obj !== null && typeof obj === 'object';

export default function denormalize(performanceData: PerformanceData) {
  if (!performanceData) {
    return null;
  }

  return Object.keys(performanceData).reduce((data: any[], key: string) => {
    const obj = performanceData[key];
    /**
     * Check if is an object and we
     * have the time property
     */
    if (isObject(obj) && obj.hasOwnProperty('value')) {
      data.push({
        name: key,
        ...obj,
      });

    /**
     * Else try again but add it to a property data
     * that should be an array of objects.
     */
    } else if (isObject(obj)) {
      const newData: any = {
        name: key,
        data: denormalize((obj as PerformanceData)),
      };

      /**
       * Check if the object is a 
       * reactComponent and if so
       * add a flag.
       */
      if ((obj as any).renderCount) {
        newData.isReactComponent = true;
      }

      data.push(newData);
    }
    return data;
  }, []);
}