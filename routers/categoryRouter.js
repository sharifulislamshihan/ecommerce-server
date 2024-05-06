const express = require('express');
const { runValidation } = require('../validators/runValidation');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const { handleCreateCategory, handleGetAllCategories, handleGetSingleCategory } = require('../controllers/categoryController');
const { validateCategory } = require('../validators/category');
const categoryRouter = express.Router();


// POST: /api/categories
// create category
categoryRouter.post('/createCategory', validateCategory, runValidation, isLoggedIn, isAdmin, handleCreateCategory);


// GET: /api/categories
// get all the category
categoryRouter.get('/', isLoggedIn, isAdmin, handleGetAllCategories);
// get single category
categoryRouter.get('/:slug', isLoggedIn, isAdmin, handleGetSingleCategory);


module.exports = categoryRouter;