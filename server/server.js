const express = require('express');
// const cors = require('cors');
const app = express();

const { getStudents } = require('./db');

app.use(express.json());
app.use(express.urlencoded());

// // 允许跨域
// app.use(cors());

app.get('/students', async (req, res) => {
    console.log('发送了请求 /students')
    try {
        const data = await getStudents();
        res.status(200).json(data.data);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
})

app.listen(5000, () => {
    console.log('Server running at http://localhost:5000, 可以通过访问http://localhost:5000/students接口获取学生数据')
})