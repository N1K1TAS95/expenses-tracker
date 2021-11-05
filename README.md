# Expenses Tracker

This is a simple Expenses Tracker made in JavaScript using Vue 3 as Framework and hosted on Firebase.

### Live preview

If you want to use this application without any installation, you can
visit [expenses-tracker.n1k.cloud](https://expenses-tracker.n1k.cloud/). Just make an account and play with it.

### Local preview

In order to use this application on your local machine, you must follow these steps.

##### 1. Go to Firebase Console

You need to go on [Firebase Console](https://console.firebase.google.com/) and sign-in or sign-up (it's free).

##### 2. Create a New Project

1. Give a name to the project and click on "Continue"
2. You can disable Analytics or keep it
3. Wait until project is created
4. Go to Authentication section and enable email Authentication
5. Go to Firestore Database and create a new Database with production rules enabled
6. Then go to Project Overview on the top and click on add web application
7. Give a name to the app, and turn off web hosting settings
8. When it's ready, copy only the firebaseConfig to a temporary file on your pc

##### 3. Create Firebase Config

Under `src` create a new folder `firebase` and a new file (under `firebase`) `config.js` and paste following code:

```javascript
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD819MAi8iM-WQ9YLlp11BQYKq1D5VGfbo",
    authDomain: "expenses-tracker-alt.firebaseapp.com",
    projectId: "expenses-tracker-alt",
    storageBucket: "expenses-tracker-alt.appspot.com",
    messagingSenderId: "686417357959",
    appId: "1:686417357959:web:cb9883acb45f193e189c22"
}

firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {projectAuth, projectFirestore, timestamp}
```
and replace `firebaseConfig` with your `firebaseConfig` from previous step.
