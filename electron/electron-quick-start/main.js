const { app, BrowserWindow, Menu, ipcMain } = require('electron')
// 用于支持渲染进程与主进程之间的远程调用
const remote = require("@electron/remote/main")

// 定义全局变量，存放属性
let mainWinId = null;

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
      label: '消息',
      click() {
        // 主进程给渲染进程发送消息
        BrowserWindow.getFocusedWindow().webContents.send('mtp', '主进程主动给渲染进程发送消息')
      }
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
  mainWinId = mainWindow.id;
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

// 主进程接受来自渲染进程的异步消息
ipcMain.on('msg', (ev, data) => {
  console.log(data)
  ev.sender.send('msgRe', '这是一条来自主进程的异步消息')
})

// 主进程接受来自渲染进程的同步消息
ipcMain.on('msg2', (ev, data) => {
  console.log(data)
  ev.returnValue = '这是一条来自主进程的同步消息'
})

// 接受其他进程发送的数据，然后进行后续操作
ipcMain.on('openWin2', () => {
  // 接受到渲染进程中按钮点击信息后完成窗口2的打开 
  let subWin1 = new BrowserWindow({
    width: 800,
    height: 400,
    // 父子窗口
    parent: BrowserWindow.fromId(mainWinId),
    icon: 'media/cat.ico',
    title: "jdrunk",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  subWin1.loadFile('media/newWin.html')
  subWin1.on('close', () => {
    subWin1 = null;
  })
})

ipcMain.on('msgToMain', (ev, data) => {
  console.log(data)
  // 在将这个数据发给指定的渲染进程
  const mainWin = BrowserWindow.fromId(mainWinId);
  mainWin.webContents.send('mti', data)
})

