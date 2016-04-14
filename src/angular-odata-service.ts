angular.module("angular-odata-service", [])
    .provider("odata", function (): ng.odata.IODataProvider {
        var provider = {
            routePrefix: "",
            setRoutePrefix: (value: string) => {
                if (!value)
                    value = "";
                provider.routePrefix = value;
            },
            $get: ["$http", ($http: ng.IHttpService) => {

                var buildQuery = (filter: ng.odata.IODataQueryOptions) => {
                    var qry = <any>{};
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

                var buildUrl = (endpoint?: string, key?: number | string | ng.odata.ICompositeKey) => {
                    var parts = [];
                    if (provider.routePrefix && provider.routePrefix != "")
                        parts.push(provider.routePrefix);
                    if (endpoint)
                        parts.push(endpoint);
                    if (key) {
                        if (angular.isString(key))
                            parts.push("('" + key + "')");
                        if (angular.isNumber(key))
                            parts.push("(" + key + ")")
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
                            parts.push("(" + compositeKeyParts.join(",") + ")");
                        }
                    }
                    return parts.join("/");
                };


                var service: ng.odata.IODataService = {
                    get: <T>(endpoint, odataQueryOptions) => {
                        var url = buildUrl(endpoint);
                        return $http.get(url, {
                            params: buildQuery(odataQueryOptions)
                        });
                    },

                    getById: <T>(endpoint, key, odataQueryOptions) => {
                        var url = buildUrl(endpoint, key);
                        return $http.get(url, {
                            params: buildQuery(odataQueryOptions)
                        });
                    }
                };

                return service;

            }  
        }];

        return provider;
    });



