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

                var buildQuery = (query: ng.odata.IODataQuery) => {
                    if (!query)
                        return null;
                    var params = <any>{};
                    for (var p in query) {
                        if (p === "custom") {
                            for (var key in query.custom) {
                                if (!angular.isObject(query.custom[key]))
                                    params[key] = query.custom[key];
                                else
                                    params[key] = JSON.stringify(query.custom[key]);
                            }
                        } else {
                            params["$" + p.toLowerCase()] = query[p];
                        }
                    }
                    return params;
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
                    get: <T>(entity, odataQuery) => {
                        var url = buildUrl(entity);
                        return $http.get(url, {
                            params: buildQuery(odataQuery)
                        });
                    },

                    getById: <T>(entity, key, odataQuery) => {
                        var url = buildUrl(entity, key);
                        return $http.get(url, {
                            params: buildQuery(odataQuery)
                        });
                    },
                    getCount: (entity, odataQuery) => {
                        var url = buildUrl(entity) + "/$count";
                        return $http.get<number>(url, {
                            params: buildQuery(odataQuery)
                        }).success(resp => {
                            return Number(resp);
                        });
                    },
                    patch: <T>(entity, key, data) => {
                        var url = buildUrl(entity, key);
                        return $http.patch(url, data);
                    },
                    post: <T>(entity, key, data) => {
                        var url = buildUrl(entity, key);
                        return $http.post(url, data);
                    },
                    put: <T>(entity, key, data) => {
                        var url = buildUrl(entity, key);
                        return $http.put(url, data);
                    },
                    delete: <T>(entity, key) => {
                        var url = buildUrl(entity, key);
                        return $http.delete(url);
                    },
                    action: <T>(actionName, data, entity, key) => {
                        var url = buildUrl(entity, key, actionName);
                        return $http.post(url, data);
                    },
                    function: <T>(functionName, entity, key) => {
                        var url = buildUrl(entity, key, functionName);
                        return $http.get(url);
                    }

                };

                return service;

            }]
        };

        return provider;
    });



