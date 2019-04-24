import { stat } from "fs";

class Validate {
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPassword(password) {
        return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password);
    }

    isValidNumber(number) {
        return /^\d*$/.test(number);
    }

    isValidAccountType(type) {
        if(type === "savings" || type === "current") {
            return true;
        } else {
            return false;
        }
    }

    isValidName(name) {
        return /^[a-zA-Z ]+$/.test(name);
    }

    isValidAccountStatus(status) {
        if(status === "active" || status === "dormant" || status === "Active" || status === "Dormant" || status === "Draft" || status === "draft") {
            return true;
        } else {
            return false;
        }
    }

    isValidUserType(type) {
        if(type === "admin" || type === "cashier") {
            return true;
        } else {
            return false;
        }
    }
}

const validate = new Validate();
export default validate;