<template>
  <div class="about">
    About
  </div>
</template>

<script>

export default {
  name: "About",
  data() {
    return {
    };
  },
  // 通过路由规则，进入该组件时被调用
  beforeRouteEnter (to, from, next) {
    next();
  },
  // 通过路由规则，离开该组件时被调用
  beforeRouteLeave (to, from, next) {
    next();
  }
};
</script>

<style scoped>

</style>