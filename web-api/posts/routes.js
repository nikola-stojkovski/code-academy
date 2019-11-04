var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/users/:userId/posts', actions.getAllPosts);
routes.get('/users/:userId/posts/:postId', actions.getSpecificPost);
routes.post('/users/:userId/posts', actions.createPost);
routes.get('/users/:userId/user-posts', actions.getPostsForUser)

// routes.put('/:postId', (req, res) => {
//     res.send("Full update for user with id = " + req.params.id);
// });

// routes.patch('/:postId', (req, res) => {
//     res.send("Partial update for user with id = " + req.params.id);
// });

// routes.delete('/:postId', (req, res) => {
//     res.send("Delete user with id = " + req.params.id);
// });

module.exports = routes;