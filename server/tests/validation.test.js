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
});