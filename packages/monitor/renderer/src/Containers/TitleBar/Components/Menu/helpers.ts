import { ipcRenderer } from 'electron';

export function close() {
  ipcRenderer.send('quick');
}

export function minimize() {
  ipcRenderer.send('minimize');
}

export function toggleAvailableSpace() {
  ipcRenderer.send('toggle-available-space');
}