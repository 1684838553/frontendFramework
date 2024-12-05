import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from '@/renderer/IndexPage';

function RouterConfig({ history }) {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/" component={IndexPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default RouterConfig;
