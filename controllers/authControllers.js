const User = require("../models/userModel");
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { successResponse } = require("./responseController");
const { jwtAccessKey, jwtRefreshKey } = require("../secret");
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

        // todo: set time for login properly
        const accessToken = createJsonWebToken(
            { user }, jwtAccessKey,
            '24h')
        // 24h = 24 hour
        res.cookie('accessToken', accessToken), {
            maxAge: 24 * 60 * 60 * 1000, // 24 h
            httpOnly: true,
            sameSite: 'none',
            secure: true
        }

        // todo: make 1 m to 7 days
        const refreshToken = createJsonWebToken(
            { user }, jwtRefreshKey,
            '7d')
        // 24h = 24 hour
        res.cookie('refreshToken', refreshToken), {
            maxAge: 1 * 60 * 1000, // 7d -> 7 * 24 * 60 * 60 * 1000
            httpOnly: true,
            sameSite: 'none',
            secure: true
        }

        // take as a object
        const userWithOutPassword = user.toObject();
        // delete the password field of the object
        delete userWithOutPassword.password;
        // success response
        return successResponse(res, {
            statusCode: 200,
            message: 'user logged in Successfully',
            payload: {
                userWithOutPassword
            }
        })
    }
    catch (error) {
        next(error)
    }
}


const handleLogout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        // success response
        return successResponse(res, {
            statusCode: 200,
            message: 'user logged out Successfully',
            payload: {
            }
        })
    }
    catch (error) {
        next(error)
    }
}

const handleRefreshToken = async (req, res, next) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;

        // verify the refresh token
        const decodedToken = jwt.verify(oldRefreshToken, jwtRefreshKey)

        if (!decodedToken) {
            throw createError(401, 'Invalid refresh token. Please Login again')
        }

        // create access token
        const accessToken = createJsonWebToken(
            decodedToken.user, 
            jwtAccessKey,
            '24h')
        // 24h = 24 hour
        res.cookie('accessToken', accessToken), {
            maxAge: 24 * 60 * 60 * 1000, // 24 h
            httpOnly: true,
            sameSite: 'none',
            secure: true
        }

        // success response
        return successResponse(res, {
            statusCode: 200,
            message: 'New access token generated',
            payload: {
            }
        })
    }
    catch (error) {
        next(error)
    }
}


const handleProtectedRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        // verify the refresh token
        const decodedToken = jwt.verify(accessToken, jwtAccessKey)

        if (!decodedToken) {
            throw createError(401, 'Invalid refresh token. Please Login again')
        }
        // success response
        return successResponse(res, {
            statusCode: 200,
            message: 'Route Protected.',
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
    handleLogout,
    handleRefreshToken,
    handleProtectedRoute,
}