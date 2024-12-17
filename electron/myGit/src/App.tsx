import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'dva';
import { Button } from 'antd';
import 'antd/dist/antd.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button type='primary'>Text</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default hot(module)(connect()(App));
