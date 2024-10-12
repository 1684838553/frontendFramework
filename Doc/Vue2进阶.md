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