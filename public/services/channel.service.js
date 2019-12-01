app.service("ChannelService", function ($http, $q) {

    this.myChannels = function (obj) {
        let pr = $q.defer();
        var url = "/mychannels";
        $http.post(url, obj).then(function (data) {
            pr.resolve(data);
        }, function (err) {
            pr.reject(err);
        });
        return pr.promise;
    }
});