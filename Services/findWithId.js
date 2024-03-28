const createError = require("http-errors");
const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");

const findWithId = async (Model, id, options = {}) => {
    
    try {
        //  find user/item/category by id
        const item = await Model.findById(id, options);

        if (!item) {
            throw createError(404, `${Model} Not Found`)
        }

        return item;
    }
    catch (error) {
        if (error instanceof mongoose.Error) {
            throw createError(400, `Invalid ${Model}`);
        }
        throw error;

    }
}

module.exports = {
    findWithId,
}