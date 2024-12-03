// 渲染进程
const { BrowserWindow, getCurrentWindow, Menu, MenuItem } = require("@electron/remote")
const { ipcRenderer, clipboard } = require('electron')

window.addEventListener('DOMContentLoaded', () => {

    // 获取主窗口对象
    let mainWindow = getCurrentWindow();

    const newWindow = document.querySelector('#newWindow');
    newWindow.addEventListener('click', () => {
        let newWin = new BrowserWindow({
            width: 500,
            height: 500,
        })
        newWin.loadFile("media/newWin.html")
        newWin.on('close', () => {
            newWin = null;
        })
    })

    const minimize = document.querySelector('#minimize');
    const maximize = document.querySelector('#maximize');
    const close = document.querySelector('#close');
    const dialog = document.querySelector('#addDialog');
    const sonWindow = document.querySelector('#sonWindow');

    // 最小化窗口
    minimize.addEventListener('click', () => {
        if (!mainWindow.isMaximized()) {
            mainWindow.minimize()
        } else {
            // 将窗口从最大化状态恢复到之前的状态。
            mainWindow.restore()
        }
    })

    // 最大化窗口
    maximize.addEventListener('click', () => {
        if (!mainWindow.isMaximized()) {
            mainWindow.maximize()
        }
    })

    // 关闭窗口
    close.addEventListener('click', () => {
        const dialog = document.querySelector('.wapper');
        dialog.style.display = 'block';

        const yesBtn = document.querySelector('#yes');
        const noBtn = document.querySelector('#no');

        yesBtn.addEventListener('click', () => {
            mainWindow.destroy()
        })

        noBtn.addEventListener('click', () => {
            dialog.style.display = 'none';
        })
    })

    // 模态窗口
    dialog.addEventListener('click', () => {
        let newWin = new BrowserWindow({
            // 父子窗口，自创要创建时，要传parent参数，指定父窗口
            parent: mainWindow,
            width: 500,
            height: 500,
            // 模态窗口不关闭，父窗口也不能关闭
            modal: true
        })
        newWin.loadFile("media/newWin.html")
        newWin.on('close', () => {
            newWin = null;
        })
    })

    // 子窗口（父窗口关闭，子窗口也会关闭）
    sonWindow.addEventListener('click', () => {
        let newWin = new BrowserWindow({
            // 父子窗口，子窗口要创建时，要传parent参数，指定父窗口
            parent: mainWindow,
            width: 500,
            height: 500,
        })
        newWin.loadFile("media/newWin.html")
        newWin.on('close', () => {
            newWin = null;
        })
    })

    // 右键菜单（要创建由渲染器启动的菜单，通过 IPC 发送所需的信息到主过程，并让主过程代替渲染器显示菜单；也可以直接创建，不通过主进程）
    window.addEventListener('contextmenu', e => {
        e.preventDefault();
        ipcRenderer.send('show-context-menu');
    })

    // 主进程创建菜单后，点击菜单，在渲染进程监听这个事件
    ipcRenderer.on('context-menu-command', (e, command) => {
        console.log(e, command)
        switch (command) {
            case 'paste': {
                const text = clipboard.readText()
                console.log(text)
                break;
            }
            case 'copy': {
                clipboard.writeText('hello i am a bit of text!')
                break;
            }
            default: {
                break;
            }
        }
    })

    // 动态创建菜单
    const menuCon = document.querySelector('#menuCon');
    const addMenuItem = document.querySelector('#addMenuItem');
    const addMenus = document.querySelector('#addMenus');
    const menuItem = new Menu();

    addMenuItem.addEventListener('click', () => {
        const content = menuCon.value.trim();
        if (content) {
            menuItem.append(new MenuItem({ label: content }))
            menuCon.value = ''
        }
    })

    addMenus.addEventListener('click', () => {
        const menuCustom = new MenuItem({ label: '自定义', submenu: menuItem });
        const menuHelp = new MenuItem({ label: '帮助', role: 'help' });

        const menu = new Menu();
        menu.append(menuCustom);
        menu.append(menuHelp);
        Menu.setApplicationMenu(menu);
    })

    // 渲染进程到主进程通信
    const sendMessageSync = document.querySelector('#sendMessageSync');
    const sendMessage = document.querySelector('#sendMessage');

    // 采用异步API在渲染进程中给主进程发送消息
    sendMessageSync.addEventListener('click', () => {
        ipcRenderer.send('msg', '来自渲染进程的异步消息')
    })

    // 采用同步API在渲染进程中给主进程发送消息
    sendMessage.addEventListener('click', () => {
        const message = ipcRenderer.sendSync('msg2', '来自渲染进程的同步消息')
        // message 是主进程返回的消息
        console.log(message)
    })

    // 接受主进程发送的消息
    ipcRenderer.on('msgRe', (ev, data) => {
        console.log(data)
    })

     ipcRenderer.on('mtp', (ev, data) => {
        console.log(data)
    })
})