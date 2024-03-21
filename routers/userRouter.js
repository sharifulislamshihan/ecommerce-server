const express = require('express');
const getUsers = require('../controllers/userController');
const userRouter = express.Router();
// dummy text
const users = [
    { id: 1, name: 'shihan' },
    { id: 2, name: 'nihan' },
    { id: 3, name: 'shihabb' },
]

userRouter.get('/', getUsers)

module.exports = userRouter;