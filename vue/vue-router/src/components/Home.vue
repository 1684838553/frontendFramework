<template>
  <div class="home">
    <h2>Home组件内容</h2>
      <div class="nav nav-tabs">
        <router-link
          class="list-group-item"
          active-class="active"
          to="/home/message"
          >Message</router-link
        >
        <router-link
          class="list-group-item"
          active-class="active"
          to="/home/news"
          >News</router-link
        >
      </div>
      <!-- include设置组件名 -->
      <keep-alive include="News">
            <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.list-group-item {
  display: inline-block;
  width: 100%;
  text-decoration: none;
  color: #333;
  height: 38px;
  line-height: 38px;
  text-align: center;
}

.list-group-item.active {
  background: #2b76b9;
  border-radius: 3px;
  color: #fff;
}

.nav-tabs {
  display: flex;
  border-bottom: 1px solid #ededed;
  margin-bottom: 12px;
}
</style>