<template>
  <Location v-if="isShow" />
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
  <hr>
  <Student school="尚硅谷" address="上海" @hello="showHelloMsg" v-if="isShow">
    <span>尚硅谷</span>
  </Student>
  <button @click="isShow = !isShow">挂载/卸载组件</button>
</template>

<script>
import Student from './components/Student';
import Location from './components/Location';
import { reactive, ref } from 'vue';

export default {
  name: 'App',
  components: {
    Student,
    Location
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
    const isShow = ref(true);

    function addSex() {
      person.sex = '男';
    }

    function deleteName() {
      delete person.name;
    }

    function showHelloMsg(value) {
      console.log(`你好，你触发了hello事件，我收到的参数是: ${value}`);
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
      deleteName,
      showHelloMsg,
      isShow
    }
  }
}
</script>

<style></style>
