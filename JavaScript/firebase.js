import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, get, ref, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBH85DruaqawUkvjzUXoXaKhU4CwOOj2nw",
    authDomain: "placementready-login.firebaseapp.com",
    databaseURL: "https://placementready-login-default-rtdb.firebaseio.com",
    projectId: "placementready-login",
    storageBucket: "placementready-login.appspot.com",
    messagingSenderId: "427228986257",
    appId: "1:427228986257:web:c5dba3d9fcde626ad17830"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


var signup = document.getElementById('register');
signup.addEventListener('click', (e) => {
    var email = document.getElementById('regemail').value;
    var password = document.getElementById('regpassword').value;
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let mobile = document.getElementById('mobile').value;
    console.log(mobile);


    if (validate_email(email) == false) {
        alert('Email is not valid');
        return;
    }
    if (validate_password(password) == false) {
        alert('Password is not valid');
        return;
    }
    // if (validate_fields(fname) == false) {
    //     alert('First name cannot be empty');
    //     return;
    // }
    // if (validate_fields(lname) == false) {
    //     alert('Last name cannot be empty');
    //     return;
    // }
    if (validate_fields(fname) == false) {
        return;
    }
    if (validate_fields(lname) == false) {
        return;
    }
    if (validate_mobile(mobile) == false) {
        return;
    }



    createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        const user = userCredentials.user;

        set(ref(database, 'user/' + user.uid), {
            email: email,
            fname: fname,
            lname: lname,
            conatct_no: mobile,
            last_login: Date.now()
        });
        document.getElementById('regemail').value = "";
        document.getElementById('regpassword').value = "";
        document.getElementById('fname').value = "";
        document.getElementById('lname').value = "";
        document.getElementById('mobile').value = "";

        alert('user created');
    }).catch((error) => {
        const errCode = error.code;
        const message = error.message;
        alert(message);
    })


})



var login = document.getElementById('login');
login.addEventListener('click', (e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        const user = userCredentials.user;

        update(ref(database, 'users/' + user.uid), {
            last_login: Date.now()
        })

        // var login_container = document.getElementById('content-container');
        // login_container.style.left = `2500px`;
        window.location.assign('./HTML/main_companies.html');
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        alert('logged in successfully');


    }).catch((error) => {
        const errCode = error.code;
        const errMessage = error.message;
        alert(errMessage);
    })

});

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});



// var logout = document.getElementById('logout');
// logout.addEventListener('click', (e) => {
//     signOut(auth).then(() => {
//         window.location.assign('../index.html');
//         alert('user logged out');
//     }).catch((error) => {
//         const errCode = error.code;
//         const errMessage = error.message;
//         alert(errMessage);
//     });
// });



function validate_email(email) {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
        return true;
    } else {
        return false;
    }
}

function validate_password(password) {
    if (password.length < 6) {
        return false;
    } else {
        return true;
    }
}

function validate_fields(field) {
    if (field == null) {
        alert('name cannot be empty');
        return false;
    }

    if (field.length <= 0) {
        alert('name cannot be empty');
        return false;
    } else {
        // return true;
        let expression = /^[A-Za-z]+$/;
        if (expression.test(field) == true) {
            return true;
        } else {
            alert('only letter are allowed in name');
            return false;
        }
    }
}

function validate_mobile(mobile) {
    if (mobile == null) {
        alert('contact no. cannot be empty');
        return;
    }
    if (mobile.length <= 0) {
        alert('contact no. cannot be empty');
        return;
    } else {
        let expression = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        if (expression.test(mobile) == true) {
            return true;
        } else {
            alert('invalid contact no.');
            return false;
        }
    }
}

// var signinGoogle = document.getElementById('signinwithgoogle');
// signinGoogle.addEventListener('click', (e) => {
//     const googleProvider = new auth.googleAuthProvider();
//     auth.signInWithPop(googleProvider).then(() => {
//         window.location.assign('./HTML/main');
//     }).catch((error) => {
//         const errCode = error.code;
//         const errMessage = error.message;
//         alert(errMessage);
//     })
// })