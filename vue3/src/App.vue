<template>
  <h3>一个人的信息</h3>
  <h3>姓名: {{ name }}</h3>
  <h3>年龄: {{ age }}</h3>
  <button @click="changeInfo">修改人的信息</button>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  setup() {
    let name = '张三';
    let age = 18;

    function changeInfo() {
      console.log('changeInfo')
    }

    return {
      name,
      age,
      changeInfo
    }
  }
}
</script>

<style>

</style>
