document.addEventListener('DOMContentLoaded', () => {
	const changeColor = document.getElementById('change-color');
	changeColor.addEventListener('click', () => {
		chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
			chrome.scripting.executeScript({
				target: { tabId: tabs[0].id },
				function: () => {
					document.body.style.backgroundColor = 'red';
				}
			});
		})
	})

	const sendMessage = document.getElementById('send_message');
	sendMessage.addEventListener('click', () => {
		chrome.runtime.sendMessage({ action: 'getBackgroundInfo' }, (response) => {
			console.log(response.info);
		});
	})
});