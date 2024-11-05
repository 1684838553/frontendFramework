import React from 'react'
import './banner.css';

export default function Banner() {
    return <div className="col-xs-offset-2 col-xs-8">
        <div className="page-header">React Router Demo</div>
        <button>后退</button>
        <button>前进</button>
        <button>测试go</button>
    </div>
}
