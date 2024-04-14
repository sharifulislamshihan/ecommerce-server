const { body } = require("express-validator");
// validation while registration
//=============================
const validateUserRegistration = [

    // ----------name validation---------
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 3, max: 40 })
        .withMessage('Name Should be at least  3 characters and maximum 40 characters'),


    // ----------email validation---------
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid Email Address'),


    // ----------password validation---------
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 6 })
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
        )
        .withMessage('Password should contain at least 8 character, one Uppercase letter, one lowercase letter, one number and one special character'),


    // ----------address validation---------
    body('address')
        .trim()
        .notEmpty()
        .withMessage('address is required.')
        .isLength({ min: 3 })
        .withMessage('User address should be at least 3 characters long'),

    // ----------Phone validation---------
    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required.')

]

module.exports = {
    validateUserRegistration,
};
