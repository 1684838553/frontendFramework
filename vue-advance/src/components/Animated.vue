<template>
   <div>
        <div>动画</div>
        <button @click="isShow = !isShow">显示/隐藏</button>
        <transition name="hello" :appear="true">
            <h1 v-show="isShow">你好啊</h1>
        </transition>
        <div>过度</div>
        <button @click="isShow = !isShow">显示/隐藏</button>
        <transition name="hello1" :appear="true">
            <h1 v-show="isShow">你好啊</h1>
        </transition>
        <div>多个元素过度</div>
        <transition-group name="hello1" :appear="true">
            <h1 v-show="isShow" key="1">你好啊</h1>
            <h1 v-show="isShow" key="2">你好啊</h1>
        </transition-group>
        <div>多个元素过度(使用三方库)</div>
        <transition-group
            appear
            name="animate__animated animate__bounce"
            enter-active-class="animate__swing"
            leave-active-class="animate__backOutUp"
        >
        <h1 v-show="isShow" key="1">你好!</h1>
        <h1 v-show="isShow" key="2">Shanghai</h1>
        </transition-group>
   </div>
</template>

<script>
  import 'animate.css'
  export default {
    name: 'Animated',
    data(){
      return {
        isShow: true
      }
    },
    methods:{
    
    }
  };
</script>

<style scoped>
h1 {
    background: orange;
}

/* 动画 */
.hello-enter-active {
    animation: atguigu 1s;
}

.hello-leave-active {
    animation: atguigu 1s reverse;
}

@keyframes atguigu {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

/* 过度 */
 /*进入的起点，离开的终点*/
.hello1-enter,
.hello1-leave-to{
    transform: translateX(-100%);
}
/*进入的过程，离开的过程*/
.hello1-enter-active,
.hello1-leave-active{
    transition: linear .5s;
}
/*进入的终点,离开的起点*/
.hello1-enter-to,
.hello1-leave{
    transform: translateX(0);
}
</style>