angular.module("angularODataService", [])


    .provider("odataProvider", function () {
        var provider: ng.odata.IODataProvider = {
            routePrefix: "",
            $get: () => { return { routePrefix: provider.routePrefix } }
        };
        return provider;
    })

    .service("odata", ["odataProvider", (odataProvider: ng.odata.IODataProvider) => {
console.info("SERVICE:" + odataProvider.routePrefix);
    }]);
;

