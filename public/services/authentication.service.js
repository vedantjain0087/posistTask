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
})