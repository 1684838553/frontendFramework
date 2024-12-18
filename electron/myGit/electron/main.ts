const { app, BrowserWindow, nativeImage, Menu } = require('electron');
const path = require('path');
const url = require('url');
const menuFile = require('./menu.ts');

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "my-git",
    icon: nativeImage.createFromPath('public/favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      webSecurity: false,
      nodeIntegrationInSubFrames: true
    }
  });

  if (process.env.MODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000/');
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  const menus = menuFile.getMenus(app, mainWindow);
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});
