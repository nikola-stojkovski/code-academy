var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/users', actions.getAllUsers);
routes.get('/users/:id', actions.getSpecificUser);
routes.post('/users', actions.createUser);
routes.put('/users/:id', actions.updateUser);
routes.post('/login', actions.loginUser)
// routes.patch('/:id', (req, res) => {
//     res.send("Partial update for user with id = " + req.params.id);
// });

// routes.delete('/:id', (req, res) => {
//     res.send("Delete user with id = " + req.params.id);
// });

module.exports = routes;