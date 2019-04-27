import { stat } from "fs";

class Validate {
    /**
     * 
     * @param {object} email
     * @returns true if email is valid
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * 
     * @param {object} password 
     * @returns true if password is valid
     */

    isValidPassword(password) {
        if(/\s/.test(password)) {
            return false;
        } else if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 
     * @param {object} number
     * @return true if it is a valid number 
     */

    isValidNumber(number) {
        return /^\d*$/.test(number);
    }
    /**
     * 
     * @param {object} type
     * @return true if type is savings or current 
     */

    isValidAccountType(type) {
        if(type === "savings" || type === "current") {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 
     * @param {object} name
     * @return true if name is has only character and one space 
     */

    isValidName(name) {
        return /^[a-zA-Z ]+$/.test(name);
    }
    /**
     * 
     * @param {object} status 
     * @return true if status is active, dormant or draft
     */

    isValidAccountStatus(status) {
        if(status === "active" || status === "dormant" || status === "draft") {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @param {object} type 
     * @returns true if type is admin, cashier or client
     */

    isValidUserType(type) {
        if(type === "admin" || type === "cashier" || type === "client") {
            return true;
        } else {
            return false;
        }
    }
}

const validate = new Validate();
export default validate;