import dva from 'dva';
import { createHashHistory } from 'history';
import createLoading from 'dva-loading';
import { RouterConfig } from './router';
import { global } from '@/models/global';
import { aboutGit } from '@/models/aboutGit';

const app = dva({ history: createHashHistory() });
app.use(createLoading());
app.model(global);
app.model(aboutGit);
app.router(RouterConfig);
app.start('#root');