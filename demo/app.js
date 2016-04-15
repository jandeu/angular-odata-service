var app = angular.module("demo", ["angular-odata-service"]);
app.config(function (odataProvider) {
    odataProvider.setRoutePrefix("odata");
    odataProvider.setNamespace("ns");
});
app.controller("mainCtrl", function (odata) {
    odata.get("test", { top: 10 });
});
