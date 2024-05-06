const slugify = require('slugify')
const Category = require("../models/categoryModel");


const createCategory = async (name) => {

    const newCategory = await Category.create({
        name,
        slug: slugify(name),
    });
    return newCategory;
}


const getAllCategory = async () => {
    // return all the category
    return await Category.find({}).select('name slug').lean()
}

// get a single category
const getACategory = async (slug) => {
    // return all the category
    return await Category.find({slug}).select('name slug').lean()
}

module.exports = {
    createCategory,
    getAllCategory,
    getACategory,
    
}