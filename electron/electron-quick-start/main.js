const { app, BrowserWindow, Menu, ipcMain } = require('electron')
// 用于支持渲染进程与主进程之间的远程调用
const remote = require("@electron/remote/main")

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: 'media/cat.ico',  // 自定义当前应用的显示图标
    title: "jdrunk",  // 自定义当前应用的显示标题
    webPreferences: {
      // 允许渲染进程内启用Node集成
      nodeIntegration: true,
      // 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本. 默认为 true
      contextIsolation: false
    }
  })

  // 自定义菜单（菜单的角色和类型，功能已经实现）
  const menuTemp = [
    {
      label: '文件',
      submenu: [
        {
          label: '打开文件',
          // 菜单图标
          icon: 'media/file.png',
          click() {
            console.log('打开文件')
          }
        },
        {
          label: '打开文件夹',
        },
        {
          type: 'separator'
        },
        {
          label: '关于',
          role: 'about'
        }
      ]
    },
    {
      label: '角色',
      submenu: [
        { label: '复制', role: 'copy' },
        { label: '剪切', role: 'cut' },
        { label: '粘贴', role: 'paste' },
        { label: '最小化', role: 'minimize' }
      ]
    },
    {
      label: '类型',
      submenu: [
        { label: '选项一', role: 'checkbox' },
        { label: '选项二', role: 'checkbox' },
        { type: 'separator' },
        { label: '选项三', role: 'radio' },
        { label: '选项四', role: 'radio' },
        { type: 'separator' },
        { label: 'windows', role: 'windowMenu', type: 'submenu' },
      ]
    },
    {
      label: '开发者工具',
      click() {
        mainWindow.webContents.openDevTools();
      }
    }
  ]
  const menu = Menu.buildFromTemplate(menuTemp);
  Menu.setApplicationMenu(menu);

  // 右键菜单
  ipcMain.on('show-context-menu', (event) => {
    const template = [
      {
        label: 'copy',
        click: () => { event.sender.send('context-menu-command', 'copy') }
      },
      {
        label: 'paste',
        click: () => { event.sender.send('context-menu-command', 'paste') }
      }
    ]
    const menu = Menu.buildFromTemplate(template)
    menu.popup({ window: BrowserWindow.fromWebContents(event.sender) })
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

