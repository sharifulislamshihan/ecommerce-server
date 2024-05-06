const { CreateCategory } = require("../Services/categoryService");
const { successResponse } = require("./responseController");
const createError = require('http-errors');

const handleCreateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        await CreateCategory(name);

        return successResponse(res, {
            statusCode: 200,
            message: `${name} Category created successfully `,
        })
    }
    catch (error) {
        next(error);
    }
}


const handleGetCategories = async (req, res, next) => {
    try {
        const { name } = req.body;

        await CreateCategory(name);

        return successResponse(res, {
            statusCode: 200,
            message: `${name} Category created successfully `,
        })
    }
    catch (error) {
        next(error);
    }
}


module.exports = {
    handleCreateCategory,
    handleGetCategories,
}