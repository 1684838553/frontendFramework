import React from 'react';
import { Menu } from 'antd';
import { withRouter, RouteComponentProps } from 'dva/router';
import { routes } from '@/models/routes';
import '@/routes/routes.less';

const SiderBar = (props: RouteComponentProps): React.ReactElement => {
  const toogleRoute = (e: any): void => {
    props.history.push(e.key);
  };

  return (
    <div className="sider-bar">
      <Menu onClick={toogleRoute} defaultSelectedKeys={['/aboutGit']} items={routes} />
    </div>
  );
};

export default withRouter(SiderBar);
