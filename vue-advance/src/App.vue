<template>
  <div>
    <div class="container">
      <Category title="美食">
        <ul slot="center">
          <li v-for="(item, index) in foods" :key="index">{{item}}</li>
        </ul>
      </Category>
      <Category title="游戏">
        <img slot="center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsDziaT-HYLBFWl7J83eOI70hnedVWL5R6Cnlh-Bxo4Rzb3o7f71A3wv0&s">
      </Category>
      <Category title="电影">
        <ul slot="center">
          <li v-for="(item, index) in films" :key="index">{{item}}</li>
        </ul>
        <template v-slot:footer>
          <div class="foot">
            <a href="http://baidu.com">经典</a>
            <a href="http://baidu.com">热门</a>
            <a href="http://baidu.com">推荐</a>
          </div>
          <h4>欢迎观影</h4>
        </template>
      </Category>
    </div>

    <!-- 作用域插槽 -->
  <div class="container">
      <Game title="游戏">
        <template scope="{games}"> 
          <ul>
            <li v-for="(item, index) in games" :key="index">{{item}}</li>
          </ul>
        </template>
      </Game>
      <Game title="游戏">
        <template scope="gameData"> 
          <ol>
            <li v-for="(item, index) in gameData.games" :key="index">{{item}}</li>
          </ol>
        </template>
      </Game>
      <Game title="游戏">
        <template scope="gameData"> 
            <h4 v-for="(item, index) in gameData.games" :key="index">{{item}}</h4>
        </template>
      </Game>
      
    </div>
    <!-- <Animated /> -->
    <hr />
    <School name="武汉科技大学" :time="99" :getSchoolName="getSchoolName" />
    <!-- <Student ref="student" v-on:atguigu="getStudentName"/> -->
    <Student ref="student" />
    <hr />
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo" />
        <!-- <MyList :todos="todos" :checkTodo="checkTodo" :deleteTodo="deleteTodo"/> -->
        <MyList :todos="todos" />
        <MyFooter
          :todos="todos"
          @checkAllTodo="checkAllTodo"
          @clearAllDoneTodo="clearAllDoneTodo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import pubsub from "pubsub-js";

import MyList from "./components/MyList";
import MyFooter from "./components/MyFooter";
import MyHeader from "./components/MyHeader";
import School from "./components/School";
import Student from "./components/Student";
import Animated from "./components/Animated";
import Category from "./components/Category";
import Game from "./components/Game.vue";

export default {
  name: "App",
  //汇总所有的组件
  components: {
    Student,
    School,
    MyHeader,
    MyFooter,
    MyList,
    Animated,
    Category,
    Game,
  },
  data() {
    return {
      todos: [
        { id: "001", title: "吃饭", done: true },
        { id: "002", title: "喝酒", done: false },
        { id: "003", title: "开车", done: false },
        { id: "004", title: "运动", done: true },
      ],
      foods: ["火锅", "烧烤", "小龙虾", "牛排"],
      games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
      films: ["教父", "拆弹专家", "你好，李焕英", "尚硅谷"],
    };
  },
  mounted() {
    this.$refs.student.$on("atguigu", this.getStudentName); // 绑定自定义事件
    // this.$refs.student.$once('atguigu', this.getStudentName)  // 绑定自定义事件, 一次性

    this.$bus.$on("checkTodo", this.checkTodo);
    this.$bus.$on("updateTodo", this.updateTodo);
    // this.$bus.$on('deleteTodo', this.deleteTodo);
    this.pubId = pubsub.subscribe("deleteTodo", this.deleteTodo);
  },
  beforeDestroy() {
    // this.$bus.$off(['checkTodo', 'deleteTodo']);
    this.$bus.$off(["checkTodo", "updateTodo"]);
    pubsub.unsubscribe(this.pubId);
  },
  methods: {
    addTodo(todo) {
      console.log("App组件，收到数据：", todo);
      this.todos.unshift(todo);
    },
    checkTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.done = !todo.done;

      console.log(this.todos);
    },
    // deleteTodo(id) {
    deleteTodo(_, id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    checkAllTodo(done) {
      this.todos.forEach((item) => (item.done = done));
    },
    clearAllDoneTodo() {
      this.todos = this.todos.filter((todo) => !todo.done);
    },
    getStudentName(name) {
      console.log("App收到学生名：", name);
    },
    getSchoolName(name) {
      console.log("App收到学校名：", name);
    },
    updateTodo(id, title) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.title = title;
      });
    },
  },
};
</script>

<style>
.container,
.foot {
  display: flex;
  justify-content: space-around;
}

.container {
  margin-bottom: 8px;
}

h4 {
  text-align: center;
}

/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
