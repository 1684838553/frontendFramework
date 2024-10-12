<template>
   <div class="demo">
     <div @click="showName">学校名称:{{ name }}</div>
     <div>学校地址:{{ address }}</div>
     <div>建校{{ time }}年</div>
     <button @click="showName">点我提示学校名</button>
      <button @click="sendSchoolName">把学校名给App</button>
   </div>
</template>

<script>
  import { mixin, mixin1 } from '../mixin';
  export default {
    // eslint-disable-next-line
    name: 'School',
    // props: ['name', 'address', 'time'],
    props: {
      name: {
        type: String,
        require: true
      },
       address: {
        type: String,
        require: false,
        default: '武汉'
      },
      time: {
        type: Number,
        require: true
      },
      getSchoolName: {
        require: true
      }
    },
    data(){
      return {
        
      }
    },
    methods:{
      showName(){
        console.log(this.name);
      },
      sendSchoolName() {
        this.getSchoolName(this.name)
      }
    },
    mixins: [mixin, mixin1]
  };
</script>