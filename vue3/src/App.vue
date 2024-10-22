<template>
  <h3>一个人的信息</h3>
  <h3>姓名: {{ name }}</h3>
  <h3>年龄: {{ age }}</h3>
  <h3>工作种类: {{ job.type }}</h3>
  <h3>工作薪水: {{ job.salary }}</h3>
  <h3>
    爱好：{{ hobby }}
  </h3>
  <button @click="changeInfo">修改人的信息</button>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
  name: 'App',
  components: {
  },
  setup() {
    let name = ref('张三');
    let age = ref(18);
    let job = reactive({
      type: '前端工程师',
      salary: '30k'
    })
    let hobby = reactive(['打篮球', '学习']);

    function changeInfo() {
      name.value = '李四';
      age.value = 23;
      job.type = 'UI设计师';
      job.salary = '50k';
      hobby[2] = '做饭';
    }

    return {
      name,
      age,
      changeInfo,
      job,
      hobby
    }
  }
}
</script>

<style>

</style>
