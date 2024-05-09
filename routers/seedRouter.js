const express = require('express');
const { seedUser, seedProducts } = require('../controllers/seedController');
const seedRouter = express.Router();

// get all users
seedRouter.get( '/users', seedUser); 

seedRouter.get( '/products', seedProducts); 

module.exports = seedRouter;
