const express = require('express');
const ExcerciseSessionControllers = require('../controllers/ExerciseSession.controllers');
const router = express.Router();
const {verifyOrRedirect} = require("../middleware/auth");

router.post('/startSession', ExcerciseSessionControllers.startSession);
router.post('/endSession', ExcerciseSessionControllers.endSession);
router.post('/updateSession', ExcerciseSessionControllers.updateSession);
router.post('/getSessions', ExcerciseSessionControllers.getSessions);

router.get('/workout/:workoutType',verifyOrRedirect, ExcerciseSessionControllers.workout);
router.get('/complete',verifyOrRedirect, ExcerciseSessionControllers.complete);



module.exports = router