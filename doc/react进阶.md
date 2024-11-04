## React进阶

### 1. 创建项目

安装脚手架：`npm i -g create-react-app`

使用脚手架创建react工程：`create-react-app hello-react`

### 2. 基础样式

1. 行内样式（不推荐）

    ```html
    <div style={{ color: 'red' }}>展示一下对象</div>
    ```

2. class类名控制

    ```html
    <div className="foo">展示一下对象</div>
    ```

3. `classnames`: 用于有条件地将 classNames 连接在一起

    [https://github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)

4. 为避免样式冲突，可以实现样式模块化

    - 将css文件名修改： `index.css` ---> `index.module.css`
    - 引入并使用的时候改变方式
        ```js
        import React,{ Component } from 'react'
        import hello from './index.module.css'  //引入的时候给一个名称

        export default class Hello extends Component{
            render() {
                return (
                    <h1 className={hello.title}>Hello</h1>   //通过大括号进行调用
                )
            }
        }
        ```
    - 相较于标准的外部样式表来说，`CSS Module`就是多了一点——确保类名的唯一，通过内部算法避免了两个组件中出现重复的类名，如果你能保证不会出现重复的类名，其实直接使用外部样式表也是一样的