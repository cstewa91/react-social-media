import firebase from 'firebase/app'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBR-Q4O6ctfHqrElIuPUiShL5A3BluFZcI",
    authDomain: "campus-life-5a23a.firebaseapp.com",
    databaseURL: "https://campus-life-5a23a.firebaseio.com",
    projectId: "campus-life-5a23a",
    storageBucket: "campus-life-5a23a.appspot.com",
    messagingSenderId: "495981689834",
    appId: "1:495981689834:web:7ac2391c3c6b25ca809093",
    measurementId: "G-VXGCN2MG6G"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  export default firebase