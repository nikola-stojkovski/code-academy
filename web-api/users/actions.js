const fs = require('fs');
const path = require('path');
const { emailValidator } = require('../helper');
const con = require('../database');

getAllUsersQuery = () => {
    const query = 'SELECT * FROM user';
    return new Promise((resolve, reject) => {
        con.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getAllUsers = async(req, res) => {
    try {
        const users = await getAllUsersQuery();
        res.status(200).send(users);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificUserQuery = (userId) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getSpecificUser = async(req, res, next) => {
    const userId = req.params.id;

    if (userId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }
    
    try {
        const user = await getSpecificUserQuery(userId);
        res.status(200).send(user[0]);  
    } catch (error) {
        res.status(500).send(error.message);
    }
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