const { app, BrowserWindow, nativeImage } = require('electron');

function createWindow () {
  let mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    title: "my-git",
    icon: nativeImage.createFromPath('src/public/favicon.ico'), 
    webPreferences: { 
      nodeIntegration: true,
      webviewTag: true, 
      webSecurity: false, 
      nodeIntegrationInSubFrames: true 
    }
  });

  // 【二选一：打包时候使用】__dirname为当前文件路径
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, './build/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));

  // 【二选一：开发时候使用】
  //需要和本地项目启动会端口号一致，一般不需要改。多项目启动会有端口被占用而 改变情况
  mainWindow.loadURL('http://localhost:3000/'); 

  // 解决应用启动白屏问题
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
