import { CreateSocketOptions } from '@jsnp/type';
export { createSocket, Socket } from './socket';

export function connect(options: CreateSocketOptions, connections: Function[]) {
  if (Array.isArray(connections)) {
    connections.forEach((connection) => {
      if (typeof connection === 'function') {
        connection(options);
      } else {
        console.log(`@jsnp/core: error. ${connection} is not a function`);
      }
    });
  } else {
    console.log('@jsnp/core: error on connect method. connections must be an array of function');
  }
}