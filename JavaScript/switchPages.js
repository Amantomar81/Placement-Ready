var signup = document.getElementById('signup');
var signin = document.getElementById('signin');
var btn = document.getElementById('btn');

function register() {
    // signin.style.left = "-2000px";
    signin.style.left = "-100px";
    signup.style.left = "15%";
    btn.style.left = "50%";
    signin.style.visibility = "hidden";
    signup.style.visibility = "visible";
}

function login() {
    signin.style.left = "15%";
    signup.style.left = "100px";
    btn.style.left = "0";
    signup.style.visibility = "hidden";
    signin.style.visibility = "visible";
}