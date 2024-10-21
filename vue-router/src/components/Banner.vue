<template>
  <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">Vue Router Demo</div>
        <button @click="back">后退</button>
        <button @click="forward">前进</button>
        <button @click="go">测试go</button>
    </div>
</template>

<script>

export default {
  name: "Banner",
  data() {
    return {
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    },
    go() {
      this.$router.go(3);
    }
  },
};
</script>

<style scoped>
.col-xs-8 {
    border-bottom: 1px solid #ededed;
    padding-bottom: 12px;
    margin-bottom: 12px;
}
.page-header {
    font-size: 20px;
    line-height: 80px;
    font-weight: 500;
}

button {
  margin-left: 12px;
}
</style>