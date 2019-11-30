const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const Channel = require('../controllers/Channel.controller.js');

    app.post('/createchannel', Channel.create);// Create a new Login
    
    app.post('/joinchannel', Channel.join);// Join a channel
  

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