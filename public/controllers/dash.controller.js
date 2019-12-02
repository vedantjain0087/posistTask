app.controller("DashController", function ($scope, $rootScope, $location, ChannelService) {
    if (!localStorage.getItem('id')) {
        $location.path('/');
        return;
    }
    $scope.myChannels = [];
    $scope.trendingChannels = [];
    $scope.activeUsers = [];
    ChannelService.myChannels({
        "user_id": localStorage.getItem('id')
    }).then(function (data) {
            $scope.myChannels = data.data.data;
        },
        function (error) {
            swal({
                title: "Error",
                text: "Some Error occured",
                icon: "warning",
            });
        })
    ChannelService.trendingChannels().then(function (data) {
        $scope.trendingChannels = data.data.data;
    }, function (err) {
        console.log(err);
    })

    ChannelService.activeUsers().then(function (data) {
        $scope.activeUsers = data.data.data;
    }, function (err) {
        console.log(err);
    })
})