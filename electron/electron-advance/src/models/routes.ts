// 二级菜单
export const routes = [
  {
    key: '/aboutGit',
    label: '关于Git',
    component: import('@/components/Git/git'),
  },
  {
    key: '/repository',
    label: '仓库',
    component: import('@/components/Git/about'),
  },
];
