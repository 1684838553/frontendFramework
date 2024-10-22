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
