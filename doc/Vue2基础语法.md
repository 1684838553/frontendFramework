## 基础语法

### 1、Vue容器

指定当前Vue实例为哪个容器，值通常为css选择器；容器和实例是一对一关系

1. el的两种写法：

    - new Vue时，传入el的参数： `new Vue({el: '容器'})`
    - 获取Vue的实例化对象，使用$mount挂载dom, `vue.$mount('容器')`

### 2、 指令

#### 1、插值语法

{{}} 里面写js表达式

#### 2、指令语法

##### 1、内置指令

1. `v-bind`: 给标签中的任何属性和值绑定值；简写为 :
2. `v-model`: 双向绑定，只能用于表单元素，如input、select、textarea等
3. `v-on`: 给标签绑定事件，简写为 @
4. `v-for`: 遍历数组或对象，生成多个标签
5. `v-if`, `v-else-if`, `v-else`: 条件渲染，动态控制某个节点是否存在
6. `v-show`：条件渲染，动态控制某个节点是否显示
7. `v-text`: 向标签中插入文本，会替换标签中的内容。与插值语法的区别：`v-text`会替换掉节点中的内容，插值语法不会
8. `v-html`: 向标签中插入html代码，会替换掉标签中的内容。
    - 与插值语法的区别：`v-html`会替换掉节点中的内容，插值语法不会； `v-html`可以识别html结构
    - **严重注意：**`v-html`有安全性问题！！！
        1）在网站上动态渲染任意html是非常危险的，容易导致xss攻击
        2）2）一定要在可信的内容上使用v-html，永远不要用在用户提交的内容上
9. `v-cloak`: 防止闪现，与css配合使用
    - 本质是一个特殊的熟悉感，Vue实例创建完毕并接管容器后，会删掉`v-cloak`属性
    - 使用css配合`v-cloak`可以解决网速慢时页面展示出来的{{}}语法的问题
        ```css
        [v-cloak] {
            display: none;
        }
        ```
10. `v-once`: 只渲染一次，之后数据改变不会引起视图的重新渲染（渲染初始值），在标签上加上`v-once`指令
11. `v-pre`: 跳过这个元素所在的节点的编译过程
    - 可利用它跳过：没有使用指令的节点，没有插值语法的节点

##### 2、自定义指令

1. 定义语法

    - 局部指令：`new Vue({directives: {指令名: 配置对象}})` 或 `new Vue({directives: {指令名: 回调函数}})`

    - 全局指令：`Vue.directive('指令名', 配置对象)` 或 `Vue.directive('指令名', 回调函数)`

2. 配置对象中常用的3个回调函数

    -  `bind`：指令与元素成功绑定时调用
    -  `inserted`：指令所在元素被插入页面时调用
    -  `update`：指令所在模板结构被重新解析时调用

3. 备注

    - 指令定义时不加v-前缀，但使用时要加
    - 指令名如果是多个单词，要使用kebab-case命名方式，不要使用camelCase命名方式

### 3、 vue中有两种数据绑定方式

1. 数据绑定
   
    - 单向绑定（v-bind）：数据只能从data流向页面
    - 双向绑定（v-model）：数据不仅能从data流向页面，还可以从页面流向data
    - 备注：
        1. 双向绑定一般应用在表单元素上
        2. v-model:value可以简写为v-model

2. data的两种写法
    - 对象式：`data: {name: '张三'}`
    - 函数式：`data(){return {name: '张三'}}`  函数中的this指向Vue实例，不能写成箭头函数，箭头函数this指向全局对象

### 4、MVVM模型
- M：模型（Model）：data中的数据
- V：视图（View）：模板代码
- VM：视图模型（ViewModel）：Vue实例对象

    ![](./image/MVVM.PNG)
    ![](./image/MVVN-code.PNG)

### 5、数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）

Objecect.defineProperty()方法：Vue2中实现数据代理的核心方法。作用：给对象添加属性，或修改对象的属性值

- enumerable: false   是否可枚举，默认为false，不可枚举，即不可通过for...in循环遍历，不可通过Object.keys()获取属性名，不可通过JSON.stringify()序列化对象
- configurable: false  是否可删除，默认为false，不可删除，即不可通过delete删除属性
- writable: false 是否可可修改，默认为false，不可修改，即不可通过赋值操作修改属性值

    ```javascript
    // 通过obj1.x来操作obj.x, obj.x的值变化之后，obj1.x会自动变化，反之亦然
    const obj = { x: 100 }
    const obj1 = { y: 200 }

    Object.defineProperty(obj1, 'x', {
        get() {
            return obj.x
        }, 
        set(value) {
            obj.x = value
        }
    })
    ```
    ![](./image/defineProperty.PNG)

### 6、事件处理

#### 1、事件绑定

1. 使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名
2. 事件的回调需要配置在methods对象中，最终会在vm上；
3. methods中配置的函数，，不要用箭头函数，否则this指向的是window，不是Vue实例
4. methods中配置的函数，都是被被Vue所管理的函数，this指向Vue实例，所以可以访问data中的属性
5. @click="demo" 和 @click="demo($event)" 效果一样，但后者可以传参，$event代表原生事件对象

#### 2、事件修饰符

可以连续写

1. preventent：阻止默认事件（常用）
2. stop：阻止事件冒泡（常用）（冒泡：由内到外，子元素到父元素）（冒泡时，触发父元素的事件，但是target还是指向子元素）
3. once：事件只触发一次（常用）
4. capture：使用事件的捕获模式（由外往内）
5. self：只有event.target是当前操作的元素时才触发事件，冒泡触发时，因为target是指向子元素，所以这个方法不执行，一定程度上上可以阻止冒泡
6. passive：事件的默认行为立即执行，无需等待事件回调执行完毕（比如绑定滚动事件，默认会先执行事件中的代码，在去滚动页面，passive会先关东页面，在执行绑定的方法）

#### 3、键盘事件: 

1. vue中常用的按键别名  `@keyup.enter: 给enter按键绑定事件`

    1. 回车 - enter（13）
    2. 删除 - delete
    3. 退出 - esc
    4. 空格 - space
    5. 换行 - tab （移除焦点，不建议使用keyup, 配合keydown使用）
    6. 上 - up
    7. 下 - down
    8. 左 - left
    9. 右 - right

2. 系统修饰键：ctrl、alt、shift、meta（win键） `@keyup.ctrl.y`

    1. 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放
    2. 配合keydown使用，正常触发事件
    3. vue未提供别名的按键，可以使用按键原始的的key值去绑定，但要注意转为kebab-case（短横线命名）
    4. Vue.config.keyCodes.自定义键名 = 键码， 可以去定制按键别名

### 7、计算属性 computed和监视属性 watch

#### 1、计算属性

1. 初次读取或依赖的数据发生改变，会被调用
2. 与methods实现相比，内部有缓存机制，效率更高，调试方便
3. 备注：计算`属性`最终会出现在Vue实例上，直接读取使用即可

#### 2、监视属性

1. 当被监视的属性变化时，回调函数自动调用
2. 监视的属性必须存在，才能进行监视！！
3. 监视属性的两种写法：
    - new Vue时传入watch配置
    - 通过vm.$watch监视

#### 3、深度监视

1. Vue中watch默认不监视对象内部值的改变（一层监视）
2. 配置deep: true 可以进行深度监视（多层）
3. 备注：
    - Vue自身可以监视对象内部值的改变，但Vue提供的watch默认不可以！！！
    - 通过watch进行深度监视，可以深度监视对象内部值的变化

#### 4、watch与computed对比

1. compputed能完成的功能，watch都可以完成, 两个都能完成的功能，computed效率更高
2. watch能完成的功能，computed不一定能完成，例如watch可以进行异步操作
3. 两个重要的小原则：
    - 所有被Vue管理的函数，最好写成普通函数，这样this的指向才是vm或组件实例对象
    - 所有不被Vue管理的函数（定时器回调、ajax回调函数等），最好写成箭头函数（箭头函数会从它们的包含上下文中继承 this 值），这样this的指向才是vm或组件实例

### 8、绑定class和style样式

#### 1、绑定class样式

写法： `:class="xxx" xxx可以是字符串，对象，数组`

1. 字符串： 类名不确定，要动态获取
2. 对象： 绑定多个样式，个数不确定，名字也不确定
3. 数组： 绑定多个样式，个数确定，名字也确定，但要动态决定用不用 

#### 1、绑定style样式

写法： `:style="xxx" xxx可以是字符串，对象，数组`

1. `:style="{fontSize: fsize + 'px'}"`其中xxx是动态值
2. `:style="[a, b]"`其中a和b是样式对象

### 9、渲染

#### 1、条件渲染

##### 1、v-if

写法：`v-if='表达式'`  `v-else-if='表达式'`  `v-else='表达式'`

1. 适用于切换频率较低的场景，直接将dom元素移除
2. 上面三个指令可一起使用，但要求结构不被打断
3. 可以和template标签一起使用，将需要隐藏的dom元素包裹起来，在template上使用v-if指令，不修改dom结构

##### 2、v-show

写法：`v-show='表达式'`

1. 切换频率较高的场景，display: none
2. 使用v-if元素可能无法获取到，而使用v-show可以获取到

#### 2、列表渲染

##### 1、v-for指令

1. 用于展示列表数据
2. 语法：`v-for="(item, index) in xxx" :key="yyy"` 其中xxx是数组，yyy是唯一标识`
3. 可遍历：数组、、对象、字符串（用的少）、指定次数（用的少）

##### 2、key作用与原理

面试题：：react、vue中的key有什么作用？（key的原理）

1. 虚拟DOM中key的作用：key是虚拟DOM对象的标识，当状态中的数据发生变化时，Vue会根据新数据生成新的虚拟DOM，随后Vue将新虚拟DOM与旧虚拟DOM进行对比（diff算法）

2. 对比规则：
    
    - 旧虚拟DOM中找到了与新虚拟DOM相同的key：
        - 若虚拟DOM中内容没变，直接使用之前的真实DOM
        - 若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM
    
    - 旧虚拟DOM中未找到与新虚拟DOM相同的key：创建新的真实DOM，随后渲染到页面

3. 用index作为key可能会引发的问题：

    - 若对数据进行逆序添加、逆序删除等破坏顺序的操作：会产生没有必要的真实DOM更新 ==> 界面效果没问题，但效率低

    - 如果结构中还包含输入类的DOM：会产生错误DOM更新 ==> 界面有问题

4. 开发中如何选择key：

    - 最好使用每条数据的唯一标识作为key，比如id、手机号、身份证号、学号等唯一标识

    - 如果不存在对数据的逆序添加、逆序删除等破坏顺序的操作，仅用于渲染列表用于展示，使用index作为key是没有问题的

![](./image/key-diff.PNG)

### 10、数据监测原理

1. Vue会监视data中所有层次的数据

2. Vue如何监测对象中的数据？

    通过setter实现监视，且要在new Vue时就传入要监测的数据

    1. 对象中后添加的属性，Vue默认不做响应式处理

    2. 如需给后添加的属性做响应式处理，请使用Vue.set(target, propertyName/index, value) 或vm.$set(target, propertyName/index, value)

3. 如何监测数组中的数据？（可查看vue.js第864行源码）

    通过包裹数组更新元素的方法实现，本质就是做了两件事：

    1. 调用原生对应的方法对数组进行更新

    2. 重新解析模板，进而更新页面

    3. 在vue中修改数组中某个元素，一定要用到以下方法：
        - 使用这些API：pop(), push(), shift(), unshift(), splice(), sort(), reverse()
        - 使用Vue.set() 或 vm.$set()

    4. 注意：Vue.set()和vm.$set()不能给vue或vue的跟数据对象添加属性！！！

4. **数据劫持**

### 11、收集表单数据

1. `<input type="text">`, v-model收集的是value值，用户输入的就是value值
2. `<input type="radio">`, v-model收集的是value值，需要给标签配置value值
3. `<<input type="checkbox">`">`, 
    - 没有配置value属性，v-model收集的是checked（勾选或未勾选，是布尔值）
    - 配置了value属性: 1）v-model的初始值是非数组，那么收集的是checked（勾选或未勾选，是布尔值） 2）v-model的初始值是数组，v-model收集的是value组成的数组
4. 备注：v-model的三个修饰符：
    - lazy：失去焦点再收集数据
    - number：输入字符串转为有效的数字
    - trim：输入首尾空格过滤

### 12、过滤器

1. 定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）
2. 语法：
    - 注册过滤器：Vue.filter(name, callback) 或 new Vue(filters: {})
    - 使用过滤器：{{ xxx | 过滤器名 }}  其中xxx是数据，过滤器名就是自定义的过滤器名
3. 备注
    - 过滤器也可以接收额外参数，多个过滤器也可以串联
    - 并没有改变原本的数据，是产生新的对应的数据 

### 13、生命周期

![](./image/lifecycle.PNG)

#### 1. 常用的生命周期钩子：

1. mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
2. beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

    ![](./image/lifecycle-1.PNG)

#### 2. 关于销毁Vue实例

1. 销毁后借助Vue开发者工具看不到任何信息。
2. 销毁后自定义事件会失效，但原生DOM事件依然有效。(click之类的原生事件依然会被调用)
3. 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。

### 14、组件

定义：实现应用中局部功能代码和资源的集合

#### 1. Vue中使用组件的三大步骤：

1. 定义组件（创建组件）

    1. 使用`Vue.extend(options)`创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
    2. 区别如下：
        1. el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
        2. data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
		3. 备注：使用template可以配置组件结构。

2. 注册组件

    1. 局部注册：靠new Vue的时候传入components选项
	2. 全局注册：靠Vue.component('组件名',组件)

3. 使用组件(写组件标签)

	`<school></school>`

#### 2. 几个注意点

1. 关于组件名:
	- 一个单词组成：
        第一种写法(首字母小写)：school
        第二种写法(首字母大写)：School
	- 多个单词组成：
        第一种写法(kebab-case命名)：my-school
        第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
	- 备注：
        (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
        (2).可以使用name配置项指定组件在开发者工具中呈现的名字。

2. 关于组件标签:
    - 第一种写法：<school></school>
    - 第二种写法：<school/>
    - 备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。

3. 一个简写方式：
	`const school = Vue.extend(options)` 可简写为：`const school = options`

#### 3. 关于VueComponent

1. school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。

2. 我们只需要写`<school/>`或`<school></school>`，Vue解析时会帮我们创建school组件的实例对象，即Vue帮我们执行的：`new VueComponent(options)`。

3. 特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！注意这一点很重要

4. 关于this指向：
    1. 组件配置中： data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
    2. `new Vue(options)`配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。

5. VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。Vue的实例对象，以后简称vm。

6. 因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。所以vm与vc属性配置并不是一模一样，尽管vc底层复用了很多vm的逻辑

#### 4. 一个重要的内置关系

`VueComponent.prototype.__proto__ === Vue.prototype`, 让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。

![](./image/prototype.PNG)
