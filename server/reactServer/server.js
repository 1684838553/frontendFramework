const express = require('express');
const cors = require('cors');
const app = express();

const { getCommentList, getUser, updateCommentList } = require('./db');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/user', async (req, res) => {
    try {
        const data = await getUser();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.get('/commentList', async (req, res) => {
    try {
        const data = await getCommentList();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post("/updateCommentList", async (req, res) => {
    try {
        const comment = req.body;
        const list = await getCommentList();
        list.push(comment);
        await updateCommentList(list);
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.delete("/deleteComemnt/:id", async (req, res) => {
    try {
        const list = await getCommentList();
        const index = list.findIndex(item => item.id === req.params.id)
        if (index === -1) {
            return res.status(404).json({ error: '数据不存在' });
        }
        list.splice(index, 1);
        await updateCommentList(list);
        res.status(204).json({ message: '删除成功' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.listen(5005, () => {
    console.log('Server running at http://localhost:5005/')
})