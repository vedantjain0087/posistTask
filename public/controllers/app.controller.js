app.controller("AppController", function ($scope, $rootScope, $location,$timeout) {
    document.getElementById("overlay").style.display = "block";
    $timeout(function () {
        document.getElementById("overlay").style.display = "none";
    }, 3000);

    $scope.logout = function(){
        localStorage.removeItem('id');
        localStorage.removeItem('user-token');
        $location.path('/login')
    }
});