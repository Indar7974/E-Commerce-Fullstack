const isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false;
    if(typeof value === "string" && value.trim().length === 0) return false;
    if(typeof value === "number" && isNaN(value)) return false;
    return true;
}


// User Validator
// const isValidName = (name) => /^[a-zA-Z]+$/.test(name);
const isValidName = (name) => /^[A-Z][a-z]+(?: [A-Z][a-z]+)*( [A-Z][a-z]+)$/.test(name);

const isValidEmail = (email) =>/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/.test(password);

const isValidContact = (Contact) =>/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(Contact);

const isValidAddress = (address) => /^[a-zA-Z0-9\s,.\-/#]{10,100}$/.test(address);

// const isValidGender = (gender) => /^(Male|Female)$/i.test(gender);

const isValidAge = (age) => /^(?:1[01][0-9]|120|[1-9][0-9]?)$/.test(age);

// module.exports = { isValid, isValidName, isValidEmail, isValidPassword, isValidContact, isValidAddress, isValidGender, isValidAge};


// Product Validator


const isValidPrice = (price) => /^\d+(\.\d{1,2})?\s?(rupees|INR|dollars|USD)?$/i.test(price);

const isValidDescription = (description) => /^[a-zA-Z0-9\s.,!?()'"-]{10,1000}$/.test(description);

const isValidRating = (rating) => /^(?:[0-4](?:\.[0-9])?|5(?:\.0)?)$/.test(rating);

module.exports = {isValid,isValidName, isValidEmail, isValidPassword, isValidContact, isValidAddress, isValidAge, isValidPrice, isValidDescription, isValidRating}