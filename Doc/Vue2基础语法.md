## 基础语法

1. 指定当前Vue实例为哪个容器，值通常为css选择器；容器和实例是一对一关系
2. 语法
    - 插值语法：{{}} 里面写js表达式
    - 指令语法: 给标签中的任何属性和值绑定值；v-bind:  ===简写===> :
3. vue中有两种数据绑定方式
    - 单向绑定（v-bind）：数据只能从data流向页面
    - 双向绑定（v-model）：数据不仅能从data流向页面，还可以从页面流向data
    - 备注：
        1. 双向绑定一般应用在表单元素上
        2. v-model:value可以简写为v-model
4. el的两种写法
    - new Vue时，传入el的参数： `new Vue({el: '容器'})`
    - 获取Vue的实例化对象，使用$mount挂载dom, `vue.$mount('容器')`
5. data的两种写法
    - 对象式：`data: {name: '张三'}`
    - 函数式：`data(){return {name: '张三'}}`  函数中的this指向Vue实例，不能写成箭头函数，箭头函数this指向全局对象
6. MVVM模型
    - M：模型（Model）：data中的数据
    - V：视图（View）：模板代码
    - VM：视图模型（ViewModel）：Vue实例对象

    ![](./image/MVVM.PNG)