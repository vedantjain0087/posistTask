app.service("AuthService", function ($http, $q) {

    this.register = function (obj) {
        let pr = $q.defer();
        var url = "/register";
        $http.post(url, obj).then(function (data) {
            pr.resolve(data);
        }, function (err) {
            pr.reject(err);
        });
        return pr.promise;
    }

    this.authenticate = function(obj){
        let pr = $q.defer();
        var url = "/login";
        $http.post(url, obj).then(function (data) {
            localStorage.setItem('user-token', data.data.data.token);
            localStorage.setItem('id', data.data.data.user._id);
            pr.resolve(data);
        }, function (err) {
            pr.reject(err);
        });
        return pr.promise;
    }
    this.trendingRegion = function () {
        var pr = $q.defer();
        $http.get('/trendingregion', {
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
})