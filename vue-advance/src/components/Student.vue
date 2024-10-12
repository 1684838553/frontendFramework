<template>
   <div>
      <h1 v-text="msg" ref="title"></h1>
      <button @click="showDom">点我展示dom</button>
      <div @click="showName">学生姓名:{{ name }}</div>
      <div>学生年龄:{{ age }}</div>
      <button @click="sendStudentName">把学生名给App</button>
      <button @click="sendStudentName1">把学生名给School</button>

   </div>
</template>

<script>
  import { mixin, mixin1 } from '../mixin';
  import pubsub from 'pubsub-js';

  export default {
    // eslint-disable-next-line
    name: 'Student',
    data(){
      return {
        name:'panyue',
        age:21,
        msg: "这是学生信息"
      }
    },
    methods: {
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