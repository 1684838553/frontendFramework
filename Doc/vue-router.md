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

