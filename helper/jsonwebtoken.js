const jwt = require('jsonwebtoken');

const createJsonWebToken = (payload, secretKey, expiresIn) => {

    if (typeof payload !== 'object' || !payload) {
        throw new Error('Payload  must be an object and cannot be null');
    }

    if (typeof secretKey !== 'string' || secretKey === '') {
        throw new Error('secretKey must be an string and cannot be null');
    }

    try {
        const token = jwt.sign(payload, secretKey,
            { expiresIn }
        );
        return token;
    }
    catch(error){
        console.error('failed to sign in the JWT', error);
        throw error;
    }
}

module.exports = {
    createJsonWebToken,
}