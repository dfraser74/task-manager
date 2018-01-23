import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import tasksReducer from './tasks';
import listsReducer from './lists';
import userReducer from './user';
import usersReducer from './users';
import messagesReducer from './messages';


export default {
  auth: authReducer,
  lists: listsReducer,
  messages: messagesReducer,
  routing: routerReducer,
  tasks: tasksReducer,
  user: userReducer,
  users: usersReducer,
};
