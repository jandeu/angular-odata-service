# angular-odata-service
Angular service for making OData (v4) queries

The service is similar to angular $http service but provides API to build human-readable odata queries.

It's meant for projects, where angular resources are unnecessary level of abstraction.

But if you prefer to work with resources, check out this project on github: [ODataAngularResources](https://github.com/devnixs/ODataAngularResources)

## Installation
1. Download the repository
2. Include the file **dist/angular-odata-resource.js** into your project
3. Be sure to register the module "angular-odata-service" in your module definition : 
```javascript
var myApp = angular.module('myApp',['angular-odata-service']);
```

## Configuration
### setRoutePrefix
Sets the prefix that will be appended before all odata requests. For example:
```js
myApp.config(function (odataProvider) {
  odataProvider
    .setPrefix('http://services.odata.org/V3/Northwind/Northwind.svc');
});
```
### setNamespace
Sets the namespace that will be used for calling OData actions and functions.
```js
myApp.config(function (odataProvider) {
  odataProvider
    .setNamespace('NorthwindModel');
});
```

## Usage Examples

### Getting entities
For example the query below will generate this http GET request: **http://services.odata.org/V3/Northwind/Northwind.svc/Products?$filter=UnitsInStock+gt+20&$orderby=ReorderLevel&$select=ProductName,UnitsInStock&$top=10**
```js
myApp.controller("myCtrl", function (odata) {
    odata.get("Products",
        {
            select: "ProductName,UnitsInStock",
            filter: "UnitsInStock gt 20",
            orderBy: "ReorderLevel",
            top: 10
        });
});
```
### Getting entity by it's key

```js
myApp.controller("myCtrl", function (odata) {
    odata.getById("Products",1);
});
```
*Note that entity key might be:*
* Number e.g. 1
* String e.g. "first"
* Composite key e.g { KeyPart1: 1, KeyPart2:"two", ...}

### Other supported methods

**POST, PUT, PATCH, DELETE**

### Action and Function

In OData *Context*, *Collections* or *Entities* might also have actions and functions. These are bassically HTTP POST or GET. The action or function name is preffixed by namespace if supplied in configuration.

```js
action(actionName, data, entity?, key?)

function(functionName, entity?, key?)
```

*Ommit the key parameter to call a action or function on collection*

*Ommit the key parameter and entity to call a action or function on context*


## Contributions
Contributions and feedback welcomed!