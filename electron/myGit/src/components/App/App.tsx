import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'dva';
import { Route, Switch, Redirect } from 'dva/router';
import { routes } from '@/common/routes';
import SiderBar from '@/components/App/SiderBar';
import '@/components/App/index.scss';
import 'antd/dist/antd.min.css';

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
