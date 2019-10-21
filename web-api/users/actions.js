const fs = require('fs');
const path = require('path');
const { emailValidator } = require('../helper');

getAllUsers = (req, res) => {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);
    res.status(200).send(users);  
};

getSpecificUser = (req, res, next) => {
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
};

createUser = (req, res, next) => {
    let isValid = emailValidator(req.body.email);
    if (!isValid) {
        var error = new Error("Email is not valid!");
        error.status = 401;
        next(error);
    }
    else {
    let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    let users = JSON.parse(rawdata);


    users.push(req.body);

    let data = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, 'users.json'), data);

    res.status(201).send("User has been created!");
    }
};

module.exports = {
    getAllUsers,
    getSpecificUser,
    createUser
}