app.controller("CreateChannelController", function ($scope, $rootScope, $location, ChannelService, $routeParams) {
    if (!localStorage.getItem('id')) {
        $location.path('/');
        return;
    }

    $scope.selection = [];
    $scope.channel = {
        name:'',
        description:'',
        boxes : ['Machine Learning', 'Maths', 'Web Development']
    }
    $scope.toggleSelection = function toggleSelection(b) {
        var idx = $scope.selection.indexOf(b);

        // Is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

        // Is newly selected
        else {
            $scope.selection.push(b);
        }
    };

    $scope.createChannel = function () {
        document.getElementById("overlay").style.display = "block";
        ChannelService.createChannel(
            {
                "name":$scope.channel.name,
                "description":$scope.channel.description,
                "tags":  $scope.selection,
                "users":localStorage.getItem('id')
            }
        ).then(function (data) {
        document.getElementById("overlay").style.display = "none";
            swal({
                title: "Success",
                text: "Channel Created Successfully",
                icon: "success",
            });
            $scope.channel = {
                name:'',
                description:'',
                boxes : ['Machine Learning', 'Maths', 'Web Development']
            }
            $scope.selection = [];
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