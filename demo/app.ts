var app = angular.module("demo", ["angular-odata-service"]);

app.config((ODataProvider:ng.odata.IODataProvider)=>{
    ODataProvider.routePrefix = "odata";
});