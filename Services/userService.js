const createHttpError = require("http-errors");
const User = require("../models/userModel");

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
            throw createHttpError(400, 'Invalid action. Use ban or Unban')
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
            throw createHttpError(404, 'User was not banned successfully')
        }
        return successMessage;
    }
    catch (error) {
        throw (error);
    }
}


module.exports = {
    handleUserAction,
}