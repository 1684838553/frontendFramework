// 引入的不再是Vue构造函数，是名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象 app（类似于vue2的vm，但比vm更轻）
const app = createApp(App)
app.mount('#app')
