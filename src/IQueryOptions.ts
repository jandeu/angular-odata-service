module angular.odata {
    export interface IODataQueryOptions {
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
        expand?:  string;
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
        custom?:ICustomFilter;
        /**
         * A free-text search expressioni to match for whether a particular entry should be included in the feed, e.g. Categories?$search=blue OR green
         */
        search?:string;
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