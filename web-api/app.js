var express = require('express');
require('dotenv/config');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/nikola/:number', (req, res) => {
    var id = req.params.number;
    console.log(id);
    res.send(id);
});

app.post('/users', (req, res) => {
    res.send(req.body);
});

var port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});