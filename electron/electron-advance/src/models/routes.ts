import AboutGit from '@/components/Git/aboutGit';
import About from '@/components/Git/about';

export const routes = [
  {
    key: '/aboutGit',
    label: '关于Git',
    component: AboutGit,
  },
  {
    key: '/repository',
    label: '仓库',
    component: About,
  },
];
