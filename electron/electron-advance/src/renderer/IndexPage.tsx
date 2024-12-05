import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, NavLink } from 'dva/router';
import { Button } from 'antd';
import Git from '@/components/Git/git';
import About from '@/components/Git/about';
import '@/renderer/IndexPage.less';

const App: React.FC = (): React.ReactElement => (
  <div className="app">
    <div className="app-sider">
      <NavLink to="/aboutGit">关于Git</NavLink>
      <NavLink to="/repository">仓库</NavLink>
      <Button type="primary">Text</Button>
    </div>
    <div className="app-main">
      <Switch>
        <Route path="/aboutGit" component={Git} />
        <Route path="/repository" component={About} />
      </Switch>
    </div>
  </div>
);

export default hot(module)(App);
