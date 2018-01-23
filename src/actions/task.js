import uuid from 'uuid/v4';
import * as firebase from 'src/firebase'


export const Types = {
  ADD_TASK: 'task/ADD_TASK',
  ADD_TASK_ROLLBACK: 'task/ADD_TASK_ROLLBACK',
  ADD_TASK_MESSAGE: 'task/ADD_TASK_MESSAGE',
  COMPLETE: 'task/COMPLETE',
  COMPLETE_ROLLBACK: 'task/COMPLETE_ROLLBACK',
  SET_ALL: 'task/task/SET_ALL',
  UPDATE: 'task/task/UPDATE',
  REMOVE_SHARED_WITH: 'task/task/REMOVE_SHARED_WITH',
} 


const addTask = ({ title, date }) => dispatch => {
  const payload = {
    id: uuid(),
    title,
    date: new Date(Date.parse(date)).toISOString(),
    list: null,
  };

  dispatch({
    type: Types.ADD_TASK,
    payload,
  })

  setTimeout(() => {
    dispatch({
      type: Types.ADD_TASK_MESSAGE,
      payload,
    })
  }, 500)

  firebase.addTask({
    ...payload,
    user: null,
    done: false,
  })
}

const complete = (taskId) => ({
  type: Types.COMPLETE,
  payload: { taskId },
});

const setAll = (tasks) => ({
  type: Types.SET_ALL,
  payload: tasks,
});

const update = (task) => ({
  type: Types.UPDATE,
  payload: task,
});

const removeShareWith = ({ taskId, userId}) => ({
  type: Types.REMOVE_SHARED_WITH,
  payload: { taskId, userId }
});


export default {
  addTask,
  complete,
  setAll,
  update,
  removeShareWith,
}