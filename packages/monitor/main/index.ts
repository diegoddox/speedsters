import {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  Menu,
} from 'electron';
import * as path from 'path';
import * as WebSocket from 'ws';
import * as windowStateKeeper from 'electron-window-state';
import openAboutWindow from 'electron-about-window';

const isDev = !app.isPackaged;

if (isDev) {
  // TODO: this is not working properly.
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
  ws.on('pong', () => (ws as any).isAlive = true);
  ws.on('message', (data: any) => (wss as any).broadcast(data, ws));
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
    title: 'Speedsters',
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
      partition: 'persist:main'
    },
  });

  const speedstersMenu = Menu.buildFromTemplate([
    {
      label: 'Speedsters',
      submenu: [
        {
          label: 'About Speedsters',
          click() {
            const ABOUT_SIZE = 300;

            openAboutWindow({
              icon_path: path.resolve(__dirname,  './icons/icon.png'),
              homepage: 'https://github.com/diegoddox/speedsters',
              bug_report_url: 'https://github.com/diegoddox/speedsters/issues',
              win_options: {
                width: ABOUT_SIZE,
                height: ABOUT_SIZE,
                maxWidth: ABOUT_SIZE,
                minWidth: ABOUT_SIZE,
                minHeight: ABOUT_SIZE,
                maxHeight: ABOUT_SIZE,
                minimizable: false,
                maximizable: false,
              },
            });
          }
        }, {
          label: 'Quick',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : '',
          click() {
            app.quit();
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(speedstersMenu);

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
  } else {
    mainWindow.hide();
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

ipcMain.on('toggle-available-space', () => {
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
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createWindow();
  } else {
    mainWindow.show();
  }
});

app.on('ready', () => {
  mainWindow = createWindow();
});