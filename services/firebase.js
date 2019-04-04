import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBnvCbccfn-lJcLX4pnX0vWuNPrXiDkGm0",
    authDomain: "nuxt-e3fe4.firebaseapp.com",
    databaseURL: "https://nuxt-e3fe4.firebaseio.com",
    projectId: "nuxt-e3fe4",
    storageBucket: "nuxt-e3fe4.appspot.com",
    messagingSenderId: "276277678827"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
const db = firebase.firestore()
export default firebase
export {
    db
}