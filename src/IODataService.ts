module angular.odata {
    export interface IODataProvider extends ng.IServiceProvider {
        setRoutePrefix(value: string);
        setNamespace(value: string);
    }

    export interface IODataService {
        get<T>(entity: string, odataQueryOptions?: ng.odata.IODataQueryOptions): ng.IHttpPromise<ng.odata.IODataColection<T>>;

        getById<T>(entity: string, key: number | string | ng.odata.ICompositeKey, odataQueryOptions: ng.odata.IODataQueryOptions): ng.IHttpPromise<T>;

        post<T>(entity: string, key: number | string | ng.odata.ICompositeKey, data: T): ng.IHttpPromise<T>;

        put<T>(entity: string, key: number | string | ng.odata.ICompositeKey, data: any): ng.IHttpPromise<T>;

        patch<T>(entity: string, key: number | string | ng.odata.ICompositeKey, data: any): ng.IHttpPromise<T>;

        delete<T>(entity: string, key: number | string | ng.odata.ICompositeKey): ng.IHttpPromise<T>;

        action<T>(actionName: string, data: any, entity?: string, key?: number | string | ng.odata.ICompositeKey): ng.IHttpPromise<T>;
        
        function<T>(functionName:string, entity?:string, key?: number | string | ng.odata.ICompositeKey):ng.IHttpPromise<T>;
    }
}