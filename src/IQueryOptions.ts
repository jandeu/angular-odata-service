module angular.odata {
    export interface IODataQueryOptions {
        select?: string;
        filter?: string;
        expand?: IExpandFilter | IExpandFilter[] | string;
        orderBy?: string;
        count?: boolean | string;
        top?: number | string;
        skip?: number | string;
    }
    
    export interface IExpandFilter{
        [K:string]:IODataQueryOptions;
    }
    
    export interface ICustomFilter{
        [K:string]:any;
    }
    
    export interface IODataColection<T>{
        value:T[];
    }
    
    export interface ICompositeKey{
        [K:string]:string|number;
    }
}