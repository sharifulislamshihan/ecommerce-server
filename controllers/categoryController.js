const { createCategory, getAllCategory, getACategory } = require("../Services/categoryService");
const { successResponse } = require("./responseController");
const createError = require('http-errors');

const handleCreateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        await createCategory(name);

        return successResponse(res, {
            statusCode: 200,
            message: `${name} Category created successfully `,
        })
    }
    catch (error) {
        next(error);
    }
}


const handleGetAllCategories = async (req, res, next) => {
    try {

        const categories = await getAllCategory();
        return successResponse(res, {
            statusCode: 200,
            message: 'All the categories returned successfully',
            payload: categories,
        })
    }
    catch (error) {
        next(error);
    }
}


// get single category
const handleGetSingleCategory = async (req, res, next) => {
    try {

        const {slug} = req.params
        const categories = await getACategory(slug)
        return successResponse(res, {
            statusCode: 200,
            message: 'All the categories returned successfully',
            payload: categories,
        })
    }
    catch (error) {
        next(error);
    }
}


module.exports = {
    handleCreateCategory,
    handleGetAllCategories,
    handleGetSingleCategory
}