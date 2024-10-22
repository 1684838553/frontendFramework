## vue3

### 1. 创建Vue3.0工程

#### 1. 使用 vue-cli 创建

    ```
    ## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
    vue --version
    ## 安装或者升级你的@vue/cli
    npm install -g @vue/cli
    ## 创建
    vue create vue_test
    ## 启动
    cd vue_test
    npm run serve
    ```

#### 2. 使用 vite 创建

1. 什么是vite？—— 新一代前端构建工具。[官网 https://vitejs.cn/](https://vitejs.cn/)

2. 优势如下：

    - 开发环境中，无需打包操作，可快速的冷启动。
    - 轻量快速的热重载（HMR）。
    - 真正的按需编译，不再等待整个应用编译完成。

3. 命令

    ```
    ## 创建工程
    npm init vite-app <project-name>
    ## 进入工程目录
    cd <project-name>
    ## 安装依赖
    npm install
    ## 运行
    npm run dev
    ```

### 2. 常用 Composition API

#### 1. 拉开序幕的setup

1. 理解：Vue3.0中一个新的配置项，值为一个函数。

2. setup是所有Composition API（组合API）“ 表演的舞台 ”。

3. 组件中所用到的：数据、方法等等，均要配置在setup中。

4. setup函数的两种返回值：

    - 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）

        ```javascript
        setup() {
            let name = 'world';

            return {
                name
            }
        }
        ```

    - 若返回一个渲染函数：则可以自定义渲染内容。（了解）
        ```javascript
        import { h } from 'vue';
        setup() {
            return () => h('h3', 'Hello China')
        }
        ```

5. 注意点：
    - 尽量不要与Vue2.x配置混用
        - Vue2.x配置（data、methos、computed...）中可以访问到setup中的属性、方法。
        - 但在setup中不能访问到Vue2.x配置（data、methos、computed...）。
        - 如果有重名, setup优先。
    - setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

#### 2. ref函数

1. 作用: 定义一个响应式的数据

2. 语法: `const xxx = ref(initValue)`

    - 创建一个包含响应式数据的引用对象（reference对象，简称ref对象）。
    - JS中操作数据： `xxx.value`
    - 模板中读取数据: 不需要.value，直接：`<div>{{xxx}}</div>`

3. 备注：

    - 接收的数据可以是：基本类型、也可以是对象类型。
    - 基本类型的数据：响应式依然是靠`Object.defineProperty()`的get与set完成的。
    - 对象类型的数据：内部 “ 求助 ” 了Vue3.0中的一个新函数—— reactive函数。

#### 3. reactive函数

1. 作用: 定义一个`对象类型`的响应式数据（基本类型不要用它，要用ref函数）

2. 语法：`const 代理对象= reactive(源对象)`接收一个对象（或数组），返回一个代理对象（Proxy的实例对象，简称proxy对象）

3. reactive定义的响应式数据是“深层次的”。

4. 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。


#### 4. Vue3.0中的响应式原理

##### vue2.x的响应式

1. 实现原理：

    - 对象类型：通过Object.defineProperty()对属性的读取、修改进行拦截（数据劫持）。

    - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

        ```javascript    
        Object.defineProperty(data, 'count', {
            get () {}, 
            set () {}
        })
        ```

2. 存在问题：

    - 新增属性、删除属性, 界面不会更新。
    - 直接通过下标修改数组, 界面不会自动更新。

##### Vue3.0的响应式

1. 通过Proxy（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
2. 通过Reflect（反射）: 对源对象的属性进行操作。
3. MDN文档中描述的Proxy与Reflect：[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)  [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)


    ```javascript
    new Proxy(data, {
        // 拦截读取属性值
        get (target, prop) {
            return Reflect.get(target, prop)
        },
        // 拦截设置属性值或添加新属性
        set (target, prop, value) {
            return Reflect.set(target, prop, value)
        },
        // 拦截删除属性
        deleteProperty (target, prop) {
            return Reflect.deleteProperty(target, prop)
        }
    })

    proxy.name = 'tom'   
    ```

#### 5. reactive对比ref

1. 从定义数据角度对比：
    - ref用来定义：基本类型数据。
    - reactive用来定义：对象（或数组）类型数据。
    - 备注：ref也可以用来定义对象（或数组）类型数据, 它内部会自动通过reactive转为代理对象。

2. 从原理角度对比：
    - ref通过`Object.defineProperty()`的get与set来实现响应式（数据劫持）。
    - reactive通过使用Proxy来实现响应式（数据劫持）, 并通过Reflect操作源对象内部的数据。

3. 从使用角度对比：
    - ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要.value。
    - reactive定义的数据：操作数据与读取数据：均不需要.value。
