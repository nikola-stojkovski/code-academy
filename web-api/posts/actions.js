const con = require('../database');

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

module.exports = {
    getAllPosts,
    getSpecificPost,
    createPost
}