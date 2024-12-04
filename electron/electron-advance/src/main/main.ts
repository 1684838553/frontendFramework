import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';
// import { getMenus } from '@/main/menu/menu';

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: null | BrowserWindow;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'git-it',
    icon: path.join(__dirname, '../../public/favicon.png'),
  });

  // @ts-ignore
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // const menus = getMenus(app, mainWindow);
  // Menu.setApplicationMenu(Menu.buildFromTemplate(menus));

  mainWindow.webContents.openDevTools();

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
