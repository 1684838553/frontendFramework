import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from './components/App/App';

export function RouterConfig({ history }: any) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
}