const express = require('express');
const { authAdmin } = require('../../middlewares/authentication')
const router = express.Router();

const {
    testEndpoint,
    usersList,
    userSignUp,
    userLogIn,
} = require('../controller/userController');

router.get('/', testEndpoint);
router.get('/list', authAdmin, usersList);
router.post('/', userSignUp);
router.post('/login', userLogIn);

module.exports = router;