angular.module("angular-odata-service", [])
    .provider("odata", function (): ng.odata.IODataProvider {
        var provider = {
            routePrefix: "",
            namespace: "",
            setRoutePrefix: (value: string) => {
                if (!value)
                    value = "";
                provider.routePrefix = value;
            },
            setNamespace(value: string) {
                if (!value)
                    value = "";
                provider.namespace = value;
            },
            $get: ["$http", ($http: ng.IHttpService) => {
                var buildRequestConfig = (config: ng.IRequestShortcutConfig, query?: ng.odata.IODataQuery): ng.IRequestShortcutConfig => {

                    if (!query)
                        return config;

                    var odataRequestParams = <any>{};
                    for (var p in query) {
                        if (p === "custom") {
                            for (var key in query.custom) {
                                let value = query.custom[key];
                                if (value && value != "") {
                                    if (!angular.isObject(value))
                                        odataRequestParams[key] = value;
                                    else
                                        odataRequestParams[key] = JSON.stringify(value);
                                }
                            }
                        } else {
                            let value = query[p];
                            if (value && value != "") {
                                odataRequestParams["$" + p.toLowerCase()] = value;
                            }
                        }
                    }
                    if (!config) {
                        config = { params: odataRequestParams };
                    } else {
                        if (angular.isDefined(config.params)) {
                            angular.extend(config.params, odataRequestParams);
                        } else {
                            config.params = odataRequestParams;
                        }
                    }

                    return config;
                };

                var buildUrl = (entity?: string | ng.odata.IEntity, key?: number | string | ng.odata.ICompositeKey, actionOrFunctionName?: string) => {
                    var parts = [];
                    if (provider.routePrefix && provider.routePrefix != "")
                        parts.push(provider.routePrefix);
                    if (entity) {
                        var entityName = "";
                        var navigationPropertyName = null;
                        if (angular.isString(entity))
                            entityName = <string>entity;
                        else {
                            entityName = (<ng.odata.IEntity>entity).entity;
                            navigationPropertyName = (<ng.odata.IEntity>entity).navigationProperty;
                        }

                        if (key) {
                            if (angular.isString(key))
                                parts.push(entityName + "('" + key + "')");
                            else if (angular.isNumber(key))
                                parts.push(entityName + "(" + key + ")")
                            else {
                                var compositeKeyParts = [];
                                for (var compositeKeyPart in <ng.odata.ICompositeKey>key) {
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



                var service: ng.odata.IODataService = {
                    get: <T>(entity, odataQuery, config) => {
                        var url = buildUrl(entity);
                        var requestConfig = buildRequestConfig(config, odataQuery);
                        return $http.get(url, requestConfig);
                    },

                    getById: <T>(entity, key, odataQuery, config) => {
                        var url = buildUrl(entity, key);
                        var requestConfig = buildRequestConfig(config, odataQuery);
                        return $http.get(url, requestConfig);
                    },
                    getCount: (entity, odataQuery,config) => {
                        var url = buildUrl(entity) + "/$count";
                        var requestConfig = buildRequestConfig(config, odataQuery);
                        return $http.get<number>(url, requestConfig).success(resp => {
                            return Number(resp);
                        });
                    },
                    patch: <T>(entity, key, data, config) => {
                        var url = buildUrl(entity, key);                        
                        return $http.patch(url, data, config);
                    },
                    post: <T>(entity, key, data, config) => {
                        var url = buildUrl(entity, key);
                        return $http.post(url, data, config);
                    },
                    put: <T>(entity, key, data,config) => {
                        var url = buildUrl(entity, key);
                        return $http.put(url, data, config);
                    },
                    delete: <T>(entity, key, config) => {
                        var url = buildUrl(entity, key);
                        return $http.delete(url, config);
                    },
                    action: <T>(actionName, data, entity, key, config) => {
                        var url = buildUrl(entity, key, actionName);
                        return $http.post(url, data, config);
                    },
                    function: <T>(functionName, entity, key, config) => {
                        var url = buildUrl(entity, key, functionName);
                        return $http.get(url, config);
                    }

                };

                return service;

            }]
        };

        return provider;
    });



