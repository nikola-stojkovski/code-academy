var express = require('express');
require('dotenv/config');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/users', (req, res) => {
    res.status(200).send("Get All users");
});

app.get('/users/:id', (req, res) => {
    res.status(200).send("Get user with id = " + req.params.id);
});

app.post('/users', (req, res) => {
    res.send("Create user");
});

app.put('/users/:id', (req, res) => {
    res.send("Full update for user with id = " + req.params.id);
});

app.patch('/users/:id', (req, res) => {
    res.send("Partial update for user with id = " + req.params.id);
});

app.delete('/users/:id', (req, res) => {
    res.send("Delete user with id = " + req.params.id);
});

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});