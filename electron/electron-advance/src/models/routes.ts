// 二级菜单
export const routes = [
    {
        path: '/aboutGit',
        label: '关于Git',
        component: import('@/components/Git/git')
    },
    {
        path: '/repository',
        label: '仓库',
        component: import('@/components/Git/about')
    }
]