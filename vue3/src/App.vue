<template>
  <h3>一个人的信息</h3>
  <h3>姓名: {{ name }}</h3>
  <h3>年龄: {{ age }}</h3>
  <h3>工作种类: {{ job.type }}</h3>
  <h3>工作薪水: {{ job.salary }}</h3>
  <button @click="changeInfo">修改人的信息</button>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  components: {
  },
  setup() {
    let name = ref('张三');
    let age = ref(18);
    let job = ref({
      type: '前端工程师',
      salary: '30k'
    })

    function changeInfo() {
      name.value = '李四';
      age.value = 23;
      job.value.type = 'UI设计师';
    }

    return {
      name,
      age,
      changeInfo,
      job
    }
  }
}
</script>

<style>

</style>
