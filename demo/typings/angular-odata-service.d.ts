declare module angular.odata {
    interface IODataProvider extends ng.IServiceProvider {
        routePrefix: string;
    }
}
declare module angular.odata {
    interface IQueryOptions {
        select?: string;
        filter?: string;
        expand?: string;
        orderBy?: string;
        count?: boolean | string;
        top?: number | string;
        skip?: number | string;
        /**Custom query string params*/
        custom?: ICustomParameter;
    }
    interface ICustomParameter {
        [K: string]: any;
    }
    interface IValueResult<T> {
        value: T[];
    }
}
