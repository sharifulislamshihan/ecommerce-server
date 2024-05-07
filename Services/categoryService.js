
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
const getSingleCategory = async (slug) => {
    // return all the category
    return await Category.find({ slug }).select('name slug').lean()
}

// update a product
const updateCategory = async (name, slug) => {
    const updatedCategory = await Category.findOneAndUpdate(
        { slug },
        { $set: { name: name, slug: slugify(name) } },
        { new: true }
    );
    return updatedCategory;
}


const deleteCategory = async (slug) => {
    // return all the category
    return await Category.findOneAndDelete({ slug }).select('name slug').lean()
}

module.exports = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
}