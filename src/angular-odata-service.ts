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

                var buildQuery = (query: ng.odata.IODataQueryOptions) => {
                    if (!query)
                        return null;
                    var params = <any>{};
                    if (query.select)
                        params.$select = query.select;
                    if (query.filter)
                        params.$filter = query.filter;
                    if (query.expand) {
                        if (angular.isString(query.expand))
                            params.$filter = query.expand;

                    }
                    if (query.orderBy)
                        params.$orderBy = query.orderBy;
                    if (query.count)
                        params.$count = query.count;
                    if (query.top)
                        params.$top = query.top;
                    if (query.skip)
                        params = query.skip;
                    if (query.custom) {
                        angular.copy(query.custom, params);
                    }
                    return params;
                };

                var buildUrl = (entity?: string, key?: number | string | ng.odata.ICompositeKey, actionOrFunctionName?:string) => {
                    var parts = [];
                    if (provider.routePrefix && provider.routePrefix != "")
                        parts.push(provider.routePrefix);
                    if (entity) {
                        if (key) {
                            if (angular.isString(key))
                                parts.push(entity + "('" + key + "')");
                            else if (angular.isNumber(key))
                                parts.push(entity + "(" + key + ")")
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
                                parts.push(entity + "(" + compositeKeyParts.join(",") + ")");
                            }
                        }
                    } else {
                        parts.push(entity);
                    }
                    if(actionOrFunctionName){
                        parts.push(provider.namespace + "." + actionOrFunctionName);
                    }

                    return parts.join("/");
                };


                var service: ng.odata.IODataService = {
                    get: <T>(entity, odataQueryOptions) => {
                        var url = buildUrl(entity);
                        return $http.get(url, {
                            params: buildQuery(odataQueryOptions)
                        });
                    },

                    getById: <T>(entity, key, odataQueryOptions) => {
                        var url = buildUrl(entity, key);
                        return $http.get(url, {
                            params: buildQuery(odataQueryOptions)
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

            }  
        }];

        return provider;
    });



