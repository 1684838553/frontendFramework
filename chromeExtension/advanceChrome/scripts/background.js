chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') { 
        chrome.sidePanel.setVisible(true);
        chrome.sidePanel
            .setPanelBehavior({ openPanelOnActionClick: true })
            .catch((error) => console.error(error));
    }
});
