declare module angular.odata {
    interface IODataProvider extends ng.IServiceProvider {
        setRoutePrefix(value: string): any;
    }
    interface IODataService {
        get<T>(endpoint: string, odataQueryOptions?: ng.odata.IODataQueryOptions): ng.IHttpPromise<ng.odata.IODataColection<T>>;
        getById<T>(endpoint: string, key: number | string | ng.odata.ICompositeKey, odataQueryOptions: ng.odata.IODataQueryOptions): ng.IHttpPromise<T>;
    }
}
declare module angular.odata {
    interface IODataQueryOptions {
        select?: string;
        filter?: string;
        expand?: IExpandFilter | IExpandFilter[] | string;
        orderBy?: string;
        count?: boolean | string;
        top?: number | string;
        skip?: number | string;
    }
    interface IExpandFilter {
        [K: string]: IODataQueryOptions;
    }
    interface ICustomFilter {
        [K: string]: any;
    }
    interface IODataColection<T> {
        value: T[];
    }
    interface ICompositeKey {
        [K: string]: string | number;
    }
}
