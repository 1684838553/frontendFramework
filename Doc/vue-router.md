## vue-router

### 1. 理解

1. vue的一个插件库，专门用来实现SPA应用。

2. 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。

3. 前端路由：key是路径，value是组件。

### 2. 基本使用

1. `npm i vue-router`

2. `Vue.use(VueRouter)`

3. 编写router配置项:

    ```javascript
    //引入VueRouter
    import VueRouter from 'vue-router'
    //引入Luyou 组件
    import About from '../components/About'
    import Home from '../components/Home'

    //创建router实例对象，去管理一组一组的路由规则
    const router = new VueRouter({
        routes:[
            {
                path:'/about',
                component:About
            },
            {
                path:'/home',
                component:Home
            }
        ]
    })

    //暴露router
    export default router
    ```

4. 实现切换（active-class可配置高亮样式）

    `<router-link active-class="active" to="/about">About</router-link>`

5. 指定展示位置

    `<router-view></router-view>`

### 3. 几个注意点

1. 路由组件通常存放在pages文件夹，一般组件通常存放在components文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息。
4. 整个应用只有一个`router`，可以通过组件的`$router`属性获取到。

### 4. 多级路由

1. 配置路由规则，使用children配置项：

    ```javascript
    routes:[
        {
            path:'/about',
            component:About,
        },
        {
            path:'/home',
            component:Home,
            children:[ //通过children配置子级路由
                {
                    path:'news', //此处一定不要写：/news
                    component:News
                },
                {
                    path:'message',//此处一定不要写：/message
                    component:Message
                }
            ]
        }
    ]
    ```

2. 跳转（要写完整路径）：

    `<router-link to="/home/news">News</router-link>`

### 4. 路由的query参数

1. 传递参数

    ```
    <!-- 跳转并携带query参数，to的字符串写法 -->
    <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
                    
    <!-- 跳转并携带query参数，to的对象写法 -->
    <router-link 
        :to="{
            path:'/home/message/detail',
            query:{
            id:666,
                title:'你好'
            }
        }"
    >跳转</router-link>
    ```

2. 接收参数：

    ```javascript
    $route.query.id
    $route.query.title
    ```

### 5. 命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

    - 给路由命名：

        ```javascript
        {
            path:'/demo',
            component:Demo,
            children:[
                {
                    path:'test',
                    component:Test,
                    children:[
                        {
                            name:'hello' //给路由命名
                            path:'welcome',
                            component:Hello,
                        }
                    ]
                }
            ]
        }
        ```
    - 简化跳转：

        ```

        <!--简化前，需要写完整的路径 -->
        <router-link to="/demo/test/welcome">跳转</router-link>

        <!--简化后，直接通过名字跳转 -->
        <router-link :to="{name:'hello'}">跳转</router-link>

        <!--简化写法配合传递参数 -->
        <router-link 
            :to="{
                name:'hello',
                query:{
                id:666,
                    title:'你好'
                }
            }"
        >跳转</router-link>
        ```
