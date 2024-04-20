const express = require('express');
const { runValidation } = require('../validators/runValidation');
const { handleLogin } = require('../controllers/authControllers');
const authRouter = express.Router();

authRouter.post("/login", handleLogin)

module.exports = authRouter;