## react-router-dom

### 1. 安装

`npm i react-router-dom`

### 2. 使用

1. 在App组件中注册路由

    - 明确好导航区和展示区
    - 导航区用`Link`标签
    - 展示区使用`Route`标签进行路径匹配

    ```js
    import { Link, Route, Routes } from 'react-router-dom';

    { /** 在react中，靠编写路由链接实现切换组件 --- 编写路由链接 */}
    <div className="list-group">
        <Link className="list-group-item" to="/home">Home</Link>
        <Link className="list-group-item" to="/comment">comment</Link>
    </div>

    { /** 路由注册 */}
    <div className="panel-body">
        <Routes>
        { /** exact 精确匹配 */}
        <Route path="/" element={<Home />} exact />
        <Route path="/home" element={<Home />} exact />
        <Route path="/comment" element={<Comment />} exact />
        </Routes>
    </div>
    ```

2. 在index.js文件中将App组件放在`一个路由器`下管理

    - `<App>`的最外侧包裹一个`<BrowserRouter>`或`<HashRouter>`

    ```js
   import { BrowserRouter } from 'react-router-dom';

    <BrowserRouter>
        <App />
    </BrowserRouter>
    ```
    