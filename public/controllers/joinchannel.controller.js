app.controller("JoinChannelController", function ($scope, $rootScope, $location, ChannelService, $routeParams) {
    if (!localStorage.getItem('id')) {
        $location.path('/');
        return;
    }
    $scope.available_Channels = [];
    $scope.availableChannels = function(){
        ChannelService.availableChannels({
            "user_id": localStorage.getItem('id')
        }).then(function (data) {
                $scope.available_Channels = data.data.data;
                console.log($scope.available_Channels);
            },
            function (error) {
                console.log(error);
            })
    }
    $scope.availableChannels();

    $scope.join = function(channel_id){
        ChannelService.join({
            "user_id": localStorage.getItem('id'),
            "channel_id":channel_id
        }).then(function (data) {
            $scope.availableChannels();
            swal({
                title: "Success",
                text: "Channel Joined Successfully",
                icon: "success",
            });
            },
            function (error) {
                console.log(error);
                swal({
                    title: "Error",
                    text: "Some Error Occured",
                    icon: "warning",
                });
            })
    }


})