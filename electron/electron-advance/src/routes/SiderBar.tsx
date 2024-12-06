import React from 'react';
import { Menu } from 'antd';

// import { Route, Switch, NavLink } from 'dva/router';
import { routes } from '@/models/routes';
import '@/routes/routes.less';

export default function SiderBar(): React.ReactElement {
  const toogleRoute = (e: any) => {
    
  };

  return (
    <div className="sider-bar">
      <Menu
        onClick={toogleRoute}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={routes}
      />
    </div>
  );
}
