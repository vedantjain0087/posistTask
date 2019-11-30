const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const Post = require('../controllers/Post.controller.js');

    app.post('/createpost', Post.create);// Create a new Post  

    function validateUser(req, res, next) {
        jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
            if (err) {
                res.json({
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