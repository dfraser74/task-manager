import createReducer from '../utils/createReducer'
import { Types as TypesList } from '../actions/list'
import { Types as TypesAuth } from '../actions/auth';
import omit from 'lodash-es/omit'


const initialState = {
  // '1': {
  //   id: 1,
  //   name: "Sport",
  //   color: "#e53935",
  //   icon: null,
  // },
};

export default createReducer(initialState, {
  [TypesList.ADD_GROUP]: (state, action) => {
    const { id } = action.payload;
    return {
      ...state,
      [id]: {
        id,
        name: action.payload.name,
        color: action.payload.color,
        icon: null,
      }
    }
  },
  [TypesList.SET_ALL]: (state, action) => ({ ...action.payload }),
  
  [TypesList.UPDATE]: (state, action) => {
    const { id } = action.payload;
    return {
      ...state,
      [id]: {
        ...state[id],
        name: action.payload.name,
        color: action.payload.color,
        icon: action.payload.icon,
      }
    };
  },

  [TypesList.DELETE]: (state, action) => omit(state, action.payload.listId),

  [TypesAuth.AUTH_LOGOUT_USER]: (state, action) => ({
    ...initialState
  }),
})

export const getListById = (state, listId) => {
  if (!state.lists[listId])
    console.warn(`list ${listId} not found`)

  return state.lists[listId]
}