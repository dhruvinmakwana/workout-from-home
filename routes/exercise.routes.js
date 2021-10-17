const express = require('express');
const ExcerciseSessionControllers = require('../controllers/ExerciseSession.controllers');
const router = express.Router();
const {verifyOrRedirect} = require("../middleware/auth");

router.post('/startSession', ExcerciseSessionControllers.startSession);
router.post('/endSession', ExcerciseSessionControllers.endSession);
router.post('/getSessions', ExcerciseSessionControllers.getSessions);

router.get('/workout',verifyOrRedirect, ExcerciseSessionControllers.workout);



module.exports = router