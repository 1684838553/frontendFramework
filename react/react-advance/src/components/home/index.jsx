import React, { Component } from 'react'
import { Outlet } from 'react-router-dom';

import MyNavLink from '../myNavLink';
import './home.css';

export default class Home extends Component {
  render() {
    return <div className="home">
      <h2>Home组件内容</h2>
      <ul className='nav nav-tabs'>
        <li>
          <MyNavLink to="/home/news">News</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/home/message">Message</MyNavLink>
        </li>
      </ul>
      { /** 如果应用的路由与嵌套 Route 的路径匹配，Outlet 组件就会渲染 Route 的元素 */}
      <Outlet />
    </div>
  }
}
