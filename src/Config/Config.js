import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
const config = {
    // apiKey: "AIzaSyB8CB9NLa1vbsREct9x7r2QWNzl0fXx3YA",
    // authDomain: "apparelbase-76671.firebaseapp.com",
    // projectId: "apparelbase-76671",
    // storageBucket: "apparelbase-76671.appspot.com",
    // messagingSenderId: "101281494605",
    // appId: "1:101281494605:web:acb62d132a8456585d8e04",
    // measurementId: "G-S25VVVM4TB"
    apiKey: "AIzaSyDG8_Lz9ggCm-gA1UM6TftJoSnTX7m-NWw",
    authDomain: "revelationapp-390bd.firebaseapp.com",
    databaseURL: "https://revelationapp-390bd-default-rtdb.firebaseio.com",
    projectId: "revelationapp-390bd",
    storageBucket: "revelationapp-390bd.appspot.com",
    messagingSenderId: "465444417647",
    appId: "1:465444417647:web:d4d93f9638925eab26dd9a"
};


const fire = firebase.initializeApp(config);
export const storage  = fire.storage();
export const db = fire.firestore();
export const auth = fire.auth()

export default fire;
