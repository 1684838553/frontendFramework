<template>
  <h3>一个人的信息</h3>
  <h3>姓名: {{ person.name }}</h3>
  <h3>年龄: {{ person.age }}</h3>
  <h3>工作种类: {{ person.job.type }}</h3>
  <h3>工作薪水: {{ person.job.salary }}</h3>
  <h3>性别: {{ person.sex }}</h3>
  <h3>
    爱好：{{ person.hobbies }}
  </h3>
  <button @click="changeInfo">修改人的信息</button>
  <button @click="addSex">添加sex属性</button>
  <button @click="deleteName">删除name属性</button>
</template>

<script>
import { reactive } from 'vue';
export default {
  name: 'App',
  components: {
  },
  setup() {
    const person = reactive({
      name: '张三',
      age: 18,
      job: {
        type: '前端工程师',
        salary: '30k'
      },
      hobbies: ['打篮球', '学习']
    })

    function addSex() {
      person.sex = '男';
    }

    function deleteName() {
      delete person.name;
    }

    function changeInfo() {
      person.name = '李四';
      person.age = 23;
      person.job.type = 'UI设计师';
      person.job.salary = '50k';
      person.hobbies[2] = '做饭';
    }

    return {
      person,
      changeInfo,
      addSex,
      deleteName
    }
  }
}
</script>

<style>

</style>
