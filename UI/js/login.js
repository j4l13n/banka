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

    document.querySelector("#login").onsubmit = () => {
        if(!emailIsValie(document.querySelector("#email").value)) {
            document.querySelector("#email").style.borderBottom = "2px solid red";
            document.querySelector("#email").focus();
            return false;
        } else if(!checkPass(document.querySelector("#password").value)) {
            document.querySelector("#password").style.borderBottom = "2px solid red";
            document.querySelector("#password").focus();
            return false;
        } else {
            return true;
        }
    };
});