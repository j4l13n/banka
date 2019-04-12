

const encryptPassword = function(password, salt) {
    if(!password) return '';
    try {
        return crypto
                .createHmac('sha1', salt)
                .update(password)
                .digest('hex');
    } catch (err) {
        return '';
    }
};

const authenticate = (plainText, hashe_password) => {
    return this.encryptPassword(plainText) === hashe_password;
};

const makeSalt = () => {
    return Math.round((new Date().valueOf() * Math.random())) + '';
};

export default {
    encryptPassword,
    authenticate,
    makeSalt
};