chrome.runtime.onInstalled.addListener(() => {
    console.log('扩展插件已安装');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getBackgroundInfo') {
        sendResponse({ info: '这是来自 Background 返回的信息' });
    }
});

