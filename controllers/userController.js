const createError = require('http-errors');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const { default: mongoose } = require('mongoose');




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



const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        // do not want to return  the password in response
        const options = {
            password: 0
        }
        //  find user by id
        const user = await User.findById(id, options);

        if(!user){
            throw createError(404, 'User Not Found')
        }
        return successResponse(res, {
            statusCode: 200,
            message: "Users Returned Successfully",
            payload: {
                user
            }
        })
    }
    catch (error) {
        if(error instanceof mongoose.Error) {
            next(createError(400, "Invalid User"));
            return;
        }
        next(error);
    }
}


module.exports = {
    getUsers,
    getUser,
};