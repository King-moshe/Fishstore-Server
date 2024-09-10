const express = require('express');
const router = express.Router();

const {
    test,
    productsList,
    singleProduct,
    addNewProduct,
    editProduct,
    deleteProduct,
} = require('../controller/productsController');

router.get('/', test);
router.get('/list', productsList);
router.get('/single/:id', singleProduct);
router.post('/', addNewProduct);
router.patch('/:id', editProduct);
router.delete('/:id', deleteProduct);


module.exports = router;