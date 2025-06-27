chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        chrome.sidePanel
            .setPanelBehavior({ openPanelOnActionClick: true })
            .catch((error) => console.error(error));
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message, 'message');
    sendResponse({ message: '这是一条消息' });
});
