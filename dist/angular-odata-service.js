angular.module("angular-odata-service", [])
    .provider("odata", function () {
    var provider = {
        routePrefix: "",
        setRoutePrefix: function (value) {
            if (!value)
                value = "";
            provider.routePrefix = value;
        },
        $get: ["$http", function ($http) {
                var buildQuery = function (filter) {
                    var qry = {};
                    if (filter.select)
                        qry.$select = filter.select;
                    if (filter.filter)
                        qry.$filter = filter.filter;
                    if (filter.expand) {
                        if (angular.isString(filter.expand))
                            qry.$filter = filter.expand;
                    }
                    if (filter.orderBy)
                        qry.$orderBy = filter.orderBy;
                    if (filter.count)
                        qry.$count = filter.count;
                    if (filter.top)
                        qry.$top = filter.top;
                    if (filter.skip)
                        qry = filter.skip;
                    return qry;
                };
                var buildUrl = function (endpoint, key) {
                    var parts = [];
                    if (provider.routePrefix && provider.routePrefix != "")
                        parts.push(provider.routePrefix);
                    if (endpoint)
                        parts.push(endpoint);
                    if (key) {
                        if (angular.isString(key))
                            parts.push("('" + key + "')");
                        if (angular.isNumber(key))
                            parts.push("(" + key + ")");
                        else {
                            var compositeKeyParts = [];
                            for (var compositeKeyPart in key) {
                                if (angular.isNumber(key[compositeKeyPart])) {
                                    compositeKeyParts.push(compositeKeyPart + "=" + key[compositeKeyPart]);
                                }
                                else if (angular.isString(key[compositeKeyPart])) {
                                    compositeKeyParts.push(compositeKeyPart + "='" + key[compositeKeyPart] + "'");
                                }
                            }
                            parts.push("(" + compositeKeyParts.join(",") + ")");
                        }
                    }
                    return parts.join("/");
                };
                var service = {
                    get: function (endpoint, odataQueryOptions) {
                        var url = buildUrl(endpoint);
                        return $http.get(url, {
                            params: buildQuery(odataQueryOptions)
                        });
                    },
                    getById: function (endpoint, key, odataQueryOptions) {
                        var url = buildUrl(endpoint, key);
                        return $http.get(url, {
                            params: buildQuery(odataQueryOptions)
                        });
                    }
                };
                return service;
            }]
    };
    return provider;
});
//# sourceMappingURL=angular-odata-service.js.map