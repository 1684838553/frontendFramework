const express = require('express');
// const cors = require('cors');
const app1 = express();

// 允许跨域
// app.use(cors());

app1.use((req, res, next) => {
    console.log('有人请求服务器server1了');
    console.log('请求资源是', req.url);
    console.log('请求来自于', req.get('Host'));
})

app1.get('/school', async (req, res) => {
    const data = {
        "schoolName": "哈尔滨工业大学",
        "address": "哈尔滨"
    }
    res.status(200).send(data)
})

app1.listen(6000, () => {
    console.log('Server running at http://localhost:6000/, 可以通过访问http://localhost:6000/school接口获取学校信息')
})