import Firebase from 'firebase'
import keyBy from 'lodash-es/keyBy'


const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};


let firebase = Firebase.initializeApp(config)
let database = firebase.database();


export const createUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user)
    }).catch(function (error) {
      // Handle Errors here.
      console.log(error)
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

export const authenticate = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
    window.localStorage.setItem(STORAGE_KEY, user.uid)
    return user;
  })
}

export const STORAGE_KEY = 'FIREBASE_USER_ID';


firebase.auth().onAuthStateChanged(user => {
  if (user) {
    window.localStorage.setItem(STORAGE_KEY, user.uid);
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
});

export const isAuthenticated = () => {
  return firebase.auth().currentUser || !!localStorage.getItem(STORAGE_KEY);
}

export const getUserId = () => {
  return firebase.auth().currentUser.uid || localStorage.getItem(STORAGE_KEY);
}


export const getAllTasks = (cv) => {
  const userId = getUserId();

  if (!userId) return
  if (typeof cv !== "function") return;

  database.ref(`tasks/${userId}`).once('value', snapshot => {
    if (!snapshot.val()) return;
    const tasks = Object.values(snapshot.val()).map(task => ({
      id: task.id,
      title: task.title,
      done: task.done,
      date: new Date(task.date).toISOString(),
      list: task.list,
      user: task.user,
      doneBy: task.doneBy || [],
    }))
    cv(keyBy(tasks, 'id'));
  });
}

export const addTask = ({ id, title, done, date, list, user, doneBy }) => {
  database.ref(`tasks/${user}/${id}`).set({
    id,
    title,
    done,
    date: date ? new Date(date).getTime() : new Date().getTime(),
    list,
    user,
    doneBy,
  });
}

export function removeTask(taskId, userId) {
  database.ref(`tasks/${userId}/${taskId}`).remove()
}

export const getAllLists = (cv) => {
  const userId = getUserId();

  if (!userId) return  
  if (typeof cv !== "function") return;

  database.ref(`lists/${userId}`).once('value', snapshot => {
    if (!snapshot.val()) return;    
    const lists = Object.values(snapshot.val()).map(list => ({
      id: list.id,
      name: list.name,
      color: list.color,
      icon: list.icon,
      user: list.user,
    }))
    
    cv(keyBy(lists, 'id'));
  });
}

export const addList = ({ id, name, color, icon, date, user }) => {
  database.ref(`lists/${user}/${id}`).set({
    id,
    name,
    color: color || null,
    date: date ? new Date(date).getTime() : new Date().getTime(),
    user
  });
}

export const onListChange = () => {
  // database.ref('lists').on('child_changed')
}


export function removeList(listId, userId) {
  database.ref(`lists/${userId}/${listId}`).remove()
}