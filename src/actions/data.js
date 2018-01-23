import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { DATA_FETCH_PROTECTED_DATA_REQUEST, DATA_RECEIVE_PROTECTED_DATA } from '../constants';
import authActions from './auth';


export function dataReceiveProtectedData(data) {
    return {
        type: DATA_RECEIVE_PROTECTED_DATA,
        payload: {
            data
        }
    };
}

export function dataFetchProtectedDataRequest() {
    return {
        type: DATA_FETCH_PROTECTED_DATA_REQUEST
    };
}

export function dataFetchProtectedData(token) {
    return (dispatch, state) => {
        dispatch(dataFetchProtectedDataRequest());
        return fetch(`${SERVER_URL}/api/v1/getdata/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(dataReceiveProtectedData(response.data));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authActions.authLoginUserFailure(401, data.non_field_errors[0]));
                        dispatch(push('/login'));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authActions.authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authActions.authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                dispatch(push('/login'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}