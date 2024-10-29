<template>
  <div>
    <div>
      <!-- 一般组件，About和Home组件是路由组件 -->
      <Banner />
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
         <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
         <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!-- 逻辑和插槽类似 -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Banner from './components/Banner';

export default {
  name: "App",
  components: {
    Banner
  }
};
</script>

<style scoped>
  .row {
    display: flex;
  }

  .col-xs-2 {
    width: 80px;
    border: 1px solid #ededed;
    border-radius: 3px;
  }

  .list-group-item {
    display: inline-block;
    width: 100%;
    text-decoration: none;
    color: #333;
    height: 38px;
    line-height: 38px;
    text-align: center;
  }

  .panel-body {
    margin-left: 20px;
  }

  .list-group-item:not(:first-child) {
    border-top: 1px solid #ededed;
  }

  .list-group-item.active {
    background: #2B76B9;
    color: #fff;
  }
</style>
