document.addEventListener("DOMContentLoaded", () => {

    const email = "juliushirwa@gmail.com";
    const password = "Reg5050";

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
        if(!emailIsValie(document.querySelector("#email").value)) {
            document.querySelector("#email").style.borderBottom = "2px solid red";
            document.querySelector("#email").focus();
            return false;
        } else if(!checkPass(document.querySelector("#password").value)) {
            document.querySelector("#password").style.borderBottom = "2px solid red";
            document.querySelector("#password").focus();
            return false;
        } else {
            if(checkAdmin(document.querySelector("#email").value, document.querySelector("#password").value)) {
                let action = document.querySelector("#login");
                action.setAttribute("action", "./../html/admin/index.html");
                return true;
                
            } else if(checkStaff(document.querySelector("#email").value, document.querySelector("#password").value)) {
                let action = document.querySelector("#login");
                action.setAttribute("action", "./../html/staff/index.html");
                return true;
            }else {
                let action = document.querySelector("#login");
                action.setAttribute("action", "./index.html");
                return true;
            }
        }
    };

    const checkAdmin = (email, password) => {
        if(email === "juliushirwa@gmail.com" && password === "Reg5050") {
            return true;
        } else {
            return false;
        }
    }

    const checkStaff = (email, password) => {
        if(email === "divin@gmail.com" && password === "Div5050") {
            return true;
        } else {
            return false;
        }
    }


});