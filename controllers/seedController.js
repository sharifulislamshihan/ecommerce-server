const data = require("../data");
const Products = require("../models/productModel");
const Users = require("../models/userModel")


const seedUser = async (req, res, next) => {
    try {
        // delete all users in the database
        await Users.deleteMany({});


        // inserting New users
        const users = await Users.insertMany(data.users)

        return res.status(201).json(users)
    } catch (error) {
        next(error)
    }
}


const seedProducts = async (req, res, next) => {
    try {
        // delete all users in the database
        await Products.deleteMany({});


        // inserting New users
        const products = await Products.insertMany(data.products)

        return res.status(201).json(products)
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    seedUser,
    seedProducts,
}