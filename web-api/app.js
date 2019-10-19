var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const users = require('./users/routes');
require('dotenv/config');

const app = express();

app.use((req, res, next) => {
    console.log(`Logged ${req.url} - ${req.method} --- ${new Date()}`);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', users);

app.get('/read', (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'data.json'));
    let student = JSON.parse(rawdata);
    res.status(200).send(student);
});

app.get('/write', (req, res) => {
    let newStudent = { 
        name: 'Mike',
        age: 23, 
        gender: 'Male',
        department: 'English',
        car: 'Honda' 
    };

    let data = JSON.stringify(newStudent);
    fs.writeFileSync(path.join(__dirname, 'data.json'), data);
    res.status(201).send(newStudent);
});

app.get('/users/:id', (req, res, next) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);

    if (req.params.id == 0) {
        var error = new Error("Id can not be 0!");
        error.status = 401;
        next(error);
    }
    let currentUser = users.filter((x) => {
        return x.id == req.params.id;
    });

    res.status(200).send(currentUser[0]);
});

app.post('/users', (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);

    users.push(req.body);

    let data = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, 'users.json'), data);

    res.status(201).send("User has been created!");
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

// // user.id = updUser.id ? updUser.id : user.id;

// // if (updUser.id) {
// //     user.id = updUser.id
// // }

app.use((req, res, next) => {
    var error = new Error("Not found. Please try with another route!");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    var errorObj = {
        status: err.status,
        error: {
            message: err.message
        }
    };

    res.status(err.status).json(errorObj);
});

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});