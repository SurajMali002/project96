import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyAztekZ8cZCpe2SmEKmNCf99s04fiLCIWQ",
    authDomain: "new-project-app-25986.firebaseapp.com",
    projectId: "new-project-app-25986",
    storageBucket: "new-project-app-25986.appspot.com",
    messagingSenderId: "981468325962",
    appId: "1:981468325962:web:62c65311f205ec846ddeb3"
};

firebase.initializeApp(firebaseConfig)
export default firebase.firestore()