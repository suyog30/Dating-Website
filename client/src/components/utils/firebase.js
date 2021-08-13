import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBPZ-7wlV5P6fwz-JgMGJfcMpK_bsiuC6A",
    authDomain: "dating-react-project.firebaseapp.com",
    projectId: "dating-react-project",
    storageBucket: "dating-react-project.appspot.com",
    messagingSenderId: "632170596416",
    appId: "1:632170596416:web:d231594a88e8b1e37937a5"
  };


  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default };