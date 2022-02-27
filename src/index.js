import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    updateDoc,
    serverTimestamp

} from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDbMRZTrhaj6JJDXpsaqPz0j1zozB1F_14",
    authDomain: "fir-basics-443fa.firebaseapp.com",
    projectId: "fir-basics-443fa",
    storageBucket: "fir-basics-443fa.appspot.com",
    messagingSenderId: "248881179021",
    appId: "1:248881179021:web:d7e3708d8ffaf797f875c4"
};

// Init App
initializeApp(firebaseConfig);
const auth = getAuth();


// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books');

// Queires
// const q = query(colRef, where("author", "==", "sadsad"), orderBy('title', 'asc'));
const q = query(colRef, orderBy('createdAt'));

// get collection data
// getDocs(colRef).then((snapshot) => {
//     // console.log(snapshot.docs);

//     let books = [];
//     snapshot.docs.forEach((doc) => {
//         books.push({ id: doc.id, ...doc.data() })
//     })
//     console.log('----- the/catch Version -----')
//     console.log(books)
// }).catch(err => {
//     console.error(err)
// })

// My async version because its nicer than .then & catch
// const getAllDocs = async (colRef) => {

//     let books = [];
//     try {
//         const results = await getDocs(colRef);
//         results.docs.forEach((doc) => {
//             books.push({ id: doc.id, ...doc.data() })
//         })
//         console.log('----- Async Version -----')
//         console.log(books)
//     } catch (err) {
//         console.error(err)
//     }
// }

// getAllDocs(colRef);

//Everytime there is a change to the records
onSnapshot(q, async (snapshot) => {

    let books = [];
    try {
        const results = await getDocs(colRef);
        results.docs.forEach((doc) => {
            books.push({ id: doc.id, ...doc.data() })
        })
        console.log('----- Async onSnapshot Version -----')
        console.log(books)
    } catch (err) {
        console.error(err)
    }

})

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    //   addDoc(colRef, {
    //     title: addBookForm.title.value,
    //     author: addBookForm.author.value,
    //   })
    //   .then(() => {
    //     addBookForm.reset()
    //   })
    console.log('----- Async addDoc Version -----')
    try {
        console.log('Added book', addBookForm.title.value, addBookForm.author.value)
        const res = await addDoc(colRef, {
            title: addBookForm.title.value,
            author: addBookForm.author.value,
            createdAt: serverTimestamp()
        })
        addBookForm.reset()
    } catch (err) {
        console.log(err);
    }

})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // This is not right!
    if (deleteBookForm.id.value.length !== 20) {
        e.stopPropagation();
        // console.log(deleteBookForm.id.value.length);
        deleteBookForm.querySelector('.invalid-feedback').style.display = "block"

    }

    // gte books id value from form
    const docRef = doc(db, 'books', deleteBookForm.id.value)

    // deleteDoc(docRef)
    //     .then(() => {
    //         deleteBookForm.reset()
    //     })
    console.log('----- Async deleteDoc Version -----')
    try {
        // deleteDoc doesn't return anything!
        console.log('Deletng book:', deleteBookForm.id.value)
        const res = await deleteDoc(docRef)
        console.log(res)
        deleteBookForm.reset()
    } catch (err) {
        console.err(err)
    };
})

// get a document

const docRef = doc(db, 'books', '54fdlEbMmpQMW5jg78S0');

// get a specific document
// getDoc(docRef)
//     .then((doc) => {
//         console.log(doc.data(), doc.id);
//     })

// listen to a soecific document ebytime it chnages
onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id);
})

// listen to a soecific document ebytime it chnages
onSnapshot(colRef, (docs) => {
    console.log(docs);
    const div = document.getElementById('data');
    div.innerHTML = "";
    docs.forEach((doc) => {
        console.log(doc.data());
        div.innerHTML = div.innerHTML + '<code>' + JSON.stringify(doc.data()) + '</code> <br />'
    })
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let docRef = doc(db, 'books', updateForm.id.value)

    updateDoc(docRef, {
        title: 'updated title' + Math.random()
    })
        .then(() => {
            updateForm.reset()
            console.log('updated');
        })
})


// signing users up
// createUserWithEmailAndPassword
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log('user created:', cred.user)
            signupForm.reset()
        })
        .catch(err => {
            console.log(err.message)
        })
})

// Logout user
const logoutButton = document.querySelector('.logout')
// const logoutButton = document.getElementById('logout')
logoutButton.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(auth);
    signOut(auth)
        .then(() => {
            console.log('user signed out');
            console.log(auth)
        })
        .catch((err) => console.error(err.message))
})
// Login
const loginButton = document.querySelector('.login')
loginButton.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('here');

    const email = loginButton.email.value
    const password = loginButton.password.value
    // email@email2.com
    //     password
    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user logged in ', cred.user);
        })
        .catch((err) => console.log(err.message))
})

/*
UserImpl {providerId: 'firebase', proactiveRefresh: ProactiveRefresh, reloadUserInfo: {…}, reloadListener: null, uid: 'GVAwWpqxJjNvdemVe1rMrgQ3zbA3', …}
accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNmNWQ4ZTc0ZjNjNDg2ZWU1MDNkNWVlYzkzYTEwMWM2NGJhY2Y3ZGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyLWJhc2ljcy00NDNmYSIsImF1ZCI6ImZpci1iYXNpY3MtNDQzZmEiLCJhdXRoX3RpbWUiOjE2NDU5NjM1MzIsInVzZXJfaWQiOiJHVkF3V3BxeEpqTnZkZW1WZTFyTXJnUTN6YkEzIiwic3ViIjoiR1ZBd1dwcXhKak52ZGVtVmUxck1yZ1EzemJBMyIsImlhdCI6MTY0NTk2MzUzMiwiZXhwIjoxNjQ1OTY3MTMyLCJlbWFpbCI6InNvbWVAZW1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNvbWVAZW1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.mDjhEycWecgDV3QhNxDcwztpkEO-ELOWIeEtgmp3AdfYAEH8ffhQcS4G_2lpgLfAQ7jAhIzbgA7rYUAUB8NM-RmgfoLOZAcuHHqzxs9_OGp4dnOy9Z2hveAEsOkiIrGz-mCtn034YUqUk9CP0ZowF2XGU46Iap9qJXDAPiOwbMWfBunkYqS27x9_v9CthtVaBfPBEO8l6VJoRKVbgVs66ot5iqiBeWP2A6upUqRh89P0SpMsTY5uJYUVbA6JYDohPOeyuqyKcGRO4uejOqxD11uaFOudkTj-YA3xDZ-rIu2q0fCy7rNuK3GskDhvWdVoi9a6qSN_wWthQO3xf1Pg_Q"
auth: AuthImpl {app: FirebaseAppImpl, config: {…}, currentUser: UserImpl, emulatorConfig: null, operations: Promise, …}
displayName: null
email: "some@email.com"
emailVerified: false
isAnonymous: false
metadata: UserMetadata {createdAt: '1645963532758', lastLoginAt: '1645963532758', lastSignInTime: 'Sun, 27 Feb 2022 12:05:32 GMT', creationTime: 'Sun, 27 Feb 2022 12:05:32 GMT'}
phoneNumber: null
photoURL: null
proactiveRefresh: ProactiveRefresh {user: UserImpl, isRunning: true, timerId: 311, errorBackoff: 30000}
providerData: [{…}]
providerId: "firebase"
reloadListener: null
reloadUserInfo: {localId: 'GVAwWpqxJjNvdemVe1rMrgQ3zbA3', email: 'some@email.com', passwordHash: 'UkVEQUNURUQ=', emailVerified: false, passwordUpdatedAt: 1645963532758, …}
stsTokenManager: StsTokenManager {refreshToken: 'AIwUaOkYcdw4w544p-CeDHFLWLjL1XPj_ahSAbEU5kt4kAkyX-…JJDukQILOPzJKzMIzGRsqDdqeCVk524FVy8cqaetoQKH4ogtw', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNmNWQ4ZTc0ZjNjNDg2ZW…Z-rIu2q0fCy7rNuK3GskDhvWdVoi9a6qSN_wWthQO3xf1Pg_Q', expirationTime: 1645967132987}
tenantId: null
uid: "GVAwWpqxJjNvdemVe1rMrgQ3zbA3"
refreshToken: (...)
[[Prototype]]: Object
*/