import { Types as TypesAuth } from 'src/actions/auth'
import createReducer from '../utils/createReducer'


const initialState = {
  name: "Cristian Gámez",
  email: "c.gamezinfantes@gmail.com",
  id: 1,
};

export default createReducer(initialState, {
  [TypesAuth.AUTH_LOGIN_USER_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload.user,
  }),

  [TypesAuth.AUTH_LOGOUT_USER]: (state, action) => ({
    ...initialState
  }),
})

