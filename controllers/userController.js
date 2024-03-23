const createError = require('http-errors');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');




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

module.exports = getUsers;