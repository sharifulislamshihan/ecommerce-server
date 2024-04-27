const express = require('express');
const { getUsers, getUserById, handleDeleteUserById, processRegister, activateUserAccount, handleUpdateUserById, handleManageBannedUserById } = require('../controllers/userController');
const upload = require('../middlewares/uploadFiles');
const { validateUserRegistration } = require('../validators/auth');
const { runValidation } = require('../validators/runValidation');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const userRouter = express.Router();


// GET: api/users
userRouter.post('/process-register', isLoggedOut, validateUserRegistration, runValidation ,processRegister);
// upload.single("image"),

userRouter.post('/verify', isLoggedOut, activateUserAccount);

userRouter.get('/', isLoggedIn, isAdmin, getUsers);

// route parameter :id is accessed at req.params.id
userRouter.get('/:id', isLoggedIn, getUserById);

// delete user by id router
userRouter.delete('/:id', isLoggedIn, isAdmin, handleDeleteUserById);

// update user by id router
userRouter.put('/:id', isLoggedIn, handleUpdateUserById);

// handle ban and unban user by id
userRouter.put('/manageUser/:id', isLoggedIn, isAdmin, handleManageBannedUserById);


module.exports = userRouter;