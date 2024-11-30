import {ExtensionContext,ViewColumn,WebviewPanel,window,commands,Uri} from 'vscode'
import * as path from 'path'
const fs = require('fs')

// 创建一个全局变量
let webviewPanel:WebviewPanel | undefined


// 创建一个可到出的方法，并且带上参数
export function createWebView(context:ExtensionContext,viewColumn:ViewColumn,label:string){
    if(webviewPanel === undefined){
        webviewPanel = window.createWebviewPanel(
            'webView',   //标识webview面板类型
            label,   //小组的标题
            viewColumn,  //在编辑器这显示webview的位置
            {
                retainContextWhenHidden:true,
                enableScripts:true
            }
        )
        webviewPanel.webview.postMessage({label:label})
        webviewPanel.webview.html = getWebViewContent(context,`src/media/${label}.html`)
        // webviewPanel.webview.html = getIframehtml(label)

    }else{
        webviewPanel.title = label
        // webview面板一次只能显示在一列中。如果它已经显示，则此方法将其移到新列
        webviewPanel.reveal() 
        // 向html传递一个标签为label的messgae
        // webviewPanel.webview.postMessage({label:label})
        webviewPanel.webview.html = getWebViewContent(context,`src/media/${label}.html`)
    }


    // 如果关闭该面板，将webviewPanel设置为undefined
    webviewPanel.onDidDispose(()=>{
        webviewPanel = undefined
    })

    return webviewPanel
}

function getWebViewContent(context:ExtensionContext, templatePath:string) {
    const resourcePath = path.join(context.extensionPath, templatePath);
    const dirPath = path.dirname(resourcePath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m:any, $1:any, $2:any) => {
        return $1 + Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
    });
    return html;
}


export function getIframehtml(label:string){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>百度</title>
        <style>
            html,body{
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
            }

            .iframe{
                width: 100%;
                height: 100%;
            }
        </style>
    </head>
    <body>
        <iframe class="iframe" src="http://www.baidu.com/" frameborder="0"></iframe>
    </body>
    </html>
    `
}
