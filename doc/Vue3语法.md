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

    1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）

        ```javascript
        setup() {
            let name = 'world';

            return {
                name
            }
        }
        ```

    2. 若返回一个渲染函数：则可以自定义渲染内容。（了解）
        ```javascript
        import { h } from 'vue';
        setup() {
            return () => h('h3', 'Hello China')
        }
        ```

5. 注意点：
    1. 尽量不要与Vue2.x配置混用
        - Vue2.x配置（data、methos、computed...）中可以访问到setup中的属性、方法。
        - 但在setup中不能访问到Vue2.x配置（data、methos、computed...）。
        - 如果有重名, setup优先。
    2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

6. 两个注意点

    1. setup执行的时机
        - 在`beforeCreate`之前执行一次，this是`undefined`。
    2. setup的参数
        - `props`：值为对象，包含：组件外部传递过来，且
        - `context`：上下文对象
            1. `attrs`: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 this.$attrs。
            2. `slots`: 收到的插槽内容, 相当于 this.$slots。
            3. `emit`: 分发自定义事件的函数, 相当于 this.$emit

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

#### 6. 计算属性与监视

##### 1. computed函数

1. 与Vue2.x中computed配置功能一致

2. 写法

    ```javascript
    import { computed } from 'vue'

    setup(){
        ...
        //计算属性——简写
        let fullName = computed(()=>{
            return person.firstName + '-' + person.lastName
        })
        //计算属性——完整
        let fullName = computed({
            get(){
                return person.firstName + '-' + person.lastName
            },
            set(value){
                const nameArr = value.split('-')
                person.firstName = nameArr[0]
                person.lastName = nameArr[1]
            }
        })
    }
    ```

##### 2. watch函数

1. 与Vue2.x中watch配置功能一致

2. 几个小“坑”：

    1. 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
    2. 监视reactive定义的响应式数据中某个属性（这个属性也是对象）时：deep配置有效。
    3. 监听ref定义的基本类型时，监听的数据不能加`.value`；监听ref定义的引用类型时，监听的数据加`.value`
       
        ```javascript
        //情况一：监视ref定义的响应式数据
        watch(sum,(newValue,oldValue)=>{
            console.log('sum变化了',newValue,oldValue)
        },{ immediate:true })

        //情况二：监视多个ref定义的响应式数据
        watch([sum,msg],(newValue,oldValue)=>{
            console.log('sum或msg变化了',newValue,oldValue)
        }) 

        /* 情况三：监视reactive定义的响应式数据
                若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
                若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
        */
        watch(person,(newValue,oldValue)=>{
            console.log('person变化了',newValue,oldValue)
        },{immediate:true,deep:false}) //此处的deep配置不再奏效

        //情况四：监视reactive定义的响应式数据中的某个属性
        watch(()=>person.job,(newValue,oldValue)=>{
            console.log('person的job变化了',newValue,oldValue)
        },{immediate:true,deep:true}) 

        //情况五：监视reactive定义的响应式数据中的某些属性
        watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
            console.log('person的job变化了',newValue,oldValue)
        },{immediate:true,deep:true})

        //特殊情况
        watch(()=>person.job,(newValue,oldValue)=>{
            console.log('person的job变化了',newValue,oldValue)
        },{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
        ```

##### 3. watchEffect函数

1. watch的套路是：既要指明监视的属性，也要指明监视的回调。

2. watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

3. watchEffect有点像computed：

    - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
    - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

    ```javascript
    //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
    watchEffect(()=>{
        const x1 = sum.value
        const x2 = person.age
        console.log('watchEffect配置的回调执行了')
    })
    ```

#### 7. 生命周期

![](https://cn.vuejs.org/assets/lifecycle_zh-CN.W0MNXI0C.png)


1. Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：

    - beforeDestroy改名为 beforeUnmount
    - destroyed改名为 unmounted

2. Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
    > beforeCreate和created两个生命周期没有对应的组合api，直接在setup里面执行；可以使用vue2的方式去写生命周期函数，不一定要写在组合api里面
    - beforeCreate===>setup()
    - created=======>setup()
    - beforeMount ===>onBeforeMount
    - mounted=======>onMounted
    - beforeUpdate===>onBeforeUpdate
    - updated =======>onUpdated
    - beforeUnmount ==>onBeforeUnmount
    - unmounted =====>onUnmounted

#### 8. 自定义hook函数

1. 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。

2. 类似于vue2.x中的mixin。

3. 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。

#### 9. toRef

1. 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。

2. 语法：`const name = toRef(person,'name')`

3. 应用: 要将响应式对象中的某个属性单独提供给外部使用时。

4. 扩展：toRefs 与toRef功能一致，但可以批量创建多个 ref 对象，语法：`toRefs(person)`

### 3. 其他 Composition API

#### 1. shallowReactive 与 shallowRef

1. `shallowReactive`：只处理对象最外层属性的响应式（浅响应式）。

2. `shallowRef`：只处理基本数据类型的响应式, 不进行对象的响应式处理。

3. 什么时候使用?

    - 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
    - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

#### 2. readonly 与 shallowReadonly

1. `readonly`: 让一个响应式数据变为只读的（深只读）。

2. `shallowReadonly`：让一个响应式数据变为只读的（浅只读，第一层）。

3. 应用场景: 不希望数据(尤其是这个数据是来自与其他组件时)被修改时。

#### 3. toRaw 与 markRaw

1. toRaw：

    - 作用：将一个由reactive生成的`响应式`对象转为`普通对象`。
    - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。

2. markRaw：

    - 作用：标记一个对象，使其永远不会再成为响应式对象。
    - 应用场景:
        1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
        2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

#### 4. customRef

1. 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

2. 实现防抖效果：

    ```javascript
    <template>
        <input type="text" v-model="keyword">
        <h3>{{keyword}}</h3>
    </template>

    <script>
        import {ref,customRef} from 'vue'
        export default {
            name:'Demo',
            setup(){
                // let keyword = ref('hello') //使用Vue准备好的内置ref
                //自定义一个myRef
                function myRef(value,delay){
                    let timer
                    //通过customRef去实现自定义
                    return customRef((track,trigger)=>{
                        return{
                            get(){
                                track() //告诉Vue这个value值是需要被“追踪”的
                                return value
                            },
                            set(newValue){
                                clearTimeout(timer)
                                timer = setTimeout(()=>{
                                    value = newValue
                                    trigger() //告诉Vue去更新界面
                                },delay)
                            }
                        }
                    })
                }
                let keyword = myRef('hello',500) //使用程序员自定义的ref
                return {
                    keyword
                }
            }
        }
    </script>
    ```

#### 5. provide 与 inject

1. 作用：实现祖与后代组件间通信

2. 套路：父组件有一个 provide 选项来提供数据，后代组件有一个 inject 选项来开始使用这些数据

3. 具体写法：

    - 祖组件中：

        ```javascript
        setup(){
            ......
            let car = reactive({name:'奔驰',price:'40万'})
            provide('car',car)
            ......
        }
        ```

    - 后代组件中：

        ```javascript
        setup(props,context){
            ......
            const car = inject('car')
            return {car}
            ......
        }
        ```

#### 6. 响应式数据的判断

1. `isRef`: 检查一个值是否为一个 ref 对象

2. `isReactive`: 检查一个对象是否是由 reactive 创建的响应式代理

3. `isReadonly`: 检查一个对象是否是由 readonly 创建的只读代理

4. `isProxy`: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理


### 4. 新的组件

#### 1. Fragment

1. 在Vue2中: 组件必须有一个根标签

2. 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中

3. 好处: 减少标签层级, 减小内存占用

#### 2. Teleport

什么是Teleport？—— Teleport 是一种能够将我们的组件html结构移动到指定位置的技术。

```html
<!-- to="移动位置" -->
<!-- 这个dom元素是body子元素 -->
<teleport to="body">
	<div v-if="isShow" class="mask">
		<div class="dialog">
			<h3>我是一个弹窗</h3>
			<button @click="isShow = false">关闭弹窗</button>
		</div>
	</div>
</teleport>
```

#### 3. Suspense

1. 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

2. 使用步骤：

    - 异步引入组件

        ```javascript      
        import {defineAsyncComponent} from 'vue'
        const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
        ```
    
    - 使用Suspense包裹组件，并配置好default 与 fallback

        ```html
        <template>
            <div class="app">
                <h3>我是App组件</h3>
                <Suspense>
                    <template v-slot:default>
                        <Child/>
                    </template>
                    <template v-slot:fallback>
                        <h3>加载中.....</h3>
                    </template>
                </Suspense>
            </div>
        </template>
        ```
