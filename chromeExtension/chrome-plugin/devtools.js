chrome.devtools.panels.create('MyPanel', 'img/logo.png', 'mypanel.html', (panel) => {
	console.log('自定义面板创建成功！', panel); 
});

chrome.devtools.panels.elements.createSidebarPane("Images", function (sidebar) {
	// sidebar.setPage('../sidebar.html'); // 指定加载某个页面
	// sidebar.setExpression('document.querySelectorAll("img")', 'All Images'); // 通过表达式来指定
	sidebar.setObject({ aaa: 111, bbb: 'Hello World!' }); // 直接设置显示某个对象
});