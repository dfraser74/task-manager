import createReducer from '../utils/createReducer'
import { Types as TypesAuth } from '../actions/auth';
import avatarFa from '../containers/Home/components/Drawer/avatar.jpg'


const initialState = {
  2: {
    id: 2,
    name: "Fátima",
    email: "fatima@mail.fake",
    avatar: avatarFa,
    sharedTasks: []
  }
};

export default createReducer(initialState, {
  [TypesAuth.AUTH_LOGOUT_USER]: (state, action) => ({
    ...initialState
  }),
})


export const getUsers = (state) => {
  return Object.values(state.users)
}


