import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'react-admin';
import {stringify} from 'query-string';

const API_URL = "http://localhost:8000/admin";


/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {
    switch (type) {
        case GET_LIST: {
            let query = {
                token: localStorage.getItem('token'),
            };
            return {url: `${API_URL}/${resource}?${stringify(query)}`};
        }
            ;
        case GET_ONE:
            let token = {
                token: localStorage.getItem('token'),
            };
            return {url: `${API_URL}/${resource}/${params.id}?${stringify(token)}`};
        case GET_MANY: {
            const query = {
                filter: JSON.stringify({id: params.ids}),
            };
            return {url: `${API_URL}/${resource}?${stringify(query)}`};
        }
            ;
        case GET_MANY_REFERENCE: {
            const query = {
                sort: 10,
            };
            return {url: `${API_URL}/${resource}?${stringify(query)}`};
        }
            ;
        case UPDATE:
            let query2 = {
                token: localStorage.getItem('token'),
            };
            return {
                url: `${API_URL}/${resource}/${params.id}?${stringify(query2)}`,
                options: {
                    method: 'PUT',
                    body: JSON.stringify(params.data)
                },
            };
        case CREATE:
            const query3 = {
                token: localStorage.getItem('token'),
            };
            return {
                url: `${API_URL}/${resource}?${stringify(query3)}`,
                options: {
                    method: 'POST',
                    body: JSON.stringify(params.data)
                },
            };
        case DELETE:
            const query4 = {
                token: localStorage.getItem('token'),
            };
            return {
                url: `${API_URL}/${resource}/${params.id}?${stringify(query4)}`,
                options: {
                    method: 'DELETE'
                },
            };
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    const {headers, json} = response;
    switch (type) {
        case GET_LIST:
            return {
                data: json.map(x => x),
                total: 30,
                // total: parseInt(headers.get('content-range').split('/').pop(), 10),
            };
        case CREATE:
            return {data: {...params.data, id: json.id}};
        default:
            return {data: json};
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
    const {fetchJson} = fetchUtils;
    const {url, options} = convertDataProviderRequestToHTTP(type, resource, params);
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};