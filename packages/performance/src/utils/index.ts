export const flattenArray = (data: any[]) => {
  function merge(data: any[], array: any[], name: string) {
    data.forEach(item => {
      array.push({
        name: name + '->' +item.name,
        value: item.value
      });
    });
  }

  return data.reduce((array, item) => {
    if (item.isReactComponent) {
      item.data.forEach((x: any) => {
        const name =`React: ${item.name}.${x.name}`;
        array.push({
          ...x,
          value: x.value,
          name: name,
        });

        if (x.hasOwnProperty('timeline')) {
          x.timeline.forEach((s: any) => {
            array.push({
              ...s,
              name: `${name}.timeline`,
            });
          });
        }
      });
    } else if (item.hasOwnProperty('value')) {
      array.push(item);
    } else if (Array.isArray(item.data)) {
      merge(item.data, array, item.name);
    }
    return array;
  }, []);
};

export const logData = (data: any[] | null, tableFilter?: string[]) => {
  if (!data) {
    return console.log('@speedsters/performance: there is not performance to log at the moment.');
  }

  const flattened = flattenArray(data);
  if (console.table) {
    console.table(flattened, tableFilter);
  } else {
    console.log(flattened);
  }
};

export const performanceNow = () => {
  if (typeof window != 'undefined' && 'performance' in window === true) {
    return performance.now();
  }
  return Date.now();
};

export const isValidStopOptions = (key: string, group?: string, data?: any): boolean => {
  if (group && !data || group && !data[key]) {
    console.warn(`@speedsters/performance: You\'re trying to stop a key:(${key}) in a group:${group} that doesn\'t exist.`);
    return false;
  } else if (key && !group && !data) {
    console.warn(`@speedsters/performance: You\'re trying to stop a key:(${key}) that doesn\'t exists.`);
    return false;
  }
  return true;
}

export const isValidStartOptions = (key: string, group?: string, options?: any): void => {
  if (key && typeof key !== 'string' || group && typeof group !== 'string') {
    console.warn('@speedsters/performance: start performance. key/group must be a string');
  }
  
  if (options !== undefined && options !== null && typeof options !== 'object') {
    console.warn('@speedsters/performance: start performance. options must be an object');
  }
}

export const isObject = (obj: object) => typeof obj !== null && typeof obj === 'object'; 
