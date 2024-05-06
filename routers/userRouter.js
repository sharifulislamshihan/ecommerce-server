const express = require('express');
const { getUsers, getUserById, handleDeleteUserById, processRegister, activateUserAccount, handleUpdateUserById, handleManageBannedUserById, handleUpdatePassword, handleForgetPassword, handleResetPassword } = require('../controllers/userController');
const upload = require('../middlewares/uploadFiles');
const { validateUserRegistration, validateUserPasswordUpdate, validateUserForgetPassword, validateUserResetPassword } = require('../validators/auth');
const { runValidation } = require('../validators/runValidation');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const userRouter = express.Router();


// GET: api/users
userRouter.post('/process-register', isLoggedOut, validateUserRegistration, runValidation ,processRegister);
// upload.single("image"),

userRouter.post('/verify', isLoggedOut, activateUserAccount);

userRouter.get('/', isLoggedIn, isAdmin, getUsers);

// route parameter :id is accessed at req.params.id
userRouter.get('/:id([0-9a-fA-f]{24})', isLoggedIn, getUserById);

// delete user by id router
userRouter.delete('/:id([0-9a-fA-f]{24})', isLoggedIn, isAdmin, handleDeleteUserById);

// Reset Password
userRouter.put('/reset-password', validateUserResetPassword, runValidation, handleResetPassword);

// update user by id router
userRouter.put('/:id([0-9a-fA-f]{24})', isLoggedIn, handleUpdateUserById);

// handle ban and unban user by id
userRouter.put('/manageUser/:id([0-9a-fA-f]{24})', isLoggedIn, isAdmin, handleManageBannedUserById);


// Update Password
userRouter.put('/update-password/:id([0-9a-fA-f]{24})', validateUserPasswordUpdate, runValidation, isLoggedIn, handleUpdatePassword);


// Forget Password
userRouter.post('/forget-password', validateUserForgetPassword, runValidation, handleForgetPassword);



module.exports = userRouter;