const express = require('express');
const { runValidation } = require('../validators/runValidation');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const { handleCreateCategory, handleGetCategories } = require('../controllers/categoryController');
const { validateCategory } = require('../validators/category');
const categoryRouter = express.Router();


// POST: /api/categories
// create category
categoryRouter.post('/', validateCategory, runValidation, isLoggedIn, isAdmin, handleCreateCategory);


// GET: /api/categories
// get all the category
categoryRouter.get('/', validateCategory, runValidation, isLoggedIn, isAdmin, handleGetCategories);


module.exports = categoryRouter;