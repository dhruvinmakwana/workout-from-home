const express = require('express');
const homeControllers = require('../controllers/home.controllers');
const router = express.Router();
const {verifyOrRedirect} = require("../middleware/auth");

router.get('/register', homeControllers.register);
router.get('/login', homeControllers.login);
router.get('/logout', homeControllers.logout);
router.get('/dashboard',verifyOrRedirect, homeControllers.dashboard);
router.post('/login', homeControllers.login_Post);
router.post('/register', homeControllers.register_Post);
router.get('/', (req,res)=>{
    return res.redirect(301,"login");
});
module.exports = router