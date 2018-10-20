"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var isDev = require("electron-is-dev");
var WebSocket = require("ws");
var windowStateKeeper = require("electron-window-state");
if (isDev) {
    require('electron-reload')(__dirname);
}
var mainWindow;
var wss = new WebSocket.Server({ port: 1338 }, function () { return console.log('Ws server started'); });
wss.broadcast = function (data, sender) {
    wss.clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN && sender !== client) {
            client.send(data);
        }
    });
};
wss.on('connection', function (ws) {
    ws.isAlive = true;
    ws.on('pong', function () {
        ws.isAlive = true;
    });
    ws.on('message', function (data) {
        wss.broadcast(data, ws);
    });
});
wss.on('error', function () { return clearInterval(socketPingPongInterval); });
wss.on('close', function () { return clearInterval(socketPingPongInterval); });
var socketPingPongInterval = setInterval(function () {
    wss.clients.forEach(function (ws) {
        if (ws.isAlive === false)
            return ws.terminate();
        ws.isAlive = false;
        ws.ping(function () { return null; });
    });
}, 20000);
function createWindow() {
    var height = electron_1.screen.getPrimaryDisplay().workAreaSize.height;
    var mainWindowState = windowStateKeeper({
        defaultWidth: isDev ? 1000 : 600,
        defaultHeight: height,
    });
    var window = new electron_1.BrowserWindow({
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
    window.loadURL(isDev ? 'http://localhost:1337' : "file://" + path.join(__dirname, './index.html'));
    window.once('ready-to-show', function () {
        window.show();
        if (isDev) {
            window.webContents.openDevTools();
        }
    });
    var notifier = new electron_1.Notification({
        title: 'Oi',
        body: 'this is it',
        icon: path.resolve(__dirname, '../build/icons/96x96.png')
    });
    electron_1.ipcMain.on('search-focus', function () {
        notifier.show();
    });
    window.on('closed', function () {
        mainWindow = null;
    });
    return window;
}
function handleCloseWindow() {
    if (process.platform !== 'darwin') {
        clearInterval(socketPingPongInterval);
        electron_1.app.quit();
    }
    else if (process.platform === 'darwin' && mainWindow) {
        mainWindow.close();
    }
}
electron_1.app.on('window-all-closed', handleCloseWindow);
electron_1.ipcMain.on('quick', handleCloseWindow);
electron_1.ipcMain.on('minimize', function () { return mainWindow.minimize(); });
electron_1.ipcMain.on('fill-available-space', function () {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    }
    else {
        mainWindow.maximize();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        mainWindow = createWindow();
    }
});
electron_1.app.on('ready', function () {
    mainWindow = createWindow();
});
