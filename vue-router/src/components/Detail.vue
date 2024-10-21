<template>
  <div class="detail">
    <div>这是消息{{$route.params.id}},即将展示消息详情</div>
    <div>详细详情：{{$route.query.title}}</div>
  </div>
</template>

<script>

export default {
  name: "Detail"
};
</script>

<style scoped>

</style>