import { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Comment from './components/comment';
import Home from './components/home';
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
        {/* <Banner /> */}
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            { /** 在react中，靠编写路由链接实现切换组件 --- 编写路由链接 */}
            <Link className="list-group-item" active-class="active" to="/home">Home</Link>
            <Link className="list-group-item" active-class="active" to="/comment">comment</Link>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              { /** 路由注册 */}
              <Routes>
                { /** exact 精确匹配 */}
                <Route path="/" element={<Home />} exact />
                <Route path="/home" element={<Home />} exact />
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
