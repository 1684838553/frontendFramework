## React

### 1. 简介

#### 1. 定义

React一个将数据渲染为html视图的开源js库。

- 是一个将数据渲染为 HTML 视图的开源 JS 库
- 它遵循基于组件的方法，有助于构建可重用的 UI 组件
- 它用于开发复杂的交互式的 web 和移动 UI

#### 2. 特点

1. 使用虚拟 DOM 而不是真正的 DOM
2. 可以用服务器渲染
3. 遵循单向数据流或数据绑定
4. 高效
5. 声明式编码，组件化编码

#### 3. 优点

1. 它提高了应用的性能
2. 可以方便在客户端和服务器端使用
3. 由于使用 JSX，代码的可读性更好
4. 使用React，编写 UI 测试用例变得非常容易

#### 4. 为什么学

1. 原生JS操作DOM繁琐，效率低
2. 使用JS直接操作DOM,浏览器会进行大量的重绘重排
3. 原生JS没有组件化编码方案，代码复用低

### 2. 虚拟dom和真实dom

#### 1. 虚拟 dom

1. 本质是一个Object对象
2. 比较”轻“，因为虚拟dom是react内部在用，无需真是dom上那么多属性
3. 虚拟dom最终会被react转化为真实dom，呈现在页面上

#### 2. 真实 dom

1. 浏览器中实际存在的DOM树，它直接反映了HTML文档的结构和状态

### 3. JSX

#### 1. 定义

1. JSX是`JavaScript`和`HTML`缩写，表示在JS代码中编写HTML模板结构，它是react中编写UI模板的方式

    ```javascript
    function App() {
        return (
            <div className="App">
                this is App
            </div>
        );
    }
    ```

2. `HTML`的声明方式和`JS`的可编程能力

3. JS的语法扩展，浏览器本身不能识别，需要解析工具解析后才能运行

    ![](./image/jsx.PNG)

4. 注意点

    - 定义虚拟dom时，不要写引号
    - 标签中混入js表达式时要用{}
    - 样式的类名指定不要用`class`，要用`className`
    - 内敛样式要使用{{}}包裹
    - 不能有多个根标签，只能有一个根标签
    - JSX的标签必须正确结束（自结束标签必须写/）
    - JSX中html标签应该小写，React组件应该大写开头。如果小写字母开头，就将标签转化为 html 同名元素，如果 html 中无该标签对应的元素，就报错；如果是大写字母开头，react 就去渲染对应的组件，如果没有就报错
    - 如果表达式是空值、布尔值、undefined，将不会显示
        > 关于JS表达式和JS语句:
        >
        > JS表达式：返回一个值，可以放在任何一个需要值的地方 a a+b demo(a) arr.map() function text(){}
        >
        > JS语句：if(){} for(){} while(){} swith(){} 不会返回一个值
    - 注释写在花括号里
    - JSX 允许在模板中插入数组，数组自动展开全部成员
        ```javascript
        var arr = [
            <h1>小丞</h1>,
            <h2>同学</h2>,
        ];
        ReactDOM.render(
            <div>{arr}</div>,
            document.getElementById('example')
        );
        ```

#### 2. 在JSX中使用JS表达式

在jsx中可以通过`大括号{}`识别js中的表达式；if语句，switch语句等属于语句，不是表达式，不能在大括号中展示

1. 使用引号传递字符串

2. 使用js变量

3. 函数调用和方法调用

4. 使用js对象

    ```javascript
    export default function Basic() {
        const count = 100;
        return (
            <div>
                {'this is basic component'}
                {getComponentName()}
                {count}
                {new Date().getDate()}
                <div style={{ color: 'red' }}>展示一下对象</div>
            </div>
        );
    }
    ```

#### 3. 列表渲染

`key`: 独一无二的字符串或number

```javascript
<ul>
    {
        list.map(item => {
            return <li key={item.id}>{item.name}</li>
        })
    }
</ul>
```

#### 3. 条件渲染

1. 基础渲染： 逻辑与运算符`&&`，三元表达式 `?:`

2. 高级渲染

    ```javascript
    const articleType = 1; // 0 1 2

    function getArticleItem(articleType) {
        if(articleType === 0) {
            return <div>我是无图模式</div>
        } else if(articleType === 1) {
            return <div>我是单图模式</div>
        } else if(articleType === 2) {
            return <div>我是三图模式</div>
        }
    }
    ```

### 4.组件

当应用是以多组件的方式实现，这个应用就是一个组件化的应用

- 函数组件
- 类式组件

#### 1. 函数式组件

定义组件最简单的方式就是编写 JavaScript 函数：

```js
 //1.创建函数式组件
      function MyComponent(props) {
        console.log(this) //此处的this是undefined，因为babel编译后开启了严格模式
        return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
      }

 //2.渲染组件到页面
      ReactDOM.render(<MyComponent />, document.getElementById('test'))
```

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

#### 2. 类式组件

```js
class MyComponent extends React.Component {
        render() {
          console.log('render中的this:', this)
          return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
        }
      }

ReactDOM.render(<MyComponent />, document.getElementById('test'))
```

每次组件更新时 `render` 方法都会被调用，但只要在相同的 DOM 节点中渲染 `<MyComponent/>` ，就仅有一个 `MyComponent` 组件的 class 实例被创建使用。这就使得我们可以使用如 state 或生命周期方法等很多其他特性。

**执行过程：**

1. React解析组件标签，找到相应的组件

2. 发现组件是类定义的，随后new出来的类的实例，并通过该实例调用到原型上的render方法

3. 将render返回的虚拟DOM转化为真实的DOM,随后呈现在页面中