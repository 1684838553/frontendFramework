<template>
   <div class="demo">
     <h2>学校名称:{{ name }}</h2>
     <h2>学校地址:{{ address }}</h2>
     <button @click="showName">点我提示学校名</button>
   </div>
</template>

<script>
  export default {
    // eslint-disable-next-line
    name: 'School',
    data(){
      return {
        name:'武汉科技大学',
        address: '武汉'
      }
    },
    methods:{
      showName(){
        alert(this.name);
      }
    }
  };
</script>