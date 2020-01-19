import * as firebase from 'firebase';

import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} from "react-native-dotenv"

import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

console.log(firebaseConfig)

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();