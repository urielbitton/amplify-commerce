import firebase from "firebase"
 
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCJzkhdvPw-MioSPiFEdGl9FGr03L4TumI",
  authDomain: "amplify-commerce.firebaseapp.com",
  projectId: "amplify-commerce",
  storageBucket: "amplify-commerce.appspot.com",
  messagingSenderId: "626144653955",
  appId: "1:626144653955:web:a9913ae64bcd39a72b21b6"
})

const db = firebaseApp.firestore()
const Fire = firebaseApp

export { db, Fire } 
