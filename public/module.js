var app = angular.module("PosistApp", ['ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when("/", {
        templateUrl: "/views/home.html",
        controller: "HomeController"
    }).when("/login", {
        templateUrl: "/views/login.html",
        controller: "LoginController"
    })
})