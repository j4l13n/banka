import chai from 'chai';
import validate from './../validations/validations';

const { expect } = chai;

describe("Validation test", () => {
    it("it should return an error when name is not valid", () => {
        expect(validate.isValidName("Julien5")).to.equal(false);
    });

    it("it should return an error when email is not valid", () => {
        expect(validate.isValidEmail("juliushirwa@gmailcom")).to.equal(false);
    });

    it("it should return an error when password is not valid", () => {
        expect(validate.isValidPassword("regedi")).to.equal(false);
    });

    it("it should return an error when number is not valid", () => {
        expect(validate.isValidNumber("Ret56")).to.equal(false);
    });

    it("it should return an error when account status is not valid", () => {
        expect(validate.isValidNumber("Ret56")).to.equal(false);
    });

    it("it should return an error when account status is not valid", () => {
        expect(validate.isValidAccountType("Ret56")).to.equal(false);
    });

    it("it should return an error when account status is not valid", () => {
        expect(validate.isValidAccountType("savings")).to.equal(true);
    });

    it("it should return an error when number is not valid", () => {
        expect(validate.isValidNumber("Ret56")).to.equal(false);
    });

    it("it should return an error when account status is not valid", () => {
        expect(validate.isValidNumber("Ret56")).to.equal(false);
    });

    it("it should return an error when account status is not valid", () => {
        expect(validate.isValidAccountType("Ret56")).to.equal(false);
    });

    it("it should return an error when account status is not valid", () => {
        expect(validate.isValidAccountType("savings")).to.equal(true);
    });

    it("it should return true if type is client, cashier, or admin", () => {
        expect(validate.isValidUserType("client")).to.equal(true);
    });

    it("should return false when type is not client, cashier, or admin", () => {
        expect(validate.isValidUserType("hello")).to.equal(false);
    });

    it("should return true if account status if valid", () => {
        expect(validate.isValidAccountStatus("dormant")).to.equal(true);
    });

    it("should return false if account status if valid", () => {
        expect(validate.isValidAccountStatus("hello")).to.equal(false);
    });

    it("should return false when a password contains spaces", () => {
        expect(validate.isValidPassword("Regedit  56")).to.equal(false);
    });
});