import VueRouter from 'vue-router';

import About from '../components/About';
import Home from '../components/Home';
import News from '../components/News';
import Message from '../components/Message';
import Detail from '../components/Detail';

// 创建一个路由
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            // 一级路由
            path: '/home',
            component: Home,
            children: [
                {
                    // 二级路由path前面不加/
                    path: 'news',
                    component: News
                },
                {
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            path: 'detail',
                            component: Detail
                        }
                    ]
                }
            ]
        }
    ]
})