const { app, BrowserWindow } = require('electron')
// 用于支持渲染进程与主进程之间的远程调用
const remote = require("@electron/remote/main")

function createWindow () {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'media/cat.ico',  // 自定义当前应用的显示图标
    title: "jdrunk",  // 自定义当前应用的显示标题
    webPreferences: {
      // 允许渲染进程内启用Node集成
      nodeIntegration: true,
      // 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本. 默认为 true
      contextIsolation: false
    }
  })

  mainWindow.loadFile('media/index.html')
  remote.enable(mainWindow.webContents)

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('did-finish-load')
  })

  mainWindow.webContents.on('dom-ready', () => {
    console.log('dom-ready')
  })

  mainWindow.on('close', () => {
    console.log('The window is closed')
    // 关闭窗口时，销毁窗口对象
    mainWindow = null;
  })
}

remote.initialize();

app.on('ready', createWindow)

app.on('before-quit', () => {
  console.log('before-quit')
})

app.on('will-quit', () => {
  console.log('will-quit')
})

app.on('window-all-closed', function () {
  console.log('window-all-closed')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

