module angular.odata {
    export interface IODataProvider extends ng.IServiceProvider {
        setRoutePrefix(value: string);
        setNamespace(value: string);
    }

    export interface IODataService {
        get<T>(entity: string | IEntity, odataQuery?: IODataQuery): ng.IHttpPromise<IODataColectionResult<T>>;

        getById<T>(entity: string | IEntity, key: number | string | ICompositeKey, odataQuery?: IODataQuery): ng.IHttpPromise<T>;
        
        getCount(entity: string | IEntity, odataQuery?: IODataQuery):ng.IHttpPromise<number>;

        post<T>(entity: string, key: number | string | ICompositeKey, data: T): ng.IHttpPromise<T>;

        put<T>(entity: string, key: number | string | ICompositeKey, data: any): ng.IHttpPromise<T>;

        patch<T>(entity: string, key: number | string | ICompositeKey, data: any): ng.IHttpPromise<T>;

        delete<T>(entity: string, key: number | string | ICompositeKey): ng.IHttpPromise<T>;

        action<T>(actionName: string, data: any, entity?: string, key?: number | string | ICompositeKey): ng.IHttpPromise<IODataValueResult<T>>;
        
        function<T>(functionName:string, entity?:string, key?: number | string | ICompositeKey):ng.IHttpPromise<IODataValueResult<T>>;
        
        
    }
}