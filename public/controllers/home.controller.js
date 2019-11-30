app.controller("HomeController", function ($scope, $rootScope, $location, AuthService) {
    $scope.user = {
        username: '',
        email: '',
        password: '',
        password2: '',
        region: ''
    }
    $scope.register = function () {
        if (!$scope.user.username || !$scope.user.email || !$scope.user.password || !$scope.user.password2 || !$scope.user.region) {
            swal({
                title: "Error",
                text: "Please fill all the fields",
                icon: "warning",
            });
            return;
        }
        if ($scope.user.password != $scope.user.password2) {
            swal({
                title: "Error",
                text: "The Passwords Don`t match",
                icon: "warning",
            });
            return;
        }

        AuthService.register($scope.user).then(function (data) {
            swal({
                title: "Success",
                text: "Registration Successfull",
                icon: "success",
            });
            $scope.user = {};
        }, function (error) {
            swal({
                title: "Error",
                text: error.data.errmsg,
                icon: "warning",
            });
        })

    }
});