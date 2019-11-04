const { emailValidator } = require('../helper');
const con = require('../database');
const bcrypt = require('bcryptjs');

getAllUsersQuery = () => {
    const query = "SELECT * FROM user";
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
        res.status(500).send(error);
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


createUserQuery = (user, pass) => {
    const query = 'INSERT INTO user(Name, Surname, Email, Age, IsActive, Password) VALUES (?, ?, ?, ?, ?, ?);';
    return new Promise((resolve, reject) => {
        con.query(query, [user.Name, user.Surname, user.Email, user.Age, user.IsActive, pass], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

createUser = async(req, res, next) => {
    let isValid = emailValidator(req.body.Email);
    if (!isValid) {
        var error = new Error("Email is not valid!");
        error.status = 401;
        next(error);
    }
    else {
        try {
            const userRequest = req.body;
            const passHash = bcrypt.hashSync(userRequest.Password, 10);
            await createUserQuery(userRequest, passHash);
            res.status(201).send("User has been created!");
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
};

updateUserQuery = (id, user) => {
    const query = 'UPDATE user SET Name = ?, Surname = ?, Email = ?, Age = ?, IsActive = ? WHERE id = ?';
    const list = [user.Name, user.Surname, user.Email, user.Age, user.IsActive, id];

    return new Promise((resolve, reject) => {
        con.query(query, list, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results)
                if(results.affectedRows == 0) {
                    reject("Nema user so takvo id")
                }
                resolve(results);
            }
          });
    });
};

updateUser = async(req, res) => {
    const userRequest = req.body;
    const userId = req.params.id
    try {
        const user = await updateUserQuery(userId, userRequest);
        res.status(201).send("User has been updated!");
    } catch (error) {
        res.status(500).send(error)
    }
};

getUserByEmailQuery = (email) => {
    const query = "SELECT * FROM user WHERE email = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [email], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                //console.log(results);
                resolve(results);
            }
          });
    });
};

loginUser = async(req, res) => {
    const email = req.body.Email;
    const pass = req.body.Password;

    //console.log(email)
    try {
        var user = await getUserByEmailQuery(email);
        var dbUser = user[0];
        const matchPass = bcrypt.compareSync(pass, dbUser.Password);
        if (matchPass) {
            res.status(200).send("Password match");        }
        else {
            res.status(401).send("Wrong password");
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllUsers,
    getSpecificUser,
    createUser,
    updateUser,
    loginUser
}