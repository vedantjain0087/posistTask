app.controller("LoginController", function ($scope, $rootScope, $location, AuthService) {
    $scope.user = {
        username: '',
        password: ''
    }
    $scope.login = function () {
        if (!$scope.user.username || !$scope.user.password) {
            swal({
                title: "Error",
                text: "Please fill all the fields",
                icon: "warning",
            });
            return;
        }
        AuthService.authenticate($scope.user).then(function (data) {
            $location.path('/dashboard');
            $scope.user = {};
        }, function (error) {
            swal({
                title: "Error",
                text: error.data.message,
                icon: "warning",
            });
        })
    }
});