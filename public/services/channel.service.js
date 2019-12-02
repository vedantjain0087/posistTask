app.service("ChannelService", function ($http, $q) {

    this.myChannels = function (obj) {
        let pr = $q.defer();
        var url = "/mychannels";
        $http.post(url, obj, {
            headers: {
                "x-access-token": localStorage.getItem('user-token')
            }
        }).then(function (data) {
            pr.resolve(data);
        }, function (err) {
            pr.reject(err);
        });
        return pr.promise;
    }

    this.retrieveChannel = function (obj) {
        let pr = $q.defer();
        var url = "/channel";
        $http.post(url, obj, {
            headers: {
                "x-access-token": localStorage.getItem('user-token')
            }
        }).then(function (data) {
            pr.resolve(data);
        }, function (err) {
            pr.reject(err);
        });
        return pr.promise;
    }

    this.createPost = function (obj) {
        let pr = $q.defer();
        var url = "/createpost";
        $http.post(url, obj, {
            headers: {
                "x-access-token": localStorage.getItem('user-token')
            }
        }).then(function (data) {
            pr.resolve(data);
        }, function (err) {
            pr.reject(err);
        });
        return pr.promise;
    }

    this.retrievePosts = function (obj) {
        let pr = $q.defer();
        var url = "/retrieveposts";
        $http.post(url, obj, {
            headers: {
                "x-access-token": localStorage.getItem('user-token')
            }
        }).then(function (data) {
            pr.resolve(data);
        }, function (err) {
            pr.reject(err);
        });
        return pr.promise;
    }

    this.members = function (obj) {
        let pr = $q.defer();
        var url = "/members";
        $http.post(url, obj, {
            headers: {
                "x-access-token": localStorage.getItem('user-token')
            }
        }).then(function (data) {
            pr.resolve(data);
        }, function (err) {
            pr.reject(err);
        });
        return pr.promise;
    }

    this.createChannel = function (obj) {
        let pr = $q.defer();
        var url = "/createchannel";
        $http.post(url, obj, {
            headers: {
                "x-access-token": localStorage.getItem('user-token')
            }
        }).then(function (data) {
            pr.resolve(data);
        }, function (err) {
            pr.reject(err);
        });
        return pr.promise;
    }
    this.availableChannels = function (obj) {
        let pr = $q.defer();
        var url = "/availablechannels";
        $http.post(url, obj, {
            headers: {
                "x-access-token": localStorage.getItem('user-token')
            }
        }).then(function (data) {
            pr.resolve(data);
        }, function (err) {
            pr.reject(err);
        });
        return pr.promise;
    }
    this.join = function (obj) {
        let pr = $q.defer();
        var url = "/joinchannel";
        $http.post(url, obj, {
            headers: {
                "x-access-token": localStorage.getItem('user-token')
            }
        }).then(function (data) {
            pr.resolve(data);
        }, function (err) {
            pr.reject(err);
        });
        return pr.promise;
    }

    this.trendingChannels = function () {
        var pr = $q.defer();
        $http.get('/trendingchannels', {
                headers: {
                    "x-access-token": localStorage.getItem('user-token')
                }
            })
            .then(function (data) {
                pr.resolve(data);
            }, function (err) {
                pr.reject(err);
            }).catch(function (err) {
                console.log("ERROR");
            });
        return pr.promise;
    }

    this.activeUsers = function () {
        var pr = $q.defer();
        $http.get('/activeusers', {
                headers: {
                    "x-access-token": localStorage.getItem('user-token')
                }
            })
            .then(function (data) {
                pr.resolve(data);
            }, function (err) {
                pr.reject(err);
            }).catch(function (err) {
                console.log("ERROR");
            });
        return pr.promise;
    }
    this.trendingTags = function () {
        var pr = $q.defer();
        $http.get('/trendingtags', {
                headers: {
                    "x-access-token": localStorage.getItem('user-token')
                }
            })
            .then(function (data) {
                pr.resolve(data);
            }, function (err) {
                pr.reject(err);
            }).catch(function (err) {
                console.log("ERROR");
            });
        return pr.promise;
    }
});