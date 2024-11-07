import React, { Component } from 'react'
import { Outlet, Link } from 'react-router-dom';

import MyNavLink from '../myNavLink';
import { nanoid } from 'nanoid';

export default class News extends Component {

  state = {
    newsList :[
      {
        id: nanoid(),
        content: 'news001'
      },
      {
        id: nanoid(),
        content: 'news002'
      },
      {
        id: nanoid(),
        content: 'news003'
      }
    ]
  }


  render() {
    const { newsList } = this.state;
    return (
        <div className="news">
            <div>这是news组件</div>
            <ul>
                {
                  newsList.map(item => {
                    return <li key={item.id}>
                      { /** 向路由组件传递params参数 */}
                      <Link to={`/home/news/${item.id}?id=${item.id}`}>{item.content}</Link>
                    </li>
                  })
                }
            </ul>
            <Outlet />
        </div>
    )
  }
}
