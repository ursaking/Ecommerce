import { AUTH_LOGOUT, AUTH_ERROR, AUTH_GET_PERMISSIONS} from 'react-admin';
import React from "react";

export default (type, params) => {

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        //localStorage.removeItem('role');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        if (type === AUTH_ERROR) {
            const status = params.status;
            if (status === 401 || status === 403) {
                localStorage.removeItem('token');
                return Promise.reject();
            }
            return Promise.resolve();
        }
    }
    if (type === AUTH_GET_PERMISSIONS) {
        //const role = localStorage.getItem('role');
        //return role ? Promise.resolve(role) : Promise.reject();
    }
    return Promise.reject('Unknown method');
};
