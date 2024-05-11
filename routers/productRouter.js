const express = require('express');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const { handleCreateProduct, handleGetAllProducts, handleGetSingleProduct, handleSingleDeleteProduct } = require('../controllers/productController');
const { validateProduct } = require('../validators/product');
const { runValidation } = require('../validators/runValidation');
const productRouter = express.Router();


// POST: api/products /create-product
productRouter.post('/create-product', isLoggedIn, isAdmin, validateProduct, runValidation, handleCreateProduct);

// GET: api/products/
productRouter.get('/', isLoggedIn, handleGetAllProducts)

// GET: api/products/  (get single product)
productRouter.get('/:id', isLoggedIn, handleGetSingleProduct)

// del product
productRouter.delete('/:slug', isLoggedIn, isAdmin, handleSingleDeleteProduct);

// todo: delete product need to be fixed




module.exports = productRouter;