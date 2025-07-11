/** 
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
*/

// 新窗口打开百度
const newWindow = document.getElementById('new_window');
newWindow.addEventListener('click', () => {
	chrome.windows.create({
		url: "https://www.baidu.com",
		focused: true
	});
});

// 最大化窗口
const maximizeWindow = document.getElementById('maximize_window');
maximizeWindow.addEventListener('click', () => {
	chrome.windows.getCurrent({ populate: true }, window => {
		chrome.windows.update(window.id, { state: 'maximized' });
	})
});

// 最小化窗口
const minimizeWindow = document.getElementById('minimize_window');
minimizeWindow.addEventListener('click', () => {
	chrome.windows.getCurrent({ populate: true }, window => {
		chrome.windows.update(window.id, { state: 'minimized' });
	})
});

// 关闭窗口
const closeWindow = document.getElementById('close_window');
closeWindow.addEventListener('click', () => {
	chrome.windows.getCurrent({ populate: true }, window => {
		chrome.windows.remove(window.id);
	})
});

document.getElementById('new_tab').addEventListener('click', function() {
	chrome.tabs.create({ url: "https://www.baidu.com" });
  });
  
  document.getElementById('current_tab').addEventListener('click', function() {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	  if (tabs.length > 0) {
		chrome.tabs.update(tabs[0].id, { url: "https://www.baidu.com" });
	  }
	});
  });
  
  document.getElementById('get_current_tab_id').addEventListener('click', function() {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	  if (tabs.length > 0) {
		alert("当前标签页ID: " + tabs[0].id);
	  }
	});
  });
  
  document.getElementById('open_first_tab').addEventListener('click', function() {
	chrome.tabs.query({ currentWindow: true }, function(tabs) {
	  if (tabs.length > 0) {
		chrome.tabs.update(tabs[0].id, { active: true });
	  }
	});
  });
  