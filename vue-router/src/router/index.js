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
                            name: 'messageDetail',
                            path: 'detail/:id',
                            component: Detail,
                            // props第一种写法，值为对象，里面所有的数据都传给Detail组件（这么些传的是死数据）
                            // props: {
                            //     a: 1,
                            //     b: 'hello'
                            // },

                            // props第二种写法， 值为布尔值，将params参数作为props传入
                            // props: true

                            // props第二种写法，函数写法
                            props($route) {
                                return {
                                    ...$route.params,
                                    ...$route.query
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
})