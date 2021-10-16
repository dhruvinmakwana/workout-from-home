const express = require('express');
const homeControllers = require('../controllers/home.controllers');
const router = express.Router();

router.get('/register', homeControllers.register);
router.get('/login', homeControllers.login);
router.get('/dashboard', homeControllers.dashboard);


module.exports = router