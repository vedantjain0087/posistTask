app.controller("ChannelController", function ($scope, $rootScope, $location, ChannelService, $routeParams) {
    if (!localStorage.getItem('id')) {
        $location.path('/');
        return;
    }

    $scope.channel_detail = [];
    $scope.members = [];
    $scope.total_posts = [];
    $scope.posts = []

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
                $scope.total_posts = data.data.data.reverse();
                $scope.posts = $scope.total_posts.splice(0, 2).reverse();
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
    $scope.lazy_load = function () {
        $scope.posts = [...$scope.total_posts.splice(0, 2).reverse(), ...$scope.posts];
    }
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