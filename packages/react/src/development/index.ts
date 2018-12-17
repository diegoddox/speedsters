import {
  ConnectionOptions,
  IReact as SReactType,
  ReactComponentData,
  RenderCountHistory,
  ReactComponentOptions,
  CoreSocket
} from '@speedsters/type';

import { createSocket } from '@speedsters/core';
import { performanceNow } from '../utils';

export const RENDER_COUNT = 'renderCount';

const COMPONENT_DID_MOUNT = 'componentDidMount';
const COMPONENT_DID_UPDATE = 'componentDidUpdate';

const DEFAULT_CONNECTION_OPTIONS: ConnectionOptions = {
  name: 'Speedsters React',
  packageId: '@speedsters/react',
};

const DEFAULT_COMPONENT_OPTIONS: ReactComponentOptions = {
  excludes: {},
  milliseconds: null,
  verbose: false,
};

let socket: CoreSocket;

export class SReact implements SReactType {
  private _data: ReactComponentData | any = {};
  private hasInitiateConnection: boolean = false;

  constructor() {
    this.connect = this.connect.bind(this);
    this.handleSocketMessages = this.handleSocketMessages.bind(this);
  }
  
  get data() {
    return this._data;
  }

  public connect(options: ConnectionOptions = {}) {
    // Flag the initialization
    this.hasInitiateConnection = true;

    const socketOptions = {
      ...DEFAULT_CONNECTION_OPTIONS,
      ...options,
    };

    socketOptions.onMessage = (e) => {
      if (options.onMessage) {
        options.onMessage(e);
      }

      try {
        const msg = JSON.parse(e.data);
        if (msg && msg.type) {
          this.handleSocketMessages(msg);
        }
      } catch (e) {
        console.log(`Error while parsing React:socket.onMessage ${e}`);
      }
    }

    socket = createSocket(socketOptions);
    socket.connect();
    return this;
  }

  private handleSocketMessages(data: any) {
    switch(data.type) {
      case 'CLEAR_REACT_RENDER_HISTORY':
        if (
          data.payload &&
          data.payload.componentName &&
          this._data[data.payload.componentName]
        ) {
          this._data = {
            ...this._data,
            [data.payload.componentName]: {
              ...this._data[data.payload.componentName],
              [RENDER_COUNT]: {
                value: 0,
                timing: 0,
                timeline: [],
              },
            },
          };
        }
        break;
      default:
        break;
    }
  }

  public classComponent(_this: any, options?: ReactComponentOptions): any {
    const methods = [];

    const proto = Object.getPrototypeOf(_this);

    if (!proto) {
      return console.warn('@speedsters/react: looks like you\'re trying to run jsnpr.component in an anonymous component.');
    }

    // Get the React Class/Component name.
    const COMPONENT_NAME: string = _this.constructor && _this.constructor.displayName || _this.constructor.name || 'ReactComponentClass';

    const { milliseconds, excludes, verbose }: ReactComponentOptions = { ...DEFAULT_COMPONENT_OPTIONS, ...options };

    this._data[COMPONENT_NAME] = {
      [RENDER_COUNT]: {
        value: 0,
        timing: 0,
        timeline: [],
      },
    };

    const hasDidUpdate = !!proto[COMPONENT_DID_UPDATE];

    if (!hasDidUpdate) {
      proto[COMPONENT_DID_UPDATE] = function componentDidUpdate() {}
    }

    let firstRenderingStartTime: number | any = null;
    let renderStartTime: number | any = null;
    
    const updateRenderCount = () => {
      const time = performanceNow();

      // Update the amount of times the component has rendering
      this._data[COMPONENT_NAME][RENDER_COUNT].value += 1;

      /**
       * Calculate the timing since the component
       * was mounted.
       */
      this._data[COMPONENT_NAME][RENDER_COUNT].timing = time - firstRenderingStartTime;

      const renderCountItem: RenderCountHistory = {
        timing: time - renderStartTime,
        props: _this.props,
        state: _this.state,
      };

      if (milliseconds) {
        renderCountItem.milliseconds = milliseconds;
      }
      // Save to the timeline.
      this._data[COMPONENT_NAME][RENDER_COUNT].timeline.push(renderCountItem);
    };

    for (let name of Object.getOwnPropertyNames(proto)) {
      const func = _this[name];

      // @ts-ignore: excludes can be undefined
      if(typeof func === 'function' && !excludes[name]){

        _this[name] = (...args: any[]) => {
          // Start time
          const time = performanceNow();

          const isRenderMethod = name === 'render';

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
            this._data[COMPONENT_NAME][name] = {
              value: timing
            };
          }

          if (verbose) {
            console.log(`@speedsters/react: ${COMPONENT_NAME} ${this._data[COMPONENT_NAME]}`);
          }

          /**
           * Send only if the user has 
           * run the @connect method.
           */
          if (this.hasInitiateConnection) {
            socket.sendPerformance({
              [COMPONENT_NAME]: this._data[COMPONENT_NAME],
            });
          }

          return res;
        };

        methods.push(name);
      }
    }

    return methods;
  }
}

const sreact = new SReact();
export default sreact;