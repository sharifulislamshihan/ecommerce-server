const slugify = require('slugify')
const Category = require("../models/categoryModel");


const CreateCategory = async (name) => {

    const newCategory = await Category.create({
        name,
        slug: slugify(name),
    });
    return newCategory;
}
module.exports = {
    CreateCategory
}