<template>
  <div class="news">
    <ul>
        <div :style="{ opacity }">这是news组件</div>
        <li>news001 <input type="text" /></li>
        <li>news002 <input type="text" /></li>
        <li>news003 <input type="text" /></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "News",
  data() {
    return {
        opacity: 1
    };
  },
  mounted() {
    this.timer = setInterval(() => {
        console.log('@')
        this.opacity -= 0.1;
        if(this.opacity <= 0) this.opacity = 1
    }, 1000)
  },
  activated() {
    console.log('news被激活')
  },
  deactivated() {
    console.log('news失活')
    clearInterval(this.timer)
  },
};
</script>

<style scoped>

</style>