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
