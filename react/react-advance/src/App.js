import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Comment from './components/comment';
import Home from './components/home';
import Banner from './components/banner';
import MyNavLink from './components/myNavLink';
import Message from './components/message';
import News from './components/news';
import Detail from './components/detail';
import { URL } from './config';

function App() {

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    try {
      const { status, data } = await axios.get(`${URL}/user`);
      if (status === 200) {
        window.localStorage.setItem('user', JSON.stringify(data))
      }
    } catch { }
  }

  return (
    <div>
      <div>
        { /** 一般组件 */}
        <Banner />
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            { /** 在react中，靠编写路由链接实现切换组件 --- 编写路由链接 */}
            { /** NavLink 实现active高亮效果 */}
            <MyNavLink to="/home">Home</MyNavLink>
            <MyNavLink to="/comment">Comment</MyNavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              { /** 路由注册 */}
              <Routes>
                { /** exact 精确匹配 */}
                { /** 路由组件：会收到路由器传到props的三个路由信息 Navigate代替重定向 */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                { /** /home 后面有子路由，应该在路径后面加*，不能开启精确匹配 */}
                <Route path="/home/*" element={<Home />} > 
                  <Route path="" element={<Navigate to="/home/news" replace />} />
                  <Route path="news" element={<News />}>
                      <Route path=":id" element={<Detail />} />
                  </Route>
                  <Route path="message" element={<Message />} >
                  </Route>
                </Route>
                <Route path="/comment" element={<Comment />} exact />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
