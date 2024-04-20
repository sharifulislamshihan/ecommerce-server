const createError = require('http-errors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const { findWithId } = require('../Services/findWithId');
const { createJsonWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey, clientUrl } = require('../secret');
const { sendEmailWithNodeMailer } = require('../helper/email');
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

        const userImagePath = user.image;
        fs.access(userImagePath, (err) =>{
            if(err){
                console.log("User Image does not exist...");
            } else {
                // file exists
                fs.unlink(userImagePath, (err) =>{
                    if(err) throw err;
                    console.log('Successfully deleted User Image');
                });
            };
        })

        const deletedUser = await User.findByIdAndDelete({
            _id: id,
            isAdmin: false,
        });

        return successResponse(res, {
            statusCode: 200,
            message: "User Deleted Successfully",
        })
    }
    catch (error) {
        next(error);
    }
}

// process  registration request
const processRegister = async (req, res, next) => {
    try {
        const { name, email, password, image, phone, address } = req.body;
        //todo: 'add image and store image form imgbb';
        // check if the user already exists in the database
        const userExists = await User.exists({
            email: email
        });

        if (userExists) {
            throw createError(409, 'User with this  Email already Exists. Please sign in');
        }

        // jwt
        const token = createJsonWebToken(
            { name, email, password, image, phone, address }, jwtActivationKey, 
            '10m')

        //console.log(token);
        // const newUser = {
        //     name,
        //     email,
        //     password,
        //     phone,
        //     address
        // }


        // Prepare Email
        const emailData = {
            email,
            subject: 'Account Verification Mail',
            html: `
            <h2>Hello ${name}</h2>
            <p>Thank you for registering at our Home Shop.</p>
            <p>Please click on the following link to verify your account</p>
            <a href="${clientUrl}/api/users/activate/${token}" target="_blank">Verify Account</a>
            `
        }

        //  Send Email with Nodemailer
        try {
            //todo: uncommnet below line 
            //await sendEmailWithNodeMailer(emailData)
        } catch (error) {
            next(createError(500, "Failed to send verification mail"));

            return;
        }

        return successResponse(res, {
            statusCode: 200,
            message: `Please go to at ${email} to completing your registration email`,
            // todo : comment below payload line
            payload: {
                token
            }
        })
    }
    catch (error) {
        next(error);
    }
}

// activate user account req to verify email and save in db
const activateUserAccount = async (req, res, next) => {
    try {
        const token = req.body.token;
        if (!token) throw createError(404, "Token is required");

        try {
            // verify the user using token
            const decoded = jwt.verify(token, jwtActivationKey);
            if (!decoded) throw createError(404, 'user was not able to verify')

            // check if the user already exists in the database
            const userExists = await User.exists({
                email: decoded.email
            });

            if (userExists) {
                throw createError(409, 'User with this  Email already Exists. Please try with new email');
            }

            // create user
            await User.create(decoded);
            console.log(decoded);
            return successResponse(res, {
                statusCode: 201,
                message: `user registered successfully`,
            })
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw createError(401, 'This link has expired');
            }
            else if (error.name === 'JsonWebTokenError') {
                throw createError(401, 'Invalid or malformed token');
            }
            else {
                throw error;
            }
        }
    }
    catch (error) {
        next(error);
    }
}


// Update a single user
const updateUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const options = {password: 0};

        // find user
        const user = await findWithId(User, userId, options)

        const updateOptions = {
            // updated data should be original data
            new: true,
            // it helps to validate data according to schema
            runValidators: true,
            context: 'query',
        }

        let updates = {};
        // name, email, password, phone, image, address

        // --------------Update user data-----------------
        if (req.body.name) {
            updates.name = req.body.name;
        }
        // if (req.body.email) {
        //     updates.email = req.body.email;
        // }
        if (req.body.password) {
            updates.password = req.body.password;
        }
        if (req.body.phone) {
            updates.phone = req.body.phone;
        }
        // todo : image will update according to imgbb link
        if (req.body.image) {
            updates.image = req.body.image;
        }
        if (req.body.address) {
            updates.address = req.body.address;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            updates, 
            updateOptions
        )
        //remove password from response
        .select("-password");

        if (!updatedUser) {
            throw createError(404, 'User does not exist')
        }

        return successResponse(res, {
            statusCode: 200,
            message: "User Updated Successfully",
            payload: {
                updatedUser,
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
    activateUserAccount,
    updateUserById,

};