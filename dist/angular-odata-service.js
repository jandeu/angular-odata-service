angular.module("angularODataService", [])
    .provider("odataProvider", function () {
    var provider = {
        routePrefix: "",
        $get: function () { return { routePrefix: provider.routePrefix }; }
    };
    return provider;
})
    .service("odata", ["odataProvider", function (odataProvider) {
        console.info("SERVICE:" + odataProvider.routePrefix);
    }]);
;
//# sourceMappingURL=angular-odata-service.js.map