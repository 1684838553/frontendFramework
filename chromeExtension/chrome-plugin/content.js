console.log('已加载内容脚本！');

// 不要在chrome://extensions/页面发送消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { action, message } = request;
    console.log(request, 'request');

    switch (action) {
        case 'short': {
            console.log(`这是一条短链接发送的消息： ${message}`);
            break;
        }
        case 'updateBackgroundColor': {
            document.body.style.backgroundColor = message;
            break;
        }
        default: {
            return;
        }
    }
});

chrome.runtime.onConnect.addListener(port => {
    console.log(port, 'Connected');

    port.onMessage.addListener((msg) => {
        console.log('Received message:', msg);
        if (msg.action === 'long') {
            port.postMessage({ action: 'response', message: '收到你的消息' });
        }
    });

    port.onDisconnect.addListener(() => {
        console.log('Port disconnected');
    });
});
