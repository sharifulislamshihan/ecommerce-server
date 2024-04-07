const createError = require('http-errors');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const { findWithId } = require('../Services/findWithId');
const { createJsonWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey } = require('../secret');
// const { default: mongoose } = require('mongoose');




// get all the user
const getUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const searchRegEx = new RegExp('.*' + search + '.*', 'i');

        // filter to see only users not admin
        const filter = {
            isAdmin: { $ne: true },
            //  name,email or phone should match the search string
            $or: [
                { name: { $regex: searchRegEx } },
                { email: { $regex: searchRegEx } },
                { phone: { $regex: searchRegEx } },
            ]
        }
        const options = {
            // skip the password field  from results
            password: 0
        }
        // pagination
        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit)

        const count = await User.find(filter).countDocuments();

        if (!users) throw createError(404, "No Users Found");

        return successResponse(res, {
            statusCode: 200,
            message: "Users Returned Successfully",
            payload: {
                users,
                pagination: {
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                }
            }
        })
    }
    catch (error) {
        next(error);
    }
}


// get a single user
const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = {
            password: 0,
        }
        const user = await findWithId(User, id, options);

        return successResponse(res, {
            statusCode: 200,
            message: "Users Returned Successfully",
            payload: {
                user
            }
        })
    }
    catch (error) {
        next(error);
    }
}

// delete a single user
const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = {
            password: 0,
        }

        const user = await findWithId(id, options);

        const deletedUser = await User.findByIdAndDelete({
            _id: id,
            isAdmin: false,
        });


        return successResponse(res, {
            statusCode: 200,
            message: "Users Deleted Successfully",
        })
    }
    catch (error) {
        next(error);
    }
}

// process  registration request
const processRegister = async (req, res, next) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // check if the user already exists in the database
        const userExists = await User.exists({
            email: email
        });

        if(userExists){
            throw createError(409, 'User with this  Email already Exists. Please sign in');
        }

        // jwt
        const token = createJsonWebToken({name,email,password,phone,address}, jwtActivationKey, '3h' )

        //console.log(token);
        // const newUser = {
        //     name,
        //     email,
        //     password,
        //     phone,
        //     address
        // }


        return successResponse(res, {
            statusCode: 200,
            message: "Users Created Successfully",
            payload: {
                token
            }
        })
    }
    catch (error) {
        next(error);
    }
}


module.exports = {
    getUsers,
    getUserById,
    deleteUserById,
    processRegister,
};