document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#accountNumber").onkeyup = () => {
        if(checkAccountNumber(document.querySelector("#accountNumber").value)) {
            document.querySelector(".form").style.borderBottom = "2px solid green";
        } else {
            document.querySelector(".form").style.borderBottom = "2px solid red";
        }
    };

    document.querySelector("#type").onkeyup = () => {
        if(checkType(document.querySelector("#account").selector())) {
            document.querySelector("#type").style.borderBottom = "2px solid green";
        } else {
            document.querySelector("#type").style.borderBottom = "2px solid red";
        }
    };

    document.querySelector("#balance").onkeyup = () => {
        if(checkBalance(document.querySelector("#balance").value)) {
            document.querySelector("#balance").style.borderBottom = "2px solid green";
        } else {
            document.querySelector("#balance").style.borderBottom = "2px solid red";
        }
    };

    const checkType = type => {
        if(type.equals("Savings") || type.equals("Current")) {
            return true;
        } else {
            return false;
        }
    };

    const checkBalance = balance => {
        return /^\d*$/.test(balance);
    };


    const checkAccountNumber = number => {
        if(/^\d*$/.test(number) && number.length === 10) {
            return true;
        } else {
            return false;
        }
    };
});