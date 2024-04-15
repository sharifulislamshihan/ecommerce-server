const express = require('express');
const { getUsers, getUserById, deleteUserById, processRegister, activateUserAccount, updateUserById } = require('../controllers/userController');
const upload = require('../middlewares/uploadFiles');
const { validateUserRegistration } = require('../validators/auth');
const { runValidation } = require('../validators/runValidation');
const userRouter = express.Router();


// GET: api/users
userRouter.post('/process-register', validateUserRegistration, runValidation ,processRegister);
// upload.single("image"),

userRouter.post('/verify', activateUserAccount);

userRouter.get('/', getUsers);

// route parameter :id is accessed at req.params.id
userRouter.get('/:id', getUserById);

// delete user by id router
userRouter.delete('/:id', deleteUserById);

// update user by id router
userRouter.put('/:id', updateUserById);

module.exports = userRouter;