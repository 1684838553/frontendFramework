import AboutGit from '@/components/Git/aboutGit';
import Repository from '@/components/Git/repository';

export const routes = [
  {
    key: '/aboutGit',
    label: '关于Git',
    component: AboutGit,
  },
  {
    key: '/repository',
    label: '仓库',
    component: Repository,
  },
];
