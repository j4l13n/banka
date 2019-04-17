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

    isValidAccountType(status) {
        if(status === "savings" || status === "current") {
            return true;
        } else {
            return false;
        }
    }

    isValidName(name) {
        return /^[a-zA-Z ]+$/.test(name);
    }
}

const validate = new Validate();
export default validate;