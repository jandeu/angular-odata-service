var app = angular.module("demo", ["angular-odata-service"]);
app.config(function (odataProvider) {
    odataProvider.setRoutePrefix("odata");
});
app.controller("mainCtrl", function (odata) {
});
