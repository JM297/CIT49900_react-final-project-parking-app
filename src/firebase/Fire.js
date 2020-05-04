import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrlkf2EIkZP2HxxJ6s4SKGJDt2im6m5QA",
    authDomain: "cit49900-final-project-acef5.firebaseapp.com",
    databaseURL: "https://cit49900-final-project-acef5.firebaseio.com",
    projectId: "cit49900-final-project-acef5",
    storageBucket: "cit49900-final-project-acef5.appspot.com",
    messagingSenderId: "807396092696",
    appId: "1:807396092696:web:08c6fa09b945314e6c0c6d"
  };

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;