import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCkG6WOxgthg61g8YesxIon7Tpk3YYLM-8',
  authDomain: 'react-slack-clone-ffb85.firebaseapp.com',
  databaseURL: 'https://react-slack-clone-ffb85.firebaseio.com',
  projectId: 'react-slack-clone-ffb85',
  storageBucket: 'react-slack-clone-ffb85.appspot.com',
  messagingSenderId: '474590198786',
  appId: '1:474590198786:web:fe410f2991f7dd63917b1b',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
