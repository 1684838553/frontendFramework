<template>
   <div>
      <h1 v-text="msg" ref="title"></h1>
      <button @click="showDom">点我展示dom</button>
      <div @click="showName">学生姓名:{{ name }}</div>
      <div>学生年龄:{{ age }}</div>
      <button @click="sendStudentName">把学生名给App</button>
      <button @click="sendStudentName1">把学生名给School</button>
      <!-- <h2 v-show="!!students.length">这是学生列表</h2>
      <div v-for="student in students" :key="student.id">
        姓名：{{student.name}} 年龄：{{student.age}}
      </div> -->
   </div>
</template>

<script>
  import { mixin, mixin1 } from '../mixin';
  import pubsub from 'pubsub-js';
  import axios from 'axios';

  export default {
    // eslint-disable-next-line
    name: 'Student',
    data(){
      return {
        name:'panyue',
        age:21,
        msg: "这是学生信息",
        students: []
      }
    },
    created() {
      this.getSchool();
      this.getStudents();
    },
    methods: {
      async getStudents() {
        // 服务器设置可跨域时，可以直接向服务器请求，端口5000
        // const result = await axios.get('http://localhost:5000/students');
        // 服务器没有设置可跨域时，在vue.config.js文件配置代理，向代理服务器发送请求，端口是当前项目的端口
        const result = await axios.get('http://localhost:8080/api/students');
        if(result.status === 200) {
          console.log('学生信息', result.data);
          this.students = result.data;
        } else {
          console.log(result.message);
        }
      },
      async getSchool() {
        try {
          const result = await axios.get('http://localhost:8080/demo/school');
          console.log('学校信息', result)
        }catch(err) {
          console.log(err);
        }
      },
      showDom() {
        console.log(this.$refs.title)
      },
      sendStudentName() {
        this.$emit('atguigu', this.name)
      },
      sendStudentName1() {
          pubsub.publish('hello', this.name)
      }
    },
    beforeDestroy() {
      this.$off('atguigu');
      // this.$off(['atguigu']);  //一次解绑多个事件
      // this.$off()  // 解绑所有自定义事件
    },
    mixins: [mixin, mixin1]
  };
</script>