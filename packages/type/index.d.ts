export type BaseData = {
  milliseconds?: number | null;
  value?: number;
  time?: number;
}

export type RenderCountHistory = {
  timing: number;
  milliseconds: number | null;
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
  milliseconds: number | null;
}

export type Data = {
  [x: string]: BaseData | Data | number | string | null;
}

type ReactData = {
  [x: string]: any;
  ['renderCount']: RenderCount;
}

export type ReactComponentData = {
  [x: string]: ReactData;
}

export type ReactComponentOptions = {
  excludes?: {
    [x: string]: boolean,
  },
  milliseconds: number | null;
} 

export type CreateSocketOptions = {
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

export declare interface JsnpPerformance {
  data: Data;
  connect(options: CreateSocketOptions): JsnpPerformance;
  start(key: string, group?: string, options?: StartPerformanceOptions): StartReturnedObject;
  stop(key: string, group?: string): void | null;
  clear(): void;
  createGlobalLog(): void;
  log(): void;
}

export declare interface CoreSocket {
  configure(options: CreateSocketOptions): CoreSocket;
  connect(): CoreSocket;
  send(data: object): void;
  sendPerformance(data: object): void;
}

export declare interface JsnpReact {
  connect(options: CreateSocketOptions): JsnpReact;
  component(options: ReactComponentOptions): void;
  data: any;
}
