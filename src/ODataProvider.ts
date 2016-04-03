/**
 * odataProvider
 **/
class odataProvider implements ng.IServiceProvider {
    public routePrefix: string;
    constructor() {
    }
    
    $get = ()=>{
        return {
            routePrefix:this.routePrefix
        };
    };

}