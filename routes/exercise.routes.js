const express = require('express');
const ExcerciseSessionControllers = require('../controllers/ExerciseSession.controllers');
const router = express.Router();

router.post('/startSession', ExcerciseSessionControllers.startSession);
router.post('/endSession', ExcerciseSessionControllers.endSession);



module.exports = router