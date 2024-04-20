const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require('../secret');
const isLoggedIn = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        //console.log(token);

        if (!accessToken) {
            throw createError(401, 'Access token not found! Login Again!')
        }

        const decoded = jwt.verify(accessToken, jwtAccessKey);
        console.log(decoded);
        if (!decoded) {
            throw createError(401, 'Invalid Access Token! Login Again!')
        }
        req.body.userId = decoded._id;
        //console.log(req.userId);
        next();
    }
    catch (error) {
        return next(error)
    }
}



const isLoggedOut = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        //console.log(accessToken);

        if (accessToken) {
            try {
                const decoded = jwt.verify(accessToken, jwtAccessKey);
                if (decoded) {
                    throw createError(400, 'User is already logged In')
                }
            }
            catch (error) {
                throw error;
            }
        }
        next();
    }
    catch (error) {
        return next(error)
    }
}

module.exports = {
    isLoggedIn,
    isLoggedOut,
}