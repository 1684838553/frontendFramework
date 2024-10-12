import Vue from 'vue'
// 所有组件的父组件
import App from './App.vue'

// 关闭生产提示
Vue.config.productionTip = false

new Vue({
  // 将App放入容器中
  render: h => h(App),
}).$mount('#app')
