const express = require('express');
const homeControllers = require('../controllers/home.controllers');
const router = express.Router();
const auth = require("../middleware/auth");

router.get('/register', homeControllers.register);
router.get('/login', homeControllers.login);
router.get('/dashboard',auth, homeControllers.dashboard);
router.post('/login', homeControllers.login_Post);
router.post('/register', homeControllers.register_Post);

module.exports = router