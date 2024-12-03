const { ipcRenderer } = require("electron");

window.onload = function() {
    const input = document.querySelector('#txt');
    const val = localStorage.getItem('name');
    input.value = val;

    // 发送数据给index.js
    const sendToMain = document.querySelector('#sendToMain');
    sendToMain.addEventListener('click', () => {
        // 先发送给mian.js
        ipcRenderer.send('msgToMain', '来自子窗口的数据')
    })
}