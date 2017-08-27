import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDt3MjL7GDMZsW7alTKVLG8qPSoguszMxY",
  authDomain: 'neighborhood-1ce72.firebaseapp.com',
  databaseURL: "https://neighborhood-1ce72.firebaseio.com",
}

firebase.initializeApp(firebaseConfig);

export const ref = firebase.database().ref();
export let provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('public_profile');
provider.addScope('email');

export const auth = firebase.auth();

export default firebase;