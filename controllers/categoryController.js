const { createCategory, getAllCategory, getSingleCategory, updateCategory } = require("../Services/categoryService");
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

        const { slug } = req.params
        const category = await getSingleCategory(slug);
        if (!category) {
            throw createError(404, 'Category update failed!')
        }
        return successResponse(res, {
            statusCode: 200,
            message: 'All the categories returned successfully',
            payload: category,
        })
    }
    catch (error) {
        next(error);
    }
}

// update a category
const handleUpdateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { slug } = req.params;
        //console.log(name, slug);
        const updatedCategory = await updateCategory(name, slug)
        //console.log(updateCategory);
        if (!updatedCategory) {
            throw createError(404, 'Category update failed!')
        }
        return successResponse(res, {
            statusCode: 200,
            message: 'Category updated Successfully',
            payload:  updatedCategory ,
        })
    }
    catch (error) {
        next(error);
    }
}


module.exports = {
    handleCreateCategory,
    handleGetAllCategories,
    handleGetSingleCategory,
    handleUpdateCategory,
}