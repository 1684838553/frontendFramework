import VueRouter from 'vue-router';

import About from '../components/About';
import Home from '../components/Home';


// 创建一个路由
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home
        }
    ]
})