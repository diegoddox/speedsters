export type BasePerformanceData = {
  milliseconds?: number | null;
  value?: number;
  time?: number;
  renderCount?: RenderCount;
}

export type RenderCountHistory = {
  timing: number;
  milliseconds?: number | null;
}

export type RenderCount = {
  value: number;
  timing: number;
  timeline: RenderCountHistory[];
}

export type StartReturnedObject = {
  stop: () => void;
}

export type StartPerformanceOptions = {
  milliseconds?: number;
  verbose?: boolean;
}

export type PerformanceData = {
  [x: string]: BasePerformanceData | PerformanceData;
}

type ReactData = {
  [x: string]: any;
  renderCount: RenderCount;
}

export type ReactComponentData = {
  [x: string]: ReactData;
}

export type ReactComponentOptions = {
  excludes?: {
    [x: string]: boolean | any,
  },
  milliseconds?: number | null;
  verbose?: boolean;
} 

export type ConnectionOptions = {
  name?: string;
  secure?: boolean;
  host?: string;
  port?: number;
  onConnect?: (e: Event) => any;
  onMessage?: (e: MessageEvent) => any;
  onError?: (e: any) => any;
  onClose?: (e: CloseEvent) => any;
  Platform?: any;
}

export declare interface IPerformance {
  data: PerformanceData;
  connect(options: ConnectionOptions): IPerformance;
  start(key: string, group?: string, options?: StartPerformanceOptions): StartReturnedObject;
  stop(key: string, group?: string): void | null;
  clear(): void;
  createGlobalLog(): void;
  log(): void;
}

export declare interface CoreSocket {
  configure(options: ConnectionOptions): CoreSocket;
  connect(): CoreSocket;
  send(data: object): void;
  sendPerformance(data: object): void;
}

export declare interface IReact {
  connect(options: ConnectionOptions): IReact;
  component(options: ReactComponentOptions): void;
  data: any;
}
