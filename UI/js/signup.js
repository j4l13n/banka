document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#firstname").onkeyup = () => {
        if(nameIsValid(document.querySelector("#firstname").value)) {
            document.querySelector("#firstname").style.borderBottom = "2px solid green";
        } else {
            document.querySelector("#firstname").style.borderBottom = "2px solid red";
        }
    };

    document.querySelector("#lastname").onkeyup = () => {
        if(nameIsValid(document.querySelector("#lastname").value)) {
            document.querySelector("#lastname").style.borderBottom = "2px solid green";
        } else {
            document.querySelector("#lastname").style.borderBottom = "2px solid red";
        }
    };

    document.querySelector("#email").onkeyup = () => {
        if(emailIsValie(document.querySelector("#email").value)) {
            document.querySelector("#email").style.borderBottom = "2px solid green";
        } else {
            document.querySelector("#email").style.borderBottom = "2px solid red";
        }
    };                                                                                                                                                      

    document.querySelector("#password").onkeyup = () => {
        if(checkPass(document.querySelector("#password").value)) {                                             
            document.querySelector("#password").style.borderBottom = "2px solid green"; 
        } else {
            document.querySelector("#password").style.borderBottom = "2px solid red";
        }
    };

    document.querySelector("#confirm").onkeyup = () => {
        if(passMatch(document.querySelector("#password").value, document.querySelector("#confirm").value)) {
            document.querySelector("#confirm").style.borderBottom = "2px solid green";
        } else {
            document.querySelector("#confirm").style.borderBottom = "2px solid red";
        }
    };

    const nameIsValid = (name) => {
        return /^[a-zA-Z ]+$/.test(name);
    };
    
    const emailIsValie = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const checkPass = pass => {
        return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(pass);
    };

    const passMatch = (password, confirm) => {
        if(password === confirm) {
            return true;
        } else {
            return false;
        }
    };
});