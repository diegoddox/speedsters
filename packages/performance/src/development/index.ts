import {
  ConnectionOptions,
  PerformanceData,
  StartPerformanceOptions,
  IPerformance,
  BasePerformanceData,
  CoreSocket
} from '@speedsters/type';

import {
  performanceNow,
  isValidStopOptions,
  isValidStartOptions,
  logData,
  isObject
} from '../utils';

import { createSocket, denormalize } from '@speedsters/core';

const DEFAULT_OPTIONS: ConnectionOptions = {
  name: 'Nice Performance',
};

let socket: CoreSocket;

export class SPerformance implements IPerformance {
  private _data: PerformanceData | any = {};
  private hasInitiateConnect: boolean = false;
  private options: ConnectionOptions = {};

  constructor() {
    this.connect = this.connect.bind(this);
    this.mergeData = this.mergeData.bind(this);
  }
  
  get data() {
    return this._data;
  }

  public connect(options: ConnectionOptions = {}) {

    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    // Flag the initialization
    this.hasInitiateConnect = true;

    this.options.onMessage = (e: MessageEvent) => {
      try {
        const msg = JSON.parse(e.data);
        if (isObject(msg) && msg.type && msg.type === 'SOCKET:CLIENT_MONITOR_CONNECTED') {
          socket.sendPerformance(this.data);
        }
      } catch (e) {}
    };

    // Connect with the monitor
    socket = createSocket(options);
    socket.connect();
      
    return this;
  }

  public start(key: string, group?: string, options: StartPerformanceOptions = {}) {

    // Validate and log if the params are wrong
    isValidStartOptions(key, group, options);
    
    const dataObject = {
      [key]: {
        time: performanceNow(),
      } as BasePerformanceData
    };

    /**
     * If the user has pass @milliseconds in
     * the options pass to the payload
     */
    if (options.milliseconds) {
      dataObject[key].milliseconds = options.milliseconds;
    }

    const data: PerformanceData = group ? {
      [group]: {
        ...(this._data[group] as PerformanceData),
        ...dataObject,
      },
    } : dataObject;

    this.mergeData(data);

    return {
      stop: () => {
        const performance: object = this.stop(key, group);
        if (options.verbose) {
          console.log(`@speedsters/performance: ${key} ${performance}`);
        }
        return performance;
      },
    };
  }

  public stop(key: string, group?: string) {
    const currentPerformanceData: any = this._data[group ? group : key];

    // Check if we have start a performance with key/group
    if (!isValidStopOptions(key, group, currentPerformanceData)) return null;

    const timeEnd: number = performanceNow();

    const data = group ? {
      [group]: {
        ...currentPerformanceData,
        [key]: {
          ...currentPerformanceData[key],
          value: timeEnd - currentPerformanceData[key].time,
        },
      },
    } : {
      [key]: {
        ...currentPerformanceData,
        value: timeEnd - currentPerformanceData.time,
      },
    };

    // Merge data
    this.mergeData(data);

    /**
     * Send only if the user has 
     * run the connect method.
     */
    if (this.hasInitiateConnect) {
      socket.sendPerformance(data);
    }

    /**
     * Return the current data.
     */
    return group ? data[group][key] : data[key];
  }

  public createGlobalLog() {
    if (typeof window !== 'undefined') {
      (window as any).__lognp = (tableFilter?: string[]) => this.log(tableFilter);
    }
  }

  public clear() {
    this._data = {};
  }

  private mergeData(data: PerformanceData) {
    this._data = {
      ...this._data,
      ...data,
    };
  }

  public log(tableFilter?: string[]) {
    logData(denormalize(this._data), tableFilter);
  }
}

const sperformance = new SPerformance();

export default sperformance;