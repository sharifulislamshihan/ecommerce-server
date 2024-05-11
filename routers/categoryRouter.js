const express = require('express');
const { runValidation } = require('../validators/runValidation');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const { handleCreateCategory, handleGetAllCategories, handleGetSingleCategory, handleUpdateCategory, handleDeleteCategory } = require('../controllers/categoryController');
const { validateCategory } = require('../validators/category');
const categoryRouter = express.Router();


// GET: /api/categories
// get all the category
categoryRouter.get('/', isLoggedIn, handleGetAllCategories);

// POST: /api/categories
// create category
categoryRouter.post('/createCategory', validateCategory, runValidation, isLoggedIn, isAdmin, handleCreateCategory);

// get single category
categoryRouter.get('/:slug', isLoggedIn, handleGetSingleCategory);

// update route
categoryRouter.put('/update-category/:slug', validateCategory, runValidation, isLoggedIn, isAdmin, handleUpdateCategory);


categoryRouter.delete('/:slug', isLoggedIn, isAdmin, handleDeleteCategory);





module.exports = categoryRouter;