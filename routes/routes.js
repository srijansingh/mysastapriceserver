const express = require('express');

const {
    insertCategory,
    getAllProduct,
    getSingleProduct,
    getAllActiveProduct, 
    getAllCategory, 
    getCategoryProduct,
    getSearchResult, 
    getAllProductBrand, 
    activePosts,
    countAll,
    countActive,
    countBrand,
    countCat,
    getBrandProduct,
    getAllCustomer
    } = require("../controller/products");

const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

//Insert category for scrapping
router.post('/scrapper',insertCategory);

// Get All Product EndPoint
router.get('/product',isAdmin, getAllProduct);
router.get('/product/:id',isAdmin, getSingleProduct);
router.get('/activeproduct',isAdmin, getAllActiveProduct)


// Get All Category
router.get('/category',isAdmin, getAllCategory);
router.post('/category/product',isAdmin, getCategoryProduct);

// Get all Brand
router.get('/brand',isAdmin, getAllProductBrand);
router.post('/brand/product', isAdmin, getBrandProduct);

// Get search result
router.post('/product/search',isAdmin,getSearchResult);
router.put('/update/active',isAdmin, activePosts);


router.get('/count', isAdmin, countAll)
router.get('/countcat', isAdmin, countCat)
router.get('/countbrand',isAdmin, countBrand)
router.get('/countactive',isAdmin, countActive);

// Customer information routes
router.get('/customer', getAllCustomer);

module.exports = router;