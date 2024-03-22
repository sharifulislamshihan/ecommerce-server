const createError = require('http-errors');
const User = require('../models/userModel');




const getUsers = (req, res, next) => {
    try {
        const  users = await User
        res.status(200).json({
            message: 'users were returned',
            
        })
    }
    catch (error) {
        next(error);
    }
}

module.exports = getUsers;