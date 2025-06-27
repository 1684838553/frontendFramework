const repoUrlElement = document.getElementById('repoUrl');
const projectNameElement = document.getElementById('projectName');
const dirUrlElement = document.getElementById('dirUrl');
const dirUrlBtnElement = document.getElementById('dirUrlBtn');

dirUrlBtnElement.addEventListener('click', async () => {
    const response = await chrome.runtime.sendMessage('ping');
    console.log(response, 'response')
});

