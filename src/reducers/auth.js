import { Types as TypesAuthentication} from '../actions/auth';
import createReducer from '../utils/createReducer'


const initialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
};

export default createReducer(initialState, {
  [TypesAuthentication.AUTH_LOGIN_USER_REQUEST](state, action) {
    return Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null
    });
  },
  
  [TypesAuthentication.AUTH_LOGIN_USER_SUCCESS](state, action) {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      token: action.payload.token,
      userName: action.payload.user.email,
    });
  },

  [TypesAuthentication.AUTH_LOGIN_USER_FAILURE](state, action) {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      userName: null,
    });
  },

  [TypesAuthentication.AUTH_LOGOUT_USER](state, action) {
    return Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      userName: null,
    });
  },
})

