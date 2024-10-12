<template>
   <div>
     <h2>学生姓名:{{ name }}</h2>
     <h2>学生年龄:{{ age }}</h2>
   </div>
</template>

<script>
  export default {
    // eslint-disable-next-line
    name: 'Student',
    data(){
      return {
        name:'panyue',
        age:21
      }
    }
  };
</script>