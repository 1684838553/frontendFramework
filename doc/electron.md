# Electron

## 0. 初始化Electron项目

```powershell
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

注意：运行时报错`electron always "Electron failed to install correctly, please delete node_modules/electron and try installing again"`, 解决方法，设置`set ELECTRON_OVERRIDE_DIST_PATH=./node_modules/electron/dist`

## 1. 核心组成部分

![](./image/electron.PNG)

1. `chromium`: 支持最新特性的浏览器

2. `node.js`：js运行时，可实现文件读写等

3. `native APIs`: 提供统一的原生界面能力

## 2. 工作流程

![](./image/electron工作流程.PNG)

1. 主进程

    - 看做是`package.json`中`main`属性对应的文件

        ```json
        {
            "name": "my-electron-app",
            "version": "1.0.0",
            "description": "Hello World!",
            "main": "main.js",
            "author": "Jane Doe",
            "license": "MIT"
        }
        ```

    - 一个应用只有一个主进程

    - 只有主进程可以进行`GUI`的`API`操作

2. 渲染进程

    - `windows`中展示的界面通过渲染基础南横表现

    - 一个应用可以有多个渲染进程

## 3. 生命周期

![](./image/electron生命周期.PNG)

```js
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
    mainWindow = null
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
})


```