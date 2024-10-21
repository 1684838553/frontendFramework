<template>
  <div class="detail">
    <!-- <div>这是消息{{$route.params.id}},即将展示消息详情</div> -->
    <div>这是消息{{id}},即将展示消息详情</div>
    <!-- <div>详细详情：{{$route.query.title}}</div> -->
    <div>详细详情：{{title}}</div>

    <!-- <div>a: {{a}}</div>
    <div>b: {{b}}</div> -->
  </div>
</template>

<script>

export default {
  name: "Detail",
  // props: ['a', 'b']
  props: ['id', 'title'],
  mounted() {
    console.log(this.$router)
  },
};
</script>

<style scoped>

</style>