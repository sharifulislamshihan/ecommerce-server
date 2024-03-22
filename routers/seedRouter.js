const express = require('express');
const { seedUser } = require('../controllers/seedController');
const seedRouter = express.Router();

// get all users
seedRouter.get( '/users', seedUser); 


module.exports = seedRouter;
