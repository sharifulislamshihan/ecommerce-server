const createError = require('http-errors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { successResponse } = require('./responseController');
const createHttpError = require('http-errors');
const { error } = require('console');
const Products = require('../models/productModel');
const { default: slugify } = require('slugify');


// handle create product
const handleCreateProduct = async (req, res, next) => {
    try {
        const { name, description, image, price, quantity, shipping, category, categoryId } = req.body;
        const productExist = await Products.exists({
            name: name
        })
        if (productExist) {
            throw createError(400, "Product already exist")
        }

        // create Product
        const product = await Products.create({
            name: name,
            slug: slugify(name),
            description: description,
            price: price,
            quantity: quantity,
            shipping: shipping,
            image: image,
            category: category,
            categoryId: categoryId,
        })
        return successResponse(res, {
            statusCode: 200,
            message: "Product created successfully",
            payload: {
                product,
            }
        })
    }
    catch (error) {
        next(error);
    }
}

// handle get all the product
const handleGetAllProducts = async (req, res, next) => {
    try {
        // const page = parseInt(req.query.page) || 1;
        // const limit = parseInt(req.query.limit) || 10;
        // const startIndex = (page - 1) * limit;
        // const endIndex = page * limit;
        const products = await Products.find({})
            // .skip((page - 1) * limit)
            // .limit(limit)
            .sort({ createdAt: -1 })
            ;

        if (!products) {
            throw createError(404, 'No Products Found')
        }
        const count = await Products.find({}).countDocuments();
        return successResponse(res, {
            statusCode: 200,
            message: "Product returned successfully",
            payload: {
                products,
                totalNumberOfProducts: count,
            }
        })
    }
    catch (error) {
        next(error);
    }
}

// handle get single product
const handleGetSingleProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        const product = await Products.findById(id);
        console.log(product);
        if (!product) {
            throw createError(404, 'Product not found')
        }
        return successResponse(res, {
            statusCode: 200,
            message: 'Product returned successfully',
            payload: {
                product,
            }
        })
    }
    catch (error) {
        next(error);
    }
}

// handle delete product
const handleSingleDeleteProduct = async (req, res, next) => {
    try {
        const slug = req.params;
        console.log(slug);
        const product = await Products.findOneAndDelete(slug);
        console.log(product);
        if (!product) {
            throw createError(404, 'Product not found')
        }
        return successResponse(res, {
            statusCode: 200,
            message: `Product deleted successfully`,
            payload: {
                product
            }
        })
    }
    catch (error) {
        next(error);
    }
}


// Update a product
const handleUpdateProduct = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const updateOptions = {
            // updated data should be original data
            new: true,
            // it helps to validate data according to schema
            runValidators: true,
            context: 'query',
        }

        let updates = {};
        // name, price, quantity, shipping, image, category

        // --------------Update product data-----------------
        if (req.body.name) {
            updates.name = req.body.name;
        }
        if (req.body.description) {
            updates.description = req.body.description;
        }
        if (req.body.price) {
            updates.price = req.body.price;
        }

        if (req.body.quantity) {
            updates.quantity = req.body.quantity;
        }
        if (req.body.shipping) {
            updates.shipping = req.body.shipping;
        }
        // todo : image will update according to imgbb link
        if (req.body.image) {
            updates.image = req.body.image;
        }

        if (req.body.category) {
            updates.category = req.body.category;
        }

        if(updates.name) {
            updates.slug = slugify(updates.name);
        }

        const updatedProduct = await Products.findOneAndUpdate(
            {slug},
            updates,
            updateOptions,
        )

        if (!updatedProduct) {
            throw createError(404, 'Product does not exist')
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Product Updated Successfully",
            payload: {
                updatedProduct,
            }
        })
    }
    catch (error) {
        // to handle mongoose cast error if any id is not valid
        // if (error instanceof mongoose.Error.CastError) {
        //     throw createError(400, "Invalid ID")
        // }
        next(error);
    }
}

module.exports = {
    handleCreateProduct,
    handleGetAllProducts,
    handleGetSingleProduct,
    handleSingleDeleteProduct,
    handleUpdateProduct,
};