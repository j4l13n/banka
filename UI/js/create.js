document.querySelector("DOMContentLoaded", () => {
    document.querySelector("#accountNumber").onkeyup = () => {
        if(checkAccountNumber(document.querySelector("#accountNumber").value)) {
            document.querySelector("#accountNumber").style.borderBottom = "2px solid green";
        } else {
            document.querySelector("#accountNumber").style.borderBottom = "2px solid red";
        }
    };


    const checkAccountNumber = number => {
        return /^\d*$/.test(number);
    };
});