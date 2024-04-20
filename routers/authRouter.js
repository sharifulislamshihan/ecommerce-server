const express = require('express');
const { runValidation } = require('../validators/runValidation');
const { handleLogin, handleLogout } = require('../controllers/authControllers');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth');
const authRouter = express.Router();


// handle Login
authRouter.post("/login", isLoggedOut, handleLogin);
// handle logout
authRouter.post('/logout', isLoggedIn, handleLogout)

module.exports = authRouter;