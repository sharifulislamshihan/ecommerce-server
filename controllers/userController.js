const createError = require('http-errors');
const users = require('../models/userModel');

const user = [
    { id: 1, name: 'shihan' },
    { id: 2, name: 'nihan' },
    { id: 3, name: 'shihabb' },
]

const getUsers = (req, res, next) => {
    try {
        res.status(200).json({
            message: 'users were returned',
            users: users
        })
    }
    catch (error) {
        next(error);
    }
}

module.exports = getUsers;