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
