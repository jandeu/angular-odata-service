/**
 * ODataService
 */
class ODataService {

    static $inject = ["$http", "odataProvider"];
    constructor(private $http: ng.IHttpService, private odataProvider: odataProvider) {

    }

    public get<T>(endpoint: string, options: odata.IQueryOptions, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<odata.IValueResult<T>> {
        var url = this.odataProvider.routePrefix + endpoint + "/" + new odata.QueryStringBuilder(options).build();
        return this.$http.get(url, config);
    }

    public getById<T>(endpoint: string, entityId: string | number, options: odata.IQueryOptions, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        var url = this.odataProvider.routePrefix + endpoint + "/" + this.convertKeyToString(entityId) + "/" + new odata.QueryStringBuilder(options);
        return this.$http.get(url, config);
    }


    private convertKeyToString(key: string | number) {
        if (angular.isNumber(key))
            return key;
        return "'+key+'";

    }
}