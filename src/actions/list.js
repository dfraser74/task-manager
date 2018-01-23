import uuid from 'uuid/v4';
import * as firebase from 'src/firebase'


export const Types = {
  ADD_GROUP: 'tasks/list/ADD_GROUP',
  SET_ALL: 'tasks/list/SET_ALL',
  UPDATE: 'tasks/list/UPDATE',
  DELETE: 'tasks/list/DELETE',
}


const addList = ({ name, color, user }) => dispatch => {
  const payload = {
    id: uuid(),
    name,
    color,
    date: new Date().toISOString(),
    user,
  }


  dispatch({
    type: Types.ADD_GROUP,
    payload: payload
  })

  firebase.addList({
    ...payload,
    date: new Date(payload.date).getTime(),
  })
}

const setAll = (lists) => ({
  type: Types.SET_ALL,
  payload: lists,
})

const update = (list) => dispatch => {
  dispatch({
    type: Types.UPDATE,
    payload: list,
  });

  firebase.addList({ ...list })

}

const deleteList = (listId) => (dispatch, getState) => {
  debugger
  firebase.removeList(listId, getState().lists[listId].user);

  dispatch({
    type: Types.DELETE,
    payload: { listId },
  });
}


export default {
  addList,
  setAll,
  update,
  deleteList,
}