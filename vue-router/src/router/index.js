import VueRouter from 'vue-router';

import About from '../components/About';
import Home from '../components/Home';
import News from '../components/News';
import Message from '../components/Message';
import Detail from '../components/Detail';

// 创建一个路由
const router = new VueRouter({
    routes: [
        {
            name: "About",
            path: '/about',
            component: About,
            meta: { title: '关于' }
        },
        {
            // 一级路由
            name: "HomePage",
            path: '/home',
            component: Home,
            meta: { title: '主页' },
            children: [
                {
                    name: "News",
                    // 二级路由path前面不加/
                    path: 'news',
                    component: News,
                    // meta: 路由元信息
                    meta: { isAuth: true, title: '新闻' },
                    // 独享路由守卫
                    beforeEnter: (to, from, next) => {
                        console.log('路由独享守卫', to, from, next);
                        if (sessionStorage.getItem('school') === 'atguigu') {
                            next();
                        } else {
                            console.log('学校名不对，无权限查看')
                        }
                    }
                },
                {
                    name: "Message",
                    path: 'message',
                    component: Message,
                    meta: { isAuth: true, title: '消息' },
                    children: [
                        {
                            name: 'messageDetail',
                            path: 'detail/:id',
                            meta: { title: '消息详情' },
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

// 全局前置路由守卫（每次路由切换之前或初始化时调用）
router.beforeEach((to, from, next) => {
    console.log('前置路由守卫', to, from, next);
    // if(['News', 'Message'].includes(to.name)) {
    if (to.meta.isAuth) {
        if (sessionStorage.getItem('school') === 'atguigu') {
            // document.title = to.meta.title;
            next();
        } else {
            console.log('学校名不对，无权限查看')
        }
    } else {
        // document.title = to.meta.title;
        next();
    }
})

// 全局后置路由守卫（每次路由切换之前或初始化时调用）
router.afterEach((to, from) => {
    console.log('后置路由守卫', to, from);
    // 放在前置路由守卫里面，要多次调用
    document.title = to.meta.title || 'Vue';
})

export default router