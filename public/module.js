var app = angular.module("PosistApp", ['ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl: "/views/home.html",
        controller: "HomeController"
    })
})