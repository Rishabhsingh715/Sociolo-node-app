const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controllers');
const requestController = require('../controllers/request_controller');


console.log('router loaded');


router.get('/',homeController.home);

router.get('/requests',requestController.request);

router.use('/users', require('./users'));
module.exports = router;