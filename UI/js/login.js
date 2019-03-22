document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#email").onkeyup = () => {
        if(emailIsValie(document.querySelector("#email").value)) {
            document.querySelector(".form").style.borderBottom = "2px solid green";
        } else {
            document.querySelector(".form").style.borderBottom = "2px solid red";
        }
    };                                                                                                                                                      

    document.querySelector("#password").onkeyup = () => {
        if(checkPass(document.querySelector("#password").value)) {                                             
            document.querySelector("#password").style.borderBottom = "2px solid green"; 
        } else {
            document.querySelector("#password").style.borderBottom = "2px solid red";
        }
    };
    
    const emailIsValie = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    

    const checkPass = pass => {
        return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(pass);
    };

    document.querySelector("#button").onclick = () => {
        return redirecting();
    };

    document.querySelector("#login").onsubmit = () => {
        if(!nameIsValid(document.querySelector("#email").value)) {
            document.querySelector("#email").style.borderBottom = "2px solid red";
            document.querySelector("#email").focus();
            return false;
        } else if(!nameIsValid(document.querySelector("#password").value)) {
            document.querySelector("#password").style.borderBottom = "2px solid red";
            document.querySelector("#password").focus();
            return false;
        } else {
            (function myFunction() {
                window.location = "file:///root/Desktop/banka/UI/login.html";
            })();
            return true;
        }
    };



});