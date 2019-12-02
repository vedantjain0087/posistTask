const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const User = require('../controllers/User.controller.js');

    // Create a new Login
    app.post('/Register', User.create);
    app.post('/Login', User.authenticate);
    app.get('/trendingregion',validateUser, User.trendingRegion);

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

