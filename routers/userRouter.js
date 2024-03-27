const express = require('express');
const {getUsers, getUser} = require('../controllers/userController');
const userRouter = express.Router();


// GET: api/users
userRouter.get('/', getUsers);

// route parameter :id is accessed at req.params.id
userRouter.get( '/:id', getUser);

module.exports = userRouter;