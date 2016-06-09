module angular.odata {
    export interface IODataProvider extends ng.IServiceProvider {
        setRoutePrefix(value: string);
        setNamespace(value: string);
    }

    export interface IODataService {
        get<T>(entity: string | IEntity, odataQuery?: IODataQuery, config?:ng.IRequestShortcutConfig): ng.IHttpPromise<IODataColectionResult<T>>;

        getById<T>(entity: string | IEntity, key: number | string | ICompositeKey, odataQuery?: IODataQuery, config?:ng.IRequestShortcutConfig): ng.IHttpPromise<T>;
        
        getCount(entity: string | IEntity, odataQuery?: IODataQuery, config?:ng.IRequestShortcutConfig):ng.IHttpPromise<number>;

        post<T>(entity: string, key: number | string | ICompositeKey, data: T, config?:ng.IRequestShortcutConfig): ng.IHttpPromise<T>;

        put<T>(entity: string, key: number | string | ICompositeKey, data: any, config?:ng.IRequestShortcutConfig): ng.IHttpPromise<T>;

        patch<T>(entity: string, key: number | string | ICompositeKey, data: any, config?:ng.IRequestShortcutConfig): ng.IHttpPromise<T>;

        delete<T>(entity: string, key: number | string | ICompositeKey, config?:ng.IRequestShortcutConfig): ng.IHttpPromise<T>;

        action<T>(actionName: string, data: any, entity?: string, key?: number | string | ICompositeKey, config?:ng.IRequestShortcutConfig): ng.IHttpPromise<IODataValueResult<T>>;
        
        function<T>(functionName:string, entity?:string, key?: number | string | ICompositeKey, config?:ng.IRequestShortcutConfig):ng.IHttpPromise<IODataValueResult<T>>;
        
        
    }
}