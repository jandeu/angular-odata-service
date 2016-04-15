var app = angular.module("demo", ["angular-odata-service"]);

app.config((odataProvider)=>{
    odataProvider.setRoutePrefix("odata");
    odataProvider.setNamespace("ns");
});

app.controller("mainCtrl", (odata)=>{
    odata.get("test", {top:10});
});