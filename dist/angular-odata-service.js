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
                    for (var p in query) {
                        if (p === "custom") {
                            for (var key in query.custom) {
                                var value = query.custom[key];
                                if (value && value != "") {
                                    if (!angular.isObject(value))
                                        params[key] = value;
                                    else
                                        params[key] = JSON.stringify(value);
                                }
                            }
                        }
                        else {
                            var value = query[p];
                            if (value && value != "") {
                                params["$" + p.toLowerCase()] = value;
                            }
                        }
                    }
                    return params;
                };
                var buildRequestConfig = function (config, query) {
                    if (!query)
                        return config;
                    var odataRequestParams = {};
                    for (var p in query) {
                        if (p === "custom") {
                            for (var key in query.custom) {
                                var value = query.custom[key];
                                if (value && value != "") {
                                    if (!angular.isObject(value))
                                        odataRequestParams[key] = value;
                                    else
                                        odataRequestParams[key] = JSON.stringify(value);
                                }
                            }
                        }
                        else {
                            var value = query[p];
                            if (value && value != "") {
                                odataRequestParams["$" + p.toLowerCase()] = value;
                            }
                        }
                    }
                    if (!config) {
                        config = { params: odataRequestParams };
                    }
                    else {
                        if (angular.isDefined(config.params)) {
                            angular.extend(config.params, odataRequestParams);
                        }
                        else {
                            config.params = odataRequestParams;
                        }
                    }
                    return config;
                };
                var buildUrl = function (entity, key, actionOrFunctionName) {
                    var parts = [];
                    if (provider.routePrefix && provider.routePrefix != "")
                        parts.push(provider.routePrefix);
                    if (entity) {
                        var entityName = "";
                        var navigationPropertyName = null;
                        if (angular.isString(entity))
                            entityName = entity;
                        else {
                            entityName = entity.entity;
                            navigationPropertyName = entity.navigationProperty;
                        }
                        if (key) {
                            if (angular.isString(key))
                                parts.push(entityName + "('" + key + "')");
                            else if (angular.isNumber(key))
                                parts.push(entityName + "(" + key + ")");
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
                                parts.push(entityName + "(" + compositeKeyParts.join(",") + ")");
                            }
                        }
                        else {
                            parts.push(entityName);
                        }
                        if (navigationPropertyName)
                            parts.push(navigationPropertyName);
                    }
                    if (actionOrFunctionName) {
                        parts.push(provider.namespace + "." + actionOrFunctionName);
                    }
                    return parts.join("/");
                };
                var service = {
                    get: function (entity, odataQuery, config) {
                        var url = buildUrl(entity);
                        var requestConfig = buildRequestConfig(config, odataQuery);
                        return $http.get(url, requestConfig);
                    },
                    getById: function (entity, key, odataQuery, config) {
                        var url = buildUrl(entity, key);
                        var requestConfig = buildRequestConfig(config, odataQuery);
                        return $http.get(url, requestConfig);
                    },
                    getCount: function (entity, odataQuery, config) {
                        var url = buildUrl(entity) + "/$count";
                        var requestConfig = buildRequestConfig(config, odataQuery);
                        return $http.get(url, requestConfig).success(function (resp) {
                            return Number(resp);
                        });
                    },
                    patch: function (entity, key, data, config) {
                        var url = buildUrl(entity, key);
                        return $http.patch(url, data, config);
                    },
                    post: function (entity, key, data, config) {
                        var url = buildUrl(entity, key);
                        return $http.post(url, data, config);
                    },
                    put: function (entity, key, data, config) {
                        var url = buildUrl(entity, key);
                        return $http.put(url, data, config);
                    },
                    delete: function (entity, key, config) {
                        var url = buildUrl(entity, key);
                        return $http.delete(url, config);
                    },
                    action: function (actionName, data, entity, key, config) {
                        var url = buildUrl(entity, key, actionName);
                        return $http.post(url, data, config);
                    },
                    function: function (functionName, entity, key, config) {
                        var url = buildUrl(entity, key, functionName);
                        return $http.get(url, config);
                    }
                };
                return service;
            }]
    };
    return provider;
});
