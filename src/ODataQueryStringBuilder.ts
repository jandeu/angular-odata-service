module odata {
    interface IKeyValuePair<K, V> {
        key: K;
        value: V;
    }

    export class QueryStringBuilder {
        private _parts: IKeyValuePair<string, string>[];

        constructor(odataQueryOptions?: odata.IQueryOptions) {
            this._parts = [];
            if (odataQueryOptions) {
                this.add("$select", odataQueryOptions.select);
                this.add("$expand", odataQueryOptions.expand);
                this.add("$filter", odataQueryOptions.filter);
                this.add("$orderby", odataQueryOptions.orderBy);
                this.add("$count", odataQueryOptions.count);
                this.add("$top", odataQueryOptions.top);
                this.add("$skip", odataQueryOptions.skip);
                if (odataQueryOptions.custom) {
                    for (var key in odataQueryOptions.custom) {
                        var value = odataQueryOptions.custom[key];
                        if (!value)
                            continue;
                        //TODO: Do not stringify if not necessary
                        value = encodeURIComponent(JSON.stringify(value));
                        this.add(key.toLowerCase(), value);
                    }
                }
            }
        }



        /*Adds value to query string or discards it if its empty, or overrides existing key*/
        add(key: string, value: any): QueryStringBuilder {
            if (this.isNullOrEmpty(key)) {
                return;
            }
            this._parts.push({ key: key, value: encodeURIComponent(value) });
            return this;
        }

        /*Builds the query string, same as toString*/
        build(): string {
            var stringPairs = [];
            angular.forEach(this._parts, (i) => {
                var part = i.key + "=" + i.value;
                stringPairs.push(part);
            });
            return stringPairs.join("&");
        }

        /*Returns the builded query string*/
        toString() {
            return this.build();
        }

        private isNullOrEmpty(str: string): boolean {
            if (!str)
                return true;
            if (str === "")
                return true;
            return false;
        }
    }
}