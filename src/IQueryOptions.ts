module odata {
    export interface IQueryOptions {
        select?: string;
        filter?: string;
        expand?: string;
        orderBy?: string;
        count?: boolean | string;
        top?: number | string;
        skip?: number | string;

        /**Custom query string params*/
        custom?: ICustomParameter
    }

    export interface ICustomParameter {
        [K: string]: any;
    }
    
    export interface IValueResult<T>{
        value:T[];
    }
    
    
}