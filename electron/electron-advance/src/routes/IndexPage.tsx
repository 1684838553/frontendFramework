import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'dva/router';
import Git from '@/components/Git/git';
import About from '@/components/Git/about';
import SiderBar from '@/routes/SiderBar';

import 'antd/dist/antd.css';
import '@/routes/routes.less';
import { connect } from 'dva';

const App: React.FC = (): React.ReactElement => (
  <div className="index-page">
    <div className="index-page-sider">
      <SiderBar />
    </div>
    <div className="index-page-main">
      <Switch>
        <Route path="/aboutGit" component={Git} />
        <Route path="/repository" component={About} />
      </Switch>
    </div>
  </div>
);

export default hot(module)(connect()(App));
