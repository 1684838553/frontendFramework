# Electron

## 1. 核心组成部分

![](../doc/image/electron.PNG)

1. `chromium`: 支持最新特性的浏览器

2. `node.js`：js运行时，可实现文件读写等

3. `native APIs`: 提供统一的原生界面能力

## 2. 工作流程

![](../doc/image/electron工作流程.PNG)

1. 主进程

    - 看做是`package.json`中`main`属性对应的文件

        ```json
        {
            "name": "my-electron-app",
            "version": "1.0.0",
            "description": "Hello World!",
            "main": "main.js",
            "author": "Jane Doe",
            "license": "MIT"
        }
        ```

    - 一个应用只有一个主进程

    - 只有主进程可以进行`GUI`的`API`操作

2. 渲染进程

    - `windows`中展示的界面通过渲染基础南横表现

    - 一个应用可以有多个渲染进程



