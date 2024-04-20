const express = require('express');
const { runValidation } = require('../validators/runValidation');
const { handleLogin, handleLogout } = require('../controllers/authControllers');
const authRouter = express.Router();


// handle Login
authRouter.post("/login", handleLogin);
// handle logout
authRouter.post('/logout', handleLogout)

module.exports = authRouter;