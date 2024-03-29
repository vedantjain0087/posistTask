const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const Post = require('../controllers/Post.controller.js');

    app.post('/createpost',validateUser, Post.create);// Create a new Post  
    app.post('/retrieveposts',validateUser, Post.retrieve);// Create a new Post
    app.get('/activeusers',validateUser, Post.activeUsers);// Show Active Users  

    function validateUser(req, res, next) {
        jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
            if (err) {
                res.status(400).json({
                    status: "error",
                    message: err.message,
                    data: null
                });
            } else {
                // add user id to request
                req.body.token = decoded.id;
                next();
            }
        });
    }
}