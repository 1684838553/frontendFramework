<template>
   <div>
      <h1 v-text="msg" ref="title"></h1>
      <button @click="showDom">点我展示dom</button>
      <div>学生姓名:{{ name }}</div>
      <div>学生年龄:{{ age }}</div>
   </div>
</template>

<script>
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
      }
    },
  };
</script>