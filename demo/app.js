var app = angular.module("demo", ["angular-odata-service"]);
app.config(function (odataProvider) {
    odataProvider.setRoutePrefix("http://services.odata.org/V3/Northwind/Northwind.svc");
    odataProvider.setNamespace("NorthwindModel");
});
app.controller("myCtrl", function (odata) {
    odata.get("Products", {
        select: "ProductName,UnitsInStock",
        filter: "UnitsInStock gt 20",
        orderBy: "ReorderLevel",
        top: 10
    });
});
