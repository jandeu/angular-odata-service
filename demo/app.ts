var app = angular.module("jandeu.odata-demo", ["jandeu.odata"]);

app.config(["odataProvider", (odataProvider:ng.odata.IODataServiceProvider)=>{
    odataProvider.routePrefix = "/odata/"
}]);

