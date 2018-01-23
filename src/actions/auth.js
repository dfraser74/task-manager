import { replace } from 'react-router-redux';
import * as firebase from '../firebase';
import ListActions from './list';


export const Types = {
  AUTH_LOGIN_USER_REQUEST: 'tasks/auth/AUTH_LOGIN_USER_REQUEST',
  AUTH_LOGIN_USER_FAILURE: 'tasks/auth/AUTH_LOGIN_USER_FAILURE',
  AUTH_LOGIN_USER_SUCCESS: 'tasks/auth/AUTH_LOGIN_USER_SUCCESS',
  AUTH_LOGOUT_USER: 'tasks/auth/AUTH_LOGOUT_USER',
}


const authLoginUserSuccess = (token, user) => ({
  type: Types.AUTH_LOGIN_USER_SUCCESS,
  payload: {
    token,
    user
  }
})

const authLoginUserFailure = (error, message) => ({
  type: Types.AUTH_LOGIN_USER_FAILURE,
  payload: {
    status: error,
    statusText: message
  }
})

const authLoginUserRequest = () => ({
  type: Types.AUTH_LOGIN_USER_REQUEST
});

const authLogout = () => ({
  type: Types.AUTH_LOGOUT_USER
})

const authLogoutAndRedirect = () => (dispatch, state) => {
  dispatch(authLogout());
  dispatch(replace('/login'));
}

const doLogin = (email, password, redirect = '/') => dispatch => {
  dispatch(authLoginUserRequest());
  firebase.authenticate(email, password)
    .then(user => {
      dispatch(authLoginUserSuccess("rer", { 
        email: user.email,
        id: user.uid,
        avatar: user.photoURL,
        displayName: user.displayName,
        lastLoginAt: user.lastLoginAt,
      }))

      firebase.getAllLists(lists => {
        dispatch(ListActions.setAll(lists)) 
      });
      
      dispatch(replace("/"));
    })
    .catch((error) => {
      debugger
      dispatch(authLoginUserFailure());
    });
};


export default {
  authLoginUserSuccess,
  authLoginUserFailure,
  authLoginUserRequest,
  authLogout,
  authLogoutAndRedirect,
  doLogin,
}