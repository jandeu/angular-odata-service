angular.module("angular-odata-service", [])
    .provider("odata", function () {
    var provider = {
        routePrefix: "",
        namespace: "",
        setRoutePrefix: function (value) {
            if (!value)
                value = "";
            provider.routePrefix = value;
        },
        setNamespace: function (value) {
            if (!value)
                value = "";
            provider.namespace = value;
        },
        $get: ["$http", function ($http) {
                var buildQuery = function (query) {
                    if (!query)
                        return null;
                    var params = {};
                    if (query.select)
                        params.$select = query.select;
                    if (query.filter)
                        params.$filter = query.filter;
                    if (query.expand) {
                        if (angular.isString(query.expand))
                            params.$expand = query.expand;
                    }
                    if (query.orderBy)
                        params.$orderBy = query.orderBy;
                    if (query.count)
                        params.$count = query.count;
                    if (query.top)
                        params.$top = query.top;
                    if (query.skip)
                        params.$skip = query.skip;
                    if (query.search)
                        params.$search = query.search;
                    if (query.custom) {
                        angular.copy(query.custom, params);
                    }
                    return params;
                };
                var buildUrl = function (entity, key, actionOrFunctionName) {
                    var parts = [];
                    if (provider.routePrefix && provider.routePrefix != "")
                        parts.push(provider.routePrefix);
                    if (entity) {
                        if (key) {
                            if (angular.isString(key))
                                parts.push(entity + "('" + key + "')");
                            else if (angular.isNumber(key))
                                parts.push(entity + "(" + key + ")");
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
                                parts.push(entity + "(" + compositeKeyParts.join(",") + ")");
                            }
                        }
                        else {
                            parts.push(entity);
                        }
                    }
                    if (actionOrFunctionName) {
                        parts.push(provider.namespace + "." + actionOrFunctionName);
                    }
                    return parts.join("/");
                };
                var service = {
                    get: function (entity, odataQueryOptions) {
                        var url = buildUrl(entity);
                        return $http.get(url, {
                            params: buildQuery(odataQueryOptions)
                        });
                    },
                    getById: function (entity, key, odataQueryOptions) {
                        var url = buildUrl(entity, key);
                        return $http.get(url, {
                            params: buildQuery(odataQueryOptions)
                        });
                    },
                    patch: function (entity, key, data) {
                        var url = buildUrl(entity, key);
                        return $http.patch(url, data);
                    },
                    post: function (entity, key, data) {
                        var url = buildUrl(entity, key);
                        return $http.post(url, data);
                    },
                    put: function (entity, key, data) {
                        var url = buildUrl(entity, key);
                        return $http.put(url, data);
                    },
                    delete: function (entity, key) {
                        var url = buildUrl(entity, key);
                        return $http.delete(url);
                    },
                    action: function (actionName, data, entity, key) {
                        var url = buildUrl(entity, key, actionName);
                        return $http.post(url, data);
                    },
                    function: function (functionName, entity, key) {
                        var url = buildUrl(entity, key, functionName);
                        return $http.get(url);
                    }
                };
                return service;
            }]
    };
    return provider;
});
//# sourceMappingURL=angular-odata-service.js.map