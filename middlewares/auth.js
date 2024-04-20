const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require('../secret');
const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        //console.log(token);

        if(!token){
            throw createError(401, 'Access token not found! Login Again!')
        }

        const decoded = jwt.verify(token, jwtAccessKey);
        console.log(decoded);
        if(!decoded){
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


module.exports = {
    isLoggedIn,
}