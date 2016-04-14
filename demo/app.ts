var app = angular.module("demo", ["angular-odata-service"]);

app.config((odataProvider)=>{
    odataProvider.setRoutePrefix("odata");
});

app.controller("mainCtrl", (odata)=>{
    odata.getById("test",{id:1, version:"a"}, {select:"Id,Name"});
});