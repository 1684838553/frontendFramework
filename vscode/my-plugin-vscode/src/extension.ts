import * as vscode from 'vscode';
import {TreeViewProvider} from './treeViewProvider'
import {createWebView} from './webView'
import {DecorationNumber} from './decorationNumber'
import {StatusBarItem} from './statusBar'

export function activate(context: vscode.ExtensionContext) {

	let decorationNumber = new DecorationNumber()
	let statusBarItem = new StatusBarItem()
	
	let disposable = vscode.commands.registerCommand('plugin-treeview.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from plugin-treeView!');
	});

	TreeViewProvider.initTreeViewItem()

	context.subscriptions.push(disposable);
	context.subscriptions.push(vscode.commands.registerCommand('itemClick',(label)=>{

		const webview = createWebView(context,vscode.ViewColumn.Active,label)
		context.subscriptions.push(webview)
	}));

	context.subscriptions.push(vscode.commands.registerCommand('extension.decorationNumber',()=>{
		decorationNumber.DecNumber()
	}));

	context.subscriptions.push(vscode.commands.registerCommand('plugin-treeview.statusBar',()=>{
		statusBarItem.myStatusBar()
	}))


	require('./welcome')(context)
	require('./sayHello')(context)

}

export function deactivate() {}
