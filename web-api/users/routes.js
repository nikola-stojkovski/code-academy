var express = require('express');
const fs = require('fs');
const path = require('path');

var routes = express.Router();

routes.get('/', (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    res.status(200).send(users);    
});

module.exports = routes;