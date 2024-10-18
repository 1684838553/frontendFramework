## Vuex

### 1、定义

1. 概念

    在Vue中实现`集中式``状态（数据）`管理的一个Vue`插件`，对vue应用中多个组件的共享状态进行集中式的管理`（读/写）`，也是一种组件间通信的方式，且适用于任意组件间通信。

2. 何时使用

    多个组件需要共享数据时

    1. 多个组件依赖同一个状态

    2. 来自不同组件的行为需要变更同一状态

### 2、工作原理

![](./image/vuex工作原理.PNG)

### 3、搭建vuex环境

1. 创建文件：src/store/index.js

    ```javascript
    //引入Vue核心库
    import Vue from 'vue'
    //引入Vuex
    import Vuex from 'vuex'
    //应用Vuex插件
    Vue.use(Vuex)

    //准备actions对象——响应组件中用户的动作
    const actions = {}
    //准备mutations对象——修改state中的数据
    const mutations = {}
    //准备state对象——保存具体的数据
    const state = {}

    //创建并暴露store
    export default new Vuex.Store({
        actions,
        mutations,
        state
    })
    ```

2. 在main.js中创建vm时传入store配置项

    ```javascript
    ......
    //引入store
    import store from './store'
    ......

    //创建vm
    new Vue({
        el:'#app',
        render: h => h(App),
        store
    })
    ```

### 4、基本使用

1. 初始化数据、配置actions、配置mutations，操作文件store.js

    ```javascript
    //引入Vue核心库
    import Vue from 'vue'
    //引入Vuex
    import Vuex from 'vuex'
    //引用Vuex
    Vue.use(Vuex)

    const actions = {
        //响应组件中加的动作
        jia(context,value){
            // console.log('actions中的jia被调用了',miniStore,value)
            context.commit('JIA',value)
        },
    }

    const mutations = {
        //执行加
        JIA(state,value){
            // console.log('mutations中的JIA被调用了',state,value)
            state.sum += value
        }
    }

    //初始化数据
    const state = {
    sum:0
    }

    //创建并暴露store
    export default new Vuex.Store({
        actions,
        mutations,
        state,
    })
    ```

2. 组件中读取vuex中的数据：`$store.state.sum`


3. 组件中修改vuex中的数据：`$store.dispatch('action中的方法名',数据)` 或 `$store.commit('mutations中的方法名',数据)`

    > 备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写dispatch，直接编写commit