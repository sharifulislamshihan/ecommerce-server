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
        //console log will work only if we check only end point where logged in middleware used.
        // can get user details by using req.user. Its mainly to see the role
        req.user = decoded.user;
        //console.log(req.user);
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





const isAdmin = async (req, res, next) => {
    try {
        //console.log(accessToken);
        console.log(req.user.isAdmin);
        // if its is not admin it will not give access to the next
        if(!req.user.isAdmin){
            throw createError(403, 'Forbidden. Admin Access Only')
        }

        // if it is admin it will give access the next endpoint
        next();
    }
    catch (error) {
        return next(error)
    }
}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdmin,
}