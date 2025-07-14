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

// 新标签打开百度
document.getElementById('new_tab').addEventListener('click', function () {
	chrome.tabs.create({ url: "https://www.baidu.com" });
});

// 当前标签打开百度
document.getElementById('current_tab').addEventListener('click', function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (tabs.length > 0) {
			chrome.tabs.update(tabs[0].id, { url: "https://www.baidu.com" });
		}
	});
});

// 获取当前标签页ID
document.getElementById('get_current_tab_id').addEventListener('click', function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (tabs.length > 0) {
			alert("当前标签页ID: " + tabs[0].id);
		}
	});
});

// 打开第一个标签页
document.getElementById('open_first_tab').addEventListener('click', function () {
	chrome.tabs.query({ currentWindow: true }, function (tabs) {
		if (tabs.length > 0) {
			chrome.tabs.update(tabs[0].id, { active: true });
		}
	});
});

// 短链接发送消息到content
document.getElementById('send_message_short_connect').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (tabs.length === 0) {
			console.error("No active tab found");
			return;
		}

		const activeTab = tabs[0];

		chrome.tabs.sendMessage(activeTab.id, { action: "short", message: "短链接消息" }, response => {
			if (chrome.runtime.lastError) {
				console.error("Error sending message: ", chrome.runtime.lastError.message);
			} else {
				console.log("Response from content script: ", response);
			}
		});
	});
});

// 长链接功能没有实现
// 长链接发送消息到content
// document.getElementById('send_message_long_connect').addEventListener('click', () => {
// 	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
// 		if (tabs.length === 0) {
// 			console.error("No active tab found");
// 			return;
// 		}

// 		// 建立长连接
// 		const port = chrome.runtime.connect({ connectInfo: { name: 'long' } });
// 		port.postMessage({ action: 'long', message: '长链接消息' });

// 		port.onMessage.addListener((msg) => {
// 			console.log('Received message from content script:', msg);
// 		});

// 		port.onDisconnect.addListener(() => {
// 			console.log('Port disconnected!!!');
// 		});
// 	});
// });

// 修改页面背景色 executeScript实现
document.getElementById('update_page_background_color_executeScript').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (tabs.length === 0) {
			console.error("No active tab found");
			return;
		}

		const activeTab = tabs[0];
		/*
			将脚本注入目标上下文
			在当前活动的标签页或指定的标签页中动态注入 JavaScript 代码或文件
			在页面加载完成后或在特定事件触发时执行内容脚本
			在跨域页面中注入脚本，只要扩展程序有相应的权限
		 */
		chrome.scripting.executeScript({
			target: { tabId: activeTab.id },
			function: () => {
				document.body.style.backgroundColor = 'red';
			}
		});
	})
})

// 修改页面背景色 sendMessage实现
document.getElementById('update_page_background_color_sendMessage').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (tabs.length === 0) {
			console.error("No active tab found");
			return;
		}

		const activeTab = tabs[0];

		chrome.tabs.sendMessage(activeTab.id, { action: 'updateBackgroundColor', message: '#ededed' }, response => {
			if (chrome.runtime.lastError) {
				console.error("Error sending message: ", chrome.runtime.lastError.message);
			} else {
				console.log("Response from content script: ", response);
			}
		});
	});
})

// 国际化演示
function showInternationalization() {
	document.getElementById('helloWorld').textContent = chrome.i18n.getMessage("helloWorld");
}
showInternationalization();

// 显示徽标
document.getElementById('show_badge').addEventListener('click', () => {
	chrome.action.setBadgeText({ text: 'New' });
	chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
})

// 隐藏徽标
document.getElementById('hide_badge').addEventListener('click', () => {
	chrome.action.setBadgeText({ text: '' });
	chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
})