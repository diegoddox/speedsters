import {
  CreateSocketOptions,
  Data,
  JsnpReact as JsnpReactType,
  ReactComponentData,
  ReactComponentOptions,
  CoreSocket
} from '@jsnp/type';

import { createSocket } from '@jsnp/core';
import { performanceNow } from '../utils';

export const RENDER_COUNT = 'renderCount';

const COMPONENT_DID_MOUNT = 'componentDidMount';
const COMPONENT_DID_UPDATE = 'componentDidUpdate';

const DEFAULT_COMPONENT_OPTIONS: ReactComponentOptions = {
  excludes: {},
  milliseconds: null,
};

const RENDER = 'render';

let socket: CoreSocket;

export class JsnpReact implements JsnpReactType {
  private _data: Data | any = {};
  private hasInitiateConnection: boolean = false;

  constructor() {
    this.connect = this.connect.bind(this);
  }
  
  get data() {
    return this._data;
  }

  public connect(options: CreateSocketOptions = {}) {
    // Flag the initialization
    this.hasInitiateConnection = true;

    socket = createSocket(options);
    socket.connect();
    return this;
  }

  public component(_this: any, options?: ReactComponentOptions): any {
    const methods = [];

    const proto = Object.getPrototypeOf(_this);

    if (!proto) {
      return console.warn('NPerformance: looks like you\'re trying to run NPerformance.reactComponent in an anonymous component.');
    }

    // Get the React Class/Component name.
    const COMPONENT_NAME: string = _this.constructor && _this.constructor.displayName || _this.constructor.name || 'ReactComponentClass';

    const { milliseconds, excludes }: ReactComponentOptions = { ...DEFAULT_COMPONENT_OPTIONS, ...options };

    const performanceData: ReactComponentData = {
      [COMPONENT_NAME]: {
        [RENDER_COUNT]: {
          value: 0,
          timing: 0,
          timeline: []
        },
      },
    };

    const hasDidUpdate = !!proto[COMPONENT_DID_UPDATE];

    if (!hasDidUpdate) {
      proto[COMPONENT_DID_UPDATE] = function componentDidUpdate() {}
    }

    let firstRenderingStartTime: number | any = null;
    let renderStartTime: number | any = null;
    
    function updateRenderCount() {
      const time = performanceNow();

      // Update the amount of times the component has rendering
      performanceData[COMPONENT_NAME][RENDER_COUNT].value += 1;

      /**
       * Calculate the timing since the component
       * was mounted.
       */
      performanceData[COMPONENT_NAME][RENDER_COUNT].timing = time - firstRenderingStartTime;

      // Save to the timeline.
      performanceData[COMPONENT_NAME][RENDER_COUNT].timeline.push({
        timing: time - renderStartTime,
        milliseconds,
      });
    }

    for (let name of Object.getOwnPropertyNames(proto)) {
      const func = _this[name];

      // @ts-ignore: excludes can be undefined
      if(typeof func === 'function' && !excludes[name]){

        _this[name] = (...args: any[]) => {
          // Start time
          const time = performanceNow();

          const isRenderMethod = name === RENDER;

          /**
           * If is the first render we update 
           * the @firstRenderingTime value
           */
          if (isRenderMethod && firstRenderingStartTime === null) {
            firstRenderingStartTime = time;
          }

          /**
           * Update @renderStartTime so we can
           * measure on @COMPONENT_DID_UPDATE
           */
          if (isRenderMethod) {
            renderStartTime = time;
          }

          if (name === COMPONENT_DID_MOUNT) {
            // Update the renderCount object
            updateRenderCount();
          }

          /**
           * Each time we update the component
           * update the renderCount as well.
           */
          if (name == COMPONENT_DID_UPDATE) {
            updateRenderCount();
          }

          const res = func.apply(_this, args);
          const timing = performanceNow() - time;

          /**
           * We don't wanna add any performance
           * if name is equal to @RENDER or 
           * for COMPONENT_DID_UPDATE if we created.
           */


          if (
            !isRenderMethod &&
            name !== COMPONENT_DID_UPDATE ||
            name === COMPONENT_DID_UPDATE &&
            hasDidUpdate
          ) {
            performanceData[COMPONENT_NAME][name] = {
              value: timing
            };
          }

          this._data = {
            ...this._data,
            ...performanceData,
          };

          /**
           * Send only if the user has 
           * run the @connect method.
           */
          if (this.hasInitiateConnection) {
            socket.sendPerformance(performanceData);
          }

          return res;
        };

        methods.push(name);
      }
    }

    return methods;
  }
}

const jsnpr = new JsnpReact();
export default jsnpr;