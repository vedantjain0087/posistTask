const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const Channel = require('../controllers/Channel.controller.js');

    app.post('/createchannel', Channel.create);// Create a new Login
    
    app.post('/joinchannel', Channel.join);// Join a channel

    app.post('/mychannels', Channel.myChannels);// Fetch your channels

    app.post('/channel', Channel.channel);// Info about a channel

    app.post('/members', Channel.members);// Fetch members

    app.post('/availablechannels', Channel.available);// Available Channels to join




  

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