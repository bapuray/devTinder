const validator = require('validator');

const validateSignupData = (req) => {
    const errors = {};
    const {firstName, lastName, email, password} = req.body;

    if(firstName.length < 4 || firstName.length > 20){
        throw new Error('First Name must be between 4 and 20 characters');
    }
    else if(lastName.length < 4 || lastName.length > 20){
        throw new Error('Last Name must be between 4 and 20 characters');
    }
    if(!validator.isEmail(email)){
        throw new Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Password must be strong');
    }
    else if(password.length < 6 || password.length > 20){
        throw new Error('Password must be between 6 and 20 characters');
    }
    return errors;
}

module.exports = {
    validateSignupData
};