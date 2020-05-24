import {fetchUtils } from 'react-admin';
import postgrestRestProvider from '@raphiniert/ra-data-postgrest';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({
            Accept: 'application/json'

        });
    }
    options.headers.set('Content-Type', `application/json`);
    options.headers.delete('Accept');
    //options.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIn0.3A2jpw13TlmuH80aA___QiJQU05A2E_uTYabLv5euQ4`);
    return fetchUtils.fetchJson(url, options);
};


const dataProvider = postgrestRestProvider("http://localhost:3030", httpClient);

const myDataProvider = {
    ...dataProvider,
    getManyOr: function (resource, params) {
        let prop;
        let queryparam;
        let queryValues = [];

        for (prop in params) {
            if (params.hasOwnProperty(prop)) {
                let key = prop;
                let valueArray = params[key];
                for (queryparam in valueArray) {
                    let queryString = key + ".eq." + valueArray[queryparam];
                    queryValues.push(queryString);
                }
            }
        }
        let queryids = queryValues.join(",");
        let queerystring = (!queryids) ? "id=eq.-1" : "or=(" + queryids + ")";

        let url = "http://localhost:3030" + "/" + resource + "?" + queerystring;
        return httpClient(url).then(function (_a) {
            var json = _a.json;
            return ({ data: json });
        });
    },
};


export default myDataProvider
