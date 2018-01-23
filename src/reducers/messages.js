import createReducer from '../utils/createReducer'
import { Types as TypesTask } from '../actions/task'
import { Types as TypesMessage } from '../actions/message'


const initialState = {
  messages: [],
  showing: false,
};


export default createReducer(initialState, {
  [TypesTask.ADD_TASK_MESSAGE]: (state, action) => {
    return {
      showing: true,
      messages: [{
        title: "Task added",
        action: {
          title: "Undo",
          type: TypesTask.ADD_TASK_ROLLBACK,
          payload: action.payload,
        }
      }]
    }
  },

  [TypesTask.COMPLETE]: (state, action) => {
    return {
      showing: true,
      messages: [{
        title: "Task completed",
        action: {
          title: "Undo",
          type: TypesTask.COMPLETE_ROLLBACK,
          payload: action.payload,
        } 
      }]
    }
  },

  [TypesMessage.HIDE_MESSAGE]: (state, action) => ({
    showing: false,
    messages: [],
  }),
})


export const getLastMessage = (state) => {
  console.log(state)
  if (state.messages.messages.length) {
    return state.messages.messages[0]
  }
  return {
    title: "",
    action: "",
  }
}