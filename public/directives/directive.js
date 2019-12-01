app.directive("ngHeaderStatic", function () {
    return {
        templateUrl: "/views/navbar.html",
        restrict: "E",
        controller: "AppController"
    }
});

app.directive("ngHeader", function () {
    return {
        templateUrl: "/views/dashboard_navbar.html",
        restrict: "E",
        controller: "AppController"
    }
});


app.directive("ngFooter", function () {
    return {
        templateUrl: "/views/footer.html",
        restrict: "E"
    }
});