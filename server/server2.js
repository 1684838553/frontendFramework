const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/static'));


app.get('/students', async (req, res) => {
    res.send({
        name: 'tom',
        age: 18
    })
})

app.listen(5005, () => {
    console.log('Server running at http://localhost5005')
})