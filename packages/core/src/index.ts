import { CreateSocketOptions } from '@speedsters/type';

export { default as denormalize } from './denormalize';
export { createSocket, Socket } from './socket';


export function connect(options: CreateSocketOptions, connections: Function[]) {
  if (Array.isArray(connections)) {
    connections.forEach((connection) => {
      if (typeof connection === 'function') {
        connection(options);
      } else {
        console.log(`@speedsters/core: error. ${connection} is not a function`);
      }
    });
  } else {
    console.log('@speedsters/core: error on connect method. connections must be an array of function');
  }
}