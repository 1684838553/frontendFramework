<template>
   <div>
     <School name="武汉科技大学" :time="99" :getSchoolName="getSchoolName"/>
     <!-- <Student ref="student" v-on:atguigu="getStudentName"/> -->
     <Student ref="student"/>
     <hr>
     <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo"/>
        <MyList :todos="todos" :checkTodo="checkTodo" :deleteTodo="deleteTodo"/>
        <MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @clearAllDoneTodo="clearAllDoneTodo"/>
      </div>
    </div>
   </div>
</template>

<script>
import MyList from './components/MyList';
import MyFooter from './components/MyFooter';
import MyHeader from './components/MyHeader';
import School from './components/School';
import Student from "./components/Student";

export default {
  name: "App",
  //汇总所有的组件
  components:{
    Student,
    School,
    MyHeader,
    MyFooter,
    MyList
  },
  data() {
    return {
      todos: [
        { id: '001', title: '吃饭', done: true },
        { id: '002', title: '喝酒', done: false },
        { id: '003', title: '开车', done: false },
        { id: '004', title: '运动', done: true },
      ]
    }
  },
  mounted() {
    this.$refs.student.$on('atguigu', this.getStudentName)  // 绑定自定义事件
    // this.$refs.student.$once('atguigu', this.getStudentName)  // 绑定自定义事件, 一次性
  },
  methods: {
    addTodo(todo) {
      console.log('App组件，收到数据：', todo)
      this.todos.unshift(todo);
    },
    checkTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      todo.done = !todo.done;

      console.log(this.todos)
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    checkAllTodo(done) {
      this.todos.forEach(item => item.done = done)
    },
    clearAllDoneTodo(){
      this.todos = this.todos.filter(todo => !todo.done)
    },
    getStudentName(name) {
      console.log('App收到学生名：', name)
    },
    getSchoolName(name) {
      console.log('App收到学校名：', name)
    }
  },
}
</script>

<style>
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
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
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
