app.controller("LoginController", function ($scope, $rootScope, $location, AuthService) {
    if(localStorage.getItem('id') && localStorage.getItem('user-token')){
        $location.path('/dashboard');
    }
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
        document.getElementById("overlay").style.display = "block";
        AuthService.authenticate($scope.user).then(function (data) {
            document.getElementById("overlay").style.display = "none";
            $location.path('/dashboard');
            $scope.user = {};
        }, function (error) {
            document.getElementById("overlay").style.display = "none";
            swal({
                title: "Error",
                text: error.data.message,
                icon: "warning",
            });
        })
    }
});