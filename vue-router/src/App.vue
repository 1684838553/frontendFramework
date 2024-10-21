<template>
  <div>
    <div>
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">Vue Router Demo</div>
      </div>
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


export default {
  name: "App",
  components: {
   
  }
};
</script>

<style>
  .col-xs-8 {
    height: 80px;
    border-bottom: 1px solid #ededed;
    margin-bottom: 12px;
  }
  .page-header {
    font-size: 20px;
    line-height: 80px;
    font-weight: 500;
  }

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
