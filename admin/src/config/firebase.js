import firebase from 'firebase/app'

import "firebase/database";

let config = {
  apiKey: "AIzaSyDJornBeBAtFte4vWOybChBhew62cm9Cnc",
  authDomain: "reactjs-meetup-d1038.firebaseio.com",
  databaseURL: "https://reactjs-meetup-d1038.firebaseio.com/",
  projectId: "reactjs-meetup-d1038",
  storageBucket: "reactjs-meetup-d1038.firebaseio.com", 
};

firebase.initializeApp(config);

export default firebase.database();