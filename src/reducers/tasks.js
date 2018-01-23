import createReducer from '../utils/createReducer'
import { Types as TypesTask } from '../actions/task'
import omit from 'lodash-es/omit'
import { Types as TypesAuth } from '../actions/auth';


const t = new Date();

const initialState = {
  '1': {
    id: 1,
    title: "Ir al gimnasio",
    done: false,
    date: t.toISOString(),
    doneBy: [],
    sharedWith: [{ id: 22, name: "Cristian" }],
    list: null,
    user: "SrMcKHNGcaSmavhb11OvZf7n1A22",
  },
  '2': {
    id: 2,
    title: "Limpiar el baño",
    done: false,
    date: new Date(t.getFullYear(), t.getMonth(), (t.getDate() - 4), t.getHours(), t.getMinutes(), 0, 0).toISOString(),
    doneBy: [],
    list: null,
    sharedWith: [],
    user: "SrMcKHNGcaSmavhb11OvZf7n1A22",
  },
  '9834ie': {
    id: '9834ie',
    title: "Ir a la compra",
    done: false,
    date: new Date(t.getFullYear(), t.getMonth(), (t.getDate() + 2), t.getHours(), t.getMinutes(), 0, 0).toISOString(),
    doneBy: [],
    list: null,
    sharedWith: [],
    user: "SrMcKHNGcaSmavhb11OvZf7n1A22",
  },
  '3': {
    id: 3,
    title: "Comprar esparragos",
    done: false,
    date: t.toISOString(),
    doneBy: [],
    list: null,
    sharedWith: [],
    user: 2,
  }
};


export default createReducer(initialState, {
  [TypesTask.ADD_TASK]: (state, action) => {
    const { id } = action.payload;
    return {
      ...state,
      [id]: {
        id,
        title: action.payload.title,
        done: false,
        doneBy: [],
        list: null,
        date: action.payload.date,
      }
    }
  },

  [TypesTask.COMPLETE]: (state, action) => {
    const { taskId } = action.payload;
    return {
      ...state,
      [taskId]: {
        ...state[taskId],
        done: true,
      }
    }
  },

  [TypesTask.COMPLETE_ROLLBACK]: (state, action) => {
    const { taskId } = action.payload;
    return {
      ...state,
      [taskId]: {
        ...state[taskId],
        done: false,
      }
    }
  },

  [TypesTask.ADD_TASK_ROLLBACK]: (state, action) => {
    return omit(state, action.payload.id)
  },

  [TypesTask.UPDATE]: (state, action) => {
    const { id } = action.payload;
    return {
      ...state,
      [id]: {
        ...state[id],
        title: action.payload.title,
        done: action.payload.done,
        list: action.payload.list,
        date: action.payload.date,
      }
    };
  },

  [TypesTask.SET_ALL]: (state, action) => ({ ...action.payload }),


  [TypesTask.REMOVE_SHARED_WITH]: (state, action) => {
    const { taskId, userId } = action.payload;
    return {
      ...state,
      [taskId]: {
        ...state[taskId],
        sharedWith: state[taskId].sharedWith.filter(sw => sw.id !== userId),
        doneBy: state[taskId].doneBy.filter(db => db.id !== userId),
      }
    }
  },

  [TypesAuth.AUTH_LOGOUT_USER]: (state, action) => ({
    ...initialState
  }),

})


export const getBetweenDates = (state, startDate, endDate, userId) => {
  return Object.values(state.tasks).filter(task => {
    const taskDate = new Date(task.date).getTime();
    if (task.user != userId) return false;
    return taskDate > startDate && taskDate < endDate
  })
}

export const getByList = (state, listId) => {
  return Object.values(state.tasks).filter(t => t.list == listId)
}

export const getDayTasks = (state, date, userId) => {
  return getBetweenDates(
    state,
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0),
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 0),
    userId,
  )
}

export const getTodayTasks = (state, userId) => {
  return getDayTasks(state, new Date(), userId)
}

export const getWeekTasks = (state, userId) => {
  const t = new Date();
  const firstDayOffWeek = t.getDate() - (t.getDay() - 1)
  const lastDayOffWeek = firstDayOffWeek + 6;

  return getBetweenDates(
    state,
    new Date(t.getFullYear(), t.getMonth(), firstDayOffWeek, 0, 0, 0, 0),
    new Date(t.getFullYear(), t.getMonth(), lastDayOffWeek, 23, 59, 59, 0),
    userId,
  )
}

export const getMonthTasks = (state) => {
  const t = new Date();
  return getBetweenDates(
    state,
    new Date(t.getFullYear(), t.getMonth(), 1, 0, 0, 0, 0),
    new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59, 0),
  )
}

//excludeded Today
export const getPendingTasks = (state, userId) => {
  return Object.values(state.tasks).filter(task => {
    if (task.user != userId) return false;
    return task.done === false && !isTodayTask(task)
  })
}

const isTodayTask = (t) => {
  const d = new Date();
  const td = new Date(t.date);
  return d.getDate() === td.getDate() && d.getMonth() === td.getMonth() && d.getFullYear() === td.getFullYear()
}