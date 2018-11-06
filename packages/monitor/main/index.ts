import {
  app,
  BrowserWindow,
  screen,
  ipcMain,
} from 'electron';
import * as path from 'path';
import * as WebSocket from 'ws';
import * as windowStateKeeper from 'electron-window-state';

const isDev = !app.isPackaged;

if (isDev) {
  // TODO: this is not working propely.
  require('electron-reload')(__dirname);
}

let mainWindow: BrowserWindow;

const wss = new WebSocket.Server({ port: 1338 }, () => console.log('Ws server started'));

(wss as any).broadcast = (data: any, sender: WebSocket) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && sender !== client) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  (ws as any).isAlive = true;

  ws.on('pong', () => {
    (ws as any).isAlive = true;
  });

  ws.on('message', (data: any) => {
    (wss as any).broadcast(data, ws);
  });
});

wss.on('error', () => clearInterval(socketPingPongInterval));
wss.on('close', () => clearInterval(socketPingPongInterval));

const socketPingPongInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if ((ws as any).isAlive === false) return ws.terminate();

    (ws as any).isAlive = false;
    ws.ping(() => null);
  });
}, 20000);

function createWindow () {
  const { height } = screen.getPrimaryDisplay().workAreaSize;

  // @ts-ignore
  const mainWindowState = windowStateKeeper({
    defaultWidth: isDev ?  1000 : 600,
    defaultHeight: height,
  });

  const window = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    show: false,
    frame: false,
    transparent: true,
    minWidth: 400,
    minHeight: 500,
    backgroundColor: '#2e3b4e',
    webPreferences: {
      webSecurity: false,
    },
  });

  mainWindowState.manage(window);

  window.loadURL(isDev ? 'http://localhost:1337' : `file://${path.join(__dirname, './index.html')}`);


  window.once('ready-to-show', () => {
    window.show();

    ipcMain.on('main-window-is-blur', (event: any) => {
      const isBlur = !window.isFocused();
      event.sender.send('main-window-is-blur:reply', isBlur);
    })

    if (isDev) {
      window.webContents.openDevTools();
    }
  });

  window.on('closed', () => {
    (mainWindow as any) = null;
  });

  return window;
}

function handleCloseWindow() {
  if (process.platform !== 'darwin') {
    clearInterval(socketPingPongInterval);
    app.quit();
  } else if (process.platform === 'darwin' && mainWindow) {
    mainWindow.close();
  }
}

app.on('window-all-closed', handleCloseWindow);

ipcMain.on('quick', handleCloseWindow);

ipcMain.on('minimize', () => mainWindow.minimize());

ipcMain.on('focus-main-window', () => {
  if (mainWindow) {
    mainWindow.focus();
  }
});

const toggleAvailableSpace = () => {
  /**
   * .isMaximized() is not working on windows.
   * https://github.com/electron/electron/issues/9092
   */
  const { width } = screen.getPrimaryDisplay().workAreaSize;
  const [ mainWindowWidth ] = mainWindow.getSize();

  if (mainWindowWidth !== width) {
    mainWindow.maximize();
  } else {
    mainWindow.unmaximize();
  }
};

ipcMain.on('toggle-available-space', toggleAvailableSpace);

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createWindow();
  }
});

app.on('ready', () => {
  mainWindow = createWindow();
});