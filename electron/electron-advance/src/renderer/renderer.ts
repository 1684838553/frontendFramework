import dva from 'dva';
import { createHashHistory } from 'history';
import createLoading from 'dva-loading';

const app = dva({ history: createHashHistory() });

app.use(createLoading());
app.model(require('../models/global').default);
app.model(require('../models/aboutGit').default);
app.router(require('./router').default);

app.start('#app');
