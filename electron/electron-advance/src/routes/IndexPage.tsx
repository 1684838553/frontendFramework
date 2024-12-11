import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';
import SiderBar from '@/routes/SiderBar';
import { routes } from '@/models/routes';

import 'antd/dist/antd.css';
import '@/routes/routes.less';

const App: React.FC = (): React.ReactElement => (
  <div className="index-page">
    <div className="index-page-sider">
      <SiderBar />
    </div>
    <div className="index-page-main">
      <Switch>
        {routes.map(item => {
          return <Route path={item.key} key={item.key} component={item.component} />;
        })}
        <Redirect from="/" to="/aboutGit" />
      </Switch>
    </div>
  </div>
);

export default hot(module)(connect()(App));
