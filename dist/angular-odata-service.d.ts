declare module angular.odata {
    interface IODataProvider extends ng.IServiceProvider {
        setRoutePrefix(value: string): any;
        setNamespace(value: string): any;
    }
    interface IODataService {
        get<T>(entity: string | IEntity, odataQuery?: IODataQuery): ng.IHttpPromise<IODataColectionResult<T>>;
        getById<T>(entity: string | IEntity, key: number | string | ICompositeKey, odataQuery?: IODataQuery): ng.IHttpPromise<T>;
        getCount(entity: string | IEntity, odataQuery?: IODataQuery): ng.IHttpPromise<number>;
        post<T>(entity: string, key: number | string | ICompositeKey, data: T): ng.IHttpPromise<T>;
        put<T>(entity: string, key: number | string | ICompositeKey, data: any): ng.IHttpPromise<T>;
        patch<T>(entity: string, key: number | string | ICompositeKey, data: any): ng.IHttpPromise<T>;
        delete<T>(entity: string, key: number | string | ICompositeKey): ng.IHttpPromise<T>;
        action<T>(actionName: string, data: any, entity?: string, key?: number | string | ICompositeKey): ng.IHttpPromise<IODataValueResult<T>>;
        function<T>(functionName: string, entity?: string, key?: number | string | ICompositeKey): ng.IHttpPromise<IODataValueResult<T>>;
    }
}
declare module angular.odata {
    interface IODataQuery {
        /**
         * Limit the properties on each entry to just those requested, e.g. Categories?$select=CategoryName,Description.
         */
        select?: string;
        /**
         * A Boolean expression for whether a particular entry should be included in the feed, e.g. Categories?$filter=CategoryName eq 'Produce'.
         */
        filter?: string;
        /**
         * Expand related resources in line with the retrieved resources, e.g. Categories/$expand=Products would expand Product data in line with each Category entry.
         */
        expand?: string;
        /**
         * One or more comma-separated expressions with an optional “asc” (the default) or “desc” depending on the order you’d like the values sorted, e.g. Categories?$orderby=CategoryName desc.
         */
        orderBy?: string;
        /**
         * A Boolean value of true or false request a count of the matching resources included with the resources in the response, e.g. Categories?$count=true
         */
        count?: boolean;
        /**
         * Return entries from the top of the feed, e.g. Categories?$top=4.
         */
        top?: number | string;
        /**
         * How many entries you’d like to skip, e.g. Categories?$skip=4.
         */
        skip?: number | string;
        /**
         * Custom query parameters that will be appendet to query string, e.g. Categories?foo=bar
         */
        custom?: ICustomFilter;
        /**
         * A free-text search expressioni to match for whether a particular entry should be included in the feed, e.g. Categories?$search=blue OR green
         */
        search?: string;
    }
    interface ICustomFilter {
        [K: string]: any;
    }
    interface IODataColectionResult<T> {
        value: T[];
        "@odata.nextLink"?: string;
        "@odata.count"?: number;
        "@odata.context"?: string;
    }
    interface IODataValueResult<T> {
        value: T;
    }
    interface ICompositeKey {
        [K: string]: string | number;
    }
    interface IEntity {
        entity: string;
        navigationProperty: string;
    }
}
