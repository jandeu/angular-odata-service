var app = angular.module("demo", ["angular-odata-service"]);

app.config((odataProvider)=>{
    odataProvider.setRoutePrefix("odata");
});

app.controller("mainCtrl", (odata)=>{
    
});