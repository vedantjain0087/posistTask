var app = angular.module("PosistApp", ['ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when("/", {
        templateUrl: "/views/home.html",
        controller: "HomeController"
    }).when("/login", {
        templateUrl: "/views/login.html",
        controller: "LoginController"
    }).when("/dashboard", {
        templateUrl: "/views/dashboard.html",
        controller: "DashController"
    }).when("/channel/:id", {
        templateUrl: "/views/channel.html",
        controller: "ChannelController"
    }).when("/createchannel", {
        templateUrl: "/views/createChannel.html",
        controller: "CreateChannelController"
    }).when("/joinchannel", {
        templateUrl: "/views/joinChannel.html",
        controller: "JoinChannelController"
    })
})