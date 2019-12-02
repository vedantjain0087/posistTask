const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const Channel = require('../controllers/Channel.controller.js');

    app.post('/createchannel',validateUser, Channel.create);// Create a new Login
    
    app.post('/joinchannel',validateUser, Channel.join);// Join a channel

    app.post('/mychannels',validateUser, Channel.myChannels);// Fetch your channels

    app.post('/channel',validateUser, Channel.channel);// Info about a channel

    app.post('/members',validateUser, Channel.members);// Fetch members

    app.post('/availablechannels',validateUser, Channel.available);// Available Channels to join

    app.get('/trendingchannels',validateUser, Channel.trendingChannels);// Trending Channels



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