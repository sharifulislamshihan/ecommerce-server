const createError = require('http-errors');
const bcrypt = require('bcryptjs');

const User = require("../models/userModel");
const { successResponse } = require('../controllers/responseController');
const { findWithId } = require('./findWithId');


const findUser = async (search, limit, page) => {
    try {
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

        if (!users || users.length === 0) throw createError(404, "No Users Found");


        return {
            users,
            pagination: {
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
            }
        }

        // return successResponse(res, {
        //     statusCode: 200,
        //     message: "Users Returned Successfully",
        //     payload: {
        //         users,
        //         pagination: {
        //             totalPages: Math.ceil(count / limit),
        //             currentPage: page,
        //             previousPage: page - 1 > 0 ? page - 1 : null,
        //             nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        //         }
        //     }
        // })
    }
    catch (error) {
        throw error;
    }
}


const findUserById = async (id, options = {}) => {
    try {
        const user = await User.findById(id, options).select('-password')

        if (!user) {
            throw createError(404, 'User not found!')
        }
        return user;
    }
    catch (error) {
        throw error;
    }
}


const deleteUserById = async (id, options = {}) => {
    try {
        const user = await User.findByIdAndDelete({
            _id: id,
            isAdmin: false,
        })
        if (!user) {
            throw createError(404, 'User not found!')
        }
    }
    catch (error) {
        throw error;
    }
}


const updateUserPasswordById = async (userId, email, oldPassword, newPassword, confirmPassword) => {
    try {

        const user = await User.findOne({ email: email })

        if(!user){
            throw createError(404, 'User not found!')
        }
        //console.log(user);
        if(newPassword !== confirmPassword){
            throw createError(400, 'Write your Password correctly')
        }
        // Match the password and compare
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)

        if (!isPasswordMatch) {
            throw createError(401, 'Password is not correct. Try again!!')
        }

        const updateUser = await User.findByIdAndUpdate(
            userId,
            // replace pass with new pass
            { $set: { password: newPassword } },
            { new: true }
        ).select('-password')

        if (!updateUser) {
            throw createError(400, 'Unfortunately, there was an error updating your password. Please try again')
        }

        return updateUser;
    }
    catch (error) {
        throw error;
    }
}




const handleUserAction = async (userId, action) => {
    try {
        let update;
        let successMessage
        if (action === 'ban') {
            update = { isBanned: true }
            successMessage = "User is banned Successfully"
        }
        else if (action === 'unban') {
            update = { isBanned: false };
            successMessage = "User is Unbanned Successfully"
        }
        else {
            throw createError(400, 'Invalid action. Use ban or Unban')
        }

        const updateOptions = {
            // updated data should be original data
            new: true,
            // it helps to validate data according to schema
            runValidators: true,
            context: 'query',
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            update,
            updateOptions
        )
            //remove password from response
            .select("-password");

        if (!updatedUser) {
            throw createError(404, 'User was not banned successfully')
        }
        return successMessage;
    }
    catch (error) {
        throw (error);
    }
}


module.exports = {
    handleUserAction,
    findUser,
    findUserById,
    deleteUserById,
    updateUserPasswordById,
}