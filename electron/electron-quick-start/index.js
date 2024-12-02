// 渲染进程
const { BrowserWindow } = require("@electron/remote")

window.addEventListener('DOMContentLoaded', () => {

    const doc = document.querySelector('body');

    const btn = document.createElement('button');
    btn.textContent = '创建新窗口';
    doc.append(btn);

    btn.addEventListener('click', () => {
        let newWin = new BrowserWindow({
            width:500,
            height:500,
        })
        newWin.loadFile("media/newWin.html")
        newWin.on('close', () => {
            newWin = null;
        })
    })
})