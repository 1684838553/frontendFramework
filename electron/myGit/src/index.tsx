import dva from 'dva';
import { createHashHistory } from 'history';
import createLoading from 'dva-loading';
import { RouterConfig } from './router';
import { global } from '@/models/global';

const app = dva({ history: createHashHistory() });
app.use(createLoading());
app.model(global);
app.router(RouterConfig);
app.start('#root');