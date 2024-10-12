## 进阶语法

### 1、脚手架

1. 全局安装`@vue/cli`

    命令：`npm  install -g @vue/cli`

2. **切到需要创建项目的目录**，使用命令创建项目

    `vue create 项目名称`

3. 启动项目

    `npm run serve`

### 2、关于不同版本的Vue

1. vue.js与vue.runtime.xxx.js的区别：
    - vue.js是完整版的Vue，包含：核心功能+模板解析器。
    - vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。

2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容。

    ```javascript
    // h是createElement函数
    new Vue({render: h => h(App)}).$mount('#app')
    ```

### 3、`vue.config.js`配置文件

1. 使用vue inspect > output.js查看项目的默认配置。只能查看，修改无效。

2. 可以在`vue.config.js`文件中个性化定制组件，具体修改参考官网 [https://cli.vuejs.org/zh/config/](https://cli.vuejs.org/zh/config/)

### 4、ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
    - 打标识：`<h1 ref="xxx">.....</h1>` 或` <School ref="xxx"></School>`
    - 获取：`this.$refs.xxx`

### 5、props配置项

1. 功能：让组件接收外部传过来的数据

2. 传递数据：`<Demo name="xxx"/>`

3. 接收数据：

    1. 第一种方式（只接收）：props:['name'] 

    3. 第二种方式（限制类型）：props:{name:String}

    3. 第三种方式（限制类型、限制必要性、指定默认值）：

        `````javascript
        props:{
            name:{
                type:String, //类型
                required:true, //必要性
                default:'老王' //默认值
            }
        }
        ```
4. 备注

    props是**只读的**，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

### 6、mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

    - 第一步定义混合：

        ```javascript
        {
            data(){....},
            methods:{....}
            ....
        }
        ```
    - 第二步使用混入：
​       全局混入：`Vue.mixin(xxx)`​ 局部混入：`mixins:['xxx']`

### 7、插件

1. 功能：用于增强Vue

2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

    ```javascript
    对象.install = function (Vue, options) {
        // 1. 添加全局过滤器
        Vue.filter(....)

        // 2. 添加全局指令
        Vue.directive(....)

        // 3. 配置全局混入(合)
        Vue.mixin(....)

        // 4. 添加实例方法
        Vue.prototype.$myMethod = function () {...}
        Vue.prototype.$myProperty = xxxx
    }
    ```
4. 使用插件：`Vue.use()`

### 8、scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：`<style scoped>`

### 9、总结TodoList案例

1. 组件化编码流程：

    1. 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

    2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
        - 一个组件在用：放在组件自身即可。
        - 一些组件在用：放在他们共同的父组件上（状态提升）。
    3. 实现交互：从绑定事件开始。

2. props适用于：

    1. 父组件 ==> 子组件 通信

    2. 子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

### 10、webStorage

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

    1. xxxxxStorage.setItem('key', 'value'); 该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

    2. xxxxxStorage.getItem('person');

        该方法接受一个键名作为参数，返回键名对应的值。

    3. xxxxxStorage.removeItem('key');

        该方法接受一个键名作为参数，并把该键名从存储中删除。

    4. xxxxxStorage.clear()

        该方法会清空存储中的所有数据

4. 备注：

    1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
    2. LocalStorage存储的内容，需要手动清除才会消失。
    3. xxxxxStorage.getItem(xxx)如果xxx对应的value获取不到，那么getItem的返回值是null。
    4. JSON.parse(null)的结果依然是null。


