chrome.runtime.onInstalled.addListener(({ reason }) => {
    console.log('扩展插件已安装', reason);
    // 点击图标打开侧边栏
    // chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { action, message } = request;
    console.log(request, 'message')
    if (action === 'invoke') {
        invoke();
        sendResponse({ message });
    }
});

function invoke() {
    console.log('popup 调用这个方法');
}
