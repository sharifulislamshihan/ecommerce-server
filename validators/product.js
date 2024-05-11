const { body } = require("express-validator");

const validateProduct = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min: 1, max: 150})
    .withMessage('Product name should be 1 to 150 character long'),

    body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({min: 3})
    .withMessage('Product name should be at least 3 character long'),

    body('price')
    .trim()
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({min: 0})
    .withMessage('Product price must be a positive number'),


    body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),

    body('quantity')
    .trim()
    .notEmpty()
    .withMessage('Quantity is required')
    .isFloat({min: 0})
    .withMessage('Quantity must be a positive number'),
]

module.exports = {
    validateProduct,
}