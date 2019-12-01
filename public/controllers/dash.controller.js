app.controller("DashController", function ($scope, $rootScope, $location, ChannelService) {
    if (!localStorage.getItem('id')) {
        $location.path('/');
        return;
    }
    $scope.myChannels = [];
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
})