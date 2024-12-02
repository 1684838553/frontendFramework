const { app, BrowserWindow } = require('electron')
const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('did-finish-load')
  })

  mainWindow.webContents.on('dom-ready', () => {
    console.log('dom-ready')
  })

  mainWindow.on('close', () => {
    console.log('The window is closed')
  })
}

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

