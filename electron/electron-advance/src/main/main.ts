import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import getMenus from './menu/menu';

const remote = require('@electron/remote/main');

remote.initialize();

let mainWindow: null | BrowserWindow;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: '',
    icon: path.join(__dirname, '../../public/favicon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // @ts-ignore
  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  remote.enable(mainWindow.webContents);

  const menus = getMenus(app, mainWindow);
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));

  mainWindow.on('closed', (): void => {
    mainWindow = null;
  });
};

app.on('ready', (): void => {
  createWindow();
});

app.on('window-all-closed', (): void => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', (): void => {
  if (mainWindow === null) {
    createWindow();
  }
});
