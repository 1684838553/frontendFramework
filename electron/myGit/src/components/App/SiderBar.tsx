import React from 'react';
import { Menu } from 'antd';
import { withRouter, RouteComponentProps } from 'dva/router';
import { routes } from '@/common/routes';

const SiderBar = (props: RouteComponentProps): React.ReactElement => {
  const toogleRoute = (e: any): void => {
    props.history.push(e.key);
  };

  return (
    <div className="sider-bar">
      <Menu style={{ width: 180 }} onClick={toogleRoute} defaultSelectedKeys={['/aboutGit']} items={routes} />
    </div>
  );
};

export default withRouter(SiderBar);
