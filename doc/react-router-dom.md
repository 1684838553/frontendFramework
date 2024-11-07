## react-router-dom

### 1. 安装

`npm i react-router-dom`

### 2. 使用

1. 在App组件中注册路由

    - 明确好导航区和展示区
    - 导航区用`Link`标签
    - 展示区使用`Route`标签进行路径匹配
    - `exact` 精确匹配

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

### 3. 路由组件和一般组件

1. 写法不同

    - 一般组件：`<Demo/>`
    - 路由组件：`<Route path="/demo" component={Demo}/>`

2. 存放的位置不同

    - 一般组件： `components`
    - 路由组件： `pages`

3. 接收到的`props`不同

    - 一般组件：写组件标签时传递了什么，就能收到什么
    - 路由组件: 接收到 3 个固定属性 `history` 、`location` 以及 `match`

        ```js
        // 重要属性
        history:
            go: ƒ go(n)
            goBack: ƒ goBack()
            goForward: ƒ goForward()
            push: ƒ push(path, state)
            replace: ƒ replace(path, state)
        location:
            pathname: "/about"
            search: ""
            state: undefined

        match:
            params: {}
            path: "/about"
            url: "/about"
        ```

### 4. 解决二级路由样式丢失的问题

1. public/css目录下有bootstrap.css样式

2. 写路由时有多级路由

    ```js
    <MyNavLink to = "/a/about" >About</MyNavLink>

    <Route path="/a/about"component={About}/>
    ```

3. 刷新页面时，样式因为路径问题加载失败，此时页面返回public下面的Index.html

4. 解决方法

    - 样式加载使用绝对位置  `<link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css">`
    - 使用 `%PUBLIC_URL%`  `<link href="%PUBLIC_URL%/css/bootstrap.css" rel="stylesheet">`
    - 使用`HashRouter`


### 5. 传递参数

#### 1. params参数

从`react-router-dom v6`版本开始，路由参数必须使用`函数组件`进行接收，类组件中无法通过`this.props`中接收路由组件传递的参数。

```js
import { useParams } from 'react-router-dom';

const params = useParams();
```

#### 2. search参数

```js
import { useSearchParams } from 'react-router-dom';

export default function Detail() {
  const [searchParams, setSearchParams] = useSearchParams();

  const detailId = searchParams.get('id');

  // 点击按钮，修改URL上的search参数
  const updateSearch = () => {
    setSearchParams({
      username: username,
      id: detailId
    })
  }

  return (
    <div>
        <button onClick={updateSearch}>修改search参数</button>
    </div>
  )
}
```

#### 3. state参数

```js
import { useLocation } from 'react-router-dom';

const stateParams = useLocation()
```