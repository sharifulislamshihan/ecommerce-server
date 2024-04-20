const User = require("../models/userModel");
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { successResponse } = require("./responseController");
const { jwtAccessKey } = require("../secret");
const { createJsonWebToken } = require("../helper/jsonwebtoken");

const handleLogin = async (req, res, next) => {
    try {

        // need email and pass from req.body for login
        const { email, password } = req.body;

        // check if email and user exist
        const user = await User.findOne({ email });
        if (!user) {
            throw createError(404, 'Sorry, no account found with this email. Please register first.')
        }

        // check if password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            throw createError(401, 'Email/Password did not match')
        }
        // if email and pass exist then check if the user is banned or not

        if (user.isBanned) {
            throw createError(403, 'You are banned! Please contact with authority')
        }
        // token, cookie
        // jwt token
        const accessToken = createJsonWebToken(
            { email }, jwtAccessKey,
            '10m')
            // 10m = 10 minutes
            res.cookie('access_token', accessToken),{
                maxAge: 15 * 60 * 1000, // 15 min
                httpOnly: true,
                sameSite: 'none',
                secure: true
            }
        // success response
        return successResponse(res, {
            statusCode: 200,
            message: 'user logged in Successfully',
            payload: {
            }
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    handleLogin,
}