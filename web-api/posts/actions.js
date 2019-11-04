const con = require('../database');
const { User, Post } = require('../models');

getAllPostsQuery = () => {
    const query = 'SELECT * FROM post';
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

getAllPosts = async(req, res) => {
    try {
        const posts = await getAllPostsQuery();
        res.status(200).send(posts);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificPostQuery = (postId) => {
    const query = 'SELECT * FROM post WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [postId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getSpecificPost = async(req, res, next) => {
    const postId = req.params.id;

    if (postId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }
    
    try {
        const post = await getSpecificPostQuery(postId);
        res.status(200).send(post[0]);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createPostQuery = (userId, post) => {
    console.log(userId)
    const query = 'INSERT INTO post(Text, Likes, CreatedOn, UserId) VALUES (?, ?, NOW(), ?)';
    return new Promise((resolve, reject) => {
        con.query(query, [post.Text, post.Likes, userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

createPost = async(req, res) => {
    const post = req.body;
    const userId = req.params.userId
    try {
        const result = await createPostQuery(userId, post);
        res.status(201).send(result);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getPostsForUserQuery = (userId) => {
    console.log(userId)
    const query = 'SELECT u.Name, u.Surname, u.Email, u.Age, p.Text, p.Likes, p.CreatedOn FROM user as u JOIN post as p ON u.Id = p.UserId WHERE u.Id = ?';
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

getPostsForUser = async(req, res) => {
    const userId = req.params.userId;
    try {
        const result = await getPostsForUserQuery(userId);
        const dbUser = result[0];
        let user = new User(dbUser.Name, dbUser.Surname, dbUser.Email, dbUser.Age, dbUser.IsActive, []);
        let posts = result.map(x => {
            return new Post(x.Text, x.Likes, x.CreatedOn);
        });
        user.posts = posts;
        res.status(201).send(user);  
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getAllPosts,
    getSpecificPost,
    createPost,
    getPostsForUser
}