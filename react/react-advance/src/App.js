import { useEffect } from 'react';
import axios from 'axios';

import Comment from './components/comment';
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
      <Comment />
    </div>
  );
}

export default App;
