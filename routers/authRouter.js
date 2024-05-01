const express = require('express');
const { runValidation } = require('../validators/runValidation');
const { handleLogin, handleLogout, handleRefreshToken, handleProtectedRoute } = require('../controllers/authControllers');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth');
const { validateUserLogin, validateRefreshToken } = require('../validators/auth');
const authRouter = express.Router();


// handle Login
authRouter.post("/login", validateUserLogin, runValidation ,isLoggedOut, handleLogin);
// handle logout
authRouter.post('/logout', isLoggedIn, handleLogout)

authRouter.get('/refresh-token', handleRefreshToken)

authRouter.get('/protected', handleProtectedRoute)

module.exports = authRouter;