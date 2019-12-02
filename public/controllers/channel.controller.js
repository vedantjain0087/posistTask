app.controller("ChannelController", function ($scope, $rootScope, $location, ChannelService, $routeParams) {
    if (!localStorage.getItem('id')) {
        $location.path('/');
        return;
    }

    $scope.channel_detail = [];
    $scope.members = [];

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

    ChannelService.members({
        "id": $routeParams.id
    }).then(function (data) {
            $scope.members = data.data.data;
            console.log($scope.members)
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
        document.getElementById("overlay").style.display = "block";
        ChannelService.createPost({
            uid: localStorage.getItem('id'),
            channel_id: $routeParams.id,
            description: $scope.description
        }).then(function (data) {
                $scope.retrievePosts();
                document.getElementById("overlay").style.display = "none";
                $scope.description = "";
                swal({
                    title: "success",
                    text: "Some Error occured",
                    icon: "success",
                });
            },
            function (error) {
                document.getElementById("overlay").style.display = "none";
                swal({
                    title: "Error",
                    text: "Some Error occured",
                    icon: "warning",
                });
            })
    }

})