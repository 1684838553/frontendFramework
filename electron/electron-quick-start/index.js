// 渲染进程
const { BrowserWindow, getCurrentWindow } = require("@electron/remote")

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

})