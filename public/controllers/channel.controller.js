app.controller("ChannelController", function ($scope, $rootScope, $location, ChannelService, $routeParams) {
    if (!localStorage.getItem('id')) {
        $location.path('/');
        return;
    }

    $scope.channel_detail = [];
    ChannelService.retrieveChannel({
        "id": $routeParams.id
    }).then(function (data) {
            $scope.channel_detail = data.data.data[0];
        },
        function (error) {
            swal({
                title: "Error",
                text: "Some Error occured",
                icon: "warning",
            });
        })

    $scope.retrievePosts = function () {
        ChannelService.retrievePosts({
            "channel_id": $routeParams.id
        }).then(function (data) {
                $scope.posts = data.data.data;
                console.log($scope.posts);
            },
            function (error) {
                swal({
                    title: "Error",
                    text: "Some Error occured",
                    icon: "warning",
                });
            })
    }
    $scope.retrievePosts();

    $scope.createPost = function () {
        ChannelService.createPost({
            uid: localStorage.getItem('id'),
            channel_id: $routeParams.id,
            description: $scope.description
        }).then(function (data) {
                $scope.retrievePosts();
                $scope.description = "";
                swal({
                    title: "success",
                    text: "Some Error occured",
                    icon: "success",
                });
            },
            function (error) {
                swal({
                    title: "Error",
                    text: "Some Error occured",
                    icon: "warning",
                });
            })
    }
})