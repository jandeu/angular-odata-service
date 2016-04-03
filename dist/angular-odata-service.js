/**
 * odataProvider
 **/
var odataProvider = (function () {
    function odataProvider() {
        var _this = this;
        this.$get = function () {
            return {
                routePrefix: _this.routePrefix
            };
        };
    }
    return odataProvider;
}());
/**
 * ODataService
 */
var ODataService = (function () {
    function ODataService($http, odataProvider) {
        this.$http = $http;
    }
    ODataService.$inject = ["$http", "odataProvider"];
    return ODataService;
}());
var app = angular.module("jandeu.odata", []);
app.provider("odataProvider", odataProvider);
app.service("odata", ODataService);
