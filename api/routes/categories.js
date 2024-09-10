const express = require('express');
const {authAdmin} = require('../../middlewares/authentication');
const router = express.Router();

const {
    testEndpoint,
    categoriesList,
    singleCategory,
    addNewCategory,
    editCategory,
    deleteCategory
} = require('../controller/categoryControl')

router.get('/', testEndpoint)
router.get('/list', categoriesList)
router.get('/single/:id', singleCategory)
router.post('/', addNewCategory)
router.patch('/:id', editCategory)
router.delete('/:id', deleteCategory)



module.exports = router;
