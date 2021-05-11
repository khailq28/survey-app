import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions"; // for cloud functions

const firebaseConfig = {
    apiKey: "AIzaSyDJ_rZW7LPCs05JFy2JF2Y3CpX94LVC8_Q",
    authDomain: "survey-app-clone.firebaseapp.com",
    projectId: "survey-app-clone",
    storageBucket: "survey-app-clone.appspot.com",
    messagingSenderId: "881951911954",
    appId: "1:881951911954:web:17667f38176325e61628cb",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
