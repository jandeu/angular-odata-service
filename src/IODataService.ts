module angular.odata{
    export interface IODataProvider extends ng.IServiceProvider {
        setRoutePrefix(value:string);
    }
    
    export interface IODataService{
        get<T>(endpoint:string, odataQueryOptions?:ng.odata.IODataQueryOptions):ng.IHttpPromise<ng.odata.IODataColection<T>>;
        getById<T>(endpoint:string, key:number| string|ng.odata.ICompositeKey, odataQueryOptions:ng.odata.IODataQueryOptions): ng.IHttpPromise<T>;
    }
}