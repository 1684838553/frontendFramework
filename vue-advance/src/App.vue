<template>
   <div>
     <School name="武汉科技大学" :time="99" />
     <Student />
   </div>
</template>

<script>
import School from './components/School';
import Student from "./components/Student";

export default {
  name: "App",
  //汇总所有的组件
  components:{
    Student,
    School
  }
}
</script>
