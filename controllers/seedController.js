const data = require("../data");
const Users = require("../models/userModel")
const seedUser = async (req, res, next) =>{
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

module.exports = {
    seedUser,
}