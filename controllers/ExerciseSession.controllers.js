/**
 * @file this module handles the incoming requests for manipulating workout session.
 * @author Dhruvin Hasmukh Makwana, Darshil Hirenkumar Shah
 */
/**
 * Controller for ExcerciseSession
 * @module Controller/ExcerciseSession
 */
const { ReturnDocument } = require("mongodb");
const {ExerciseSession} = require("../models/exerciseSession.models");
/**
 * Handles the startSession of the workout handling endpoint
 * @param {Request} req -object
 * @param {Response} res -object 
 * @returns {Response} res -response object
 */
const startSession = async (req, res, next) => {
    if(!req.body.username || !req.body.workoutType){
        return res.status(400).json({
            message:'Invalid Request'
        })
    }
    var exerciseSession= await ExerciseSession.startExcerciseSession({
        username: req.body.username,
        workoutType: req.body.workoutType,
        message:'session started'
    })
    return res.status(200).json({
        sessionID:exerciseSession._id
    })
}
/**
 * Handles the endSession of the workout handling endpoint
 * @param {Request} req -object
 * @param {Response} res -object 
 * @returns {Response} res -response object
 */
const endSession = async (req, res, next) => {
    if(!req.body.sessionID){
        return res.status(400).json({
            message:'Invalid Request'
        })
    }
     await ExerciseSession.endExerciseSession({
        sessionID: req.body.sessionID,
        accuracy:req.body.accuracy
        })
    return res.status(200).json({
        sessionID:req.body.sessionID,
        message:'session ended'
    })
}

/**
 * Handles the completion of the workout handling endpoint and displays the completion screen to the user.
 * @param {Request} req -object
 * @param {Response} res -object 
 * @returns {Response} res -response object
 */
const complete = async (req, res) => {
    return res.render("complete",{user:{
        username:req.username,
        email:req.email,
    }
    })
}

/**
 * Updates the user session based o nthe workout data passed in the request body
 * @param {Request} req -object
 * @param {Response} res -object 
 * @returns {Response} res -response object
 */
const updateSession = async (req, res, next) => {
    if(!req.body.sessionID|| !req.body.reps){
        return res.status(400).json({
            message:'Invalid Request'
        })
    }
     await ExerciseSession.updateExerciseSession({
        sessionID: req.body.sessionID,
        reps:req.body.reps
        })
    return res.status(200).json({
        sessionID:req.body.sessionID,
        message:'session updated'
    })
}


/**
 * Displays the list of worjout session by the user
 * @param {Request} req -object
 * @param {Response} res -object 
 * @returns {Response} res -response object
 */
const getSessions = async (req, res, next) => {
    if(!req.body.username){
        return res.status(400).json({
            message:'Invalid Request'
        })
    }
    var userSessions= await ExerciseSession.getUserSessions(req.body.username)
    return res.status(200).json(userSessions)
}

/**
 * selects the workout model to be shown when the specific type of workout is selected and displays the workout screen.
 * @param {Request} req -object
 * @param {Response} res -object 
 * @returns {Response} res -response object
 */
const workout = async (req, res, next) => {
    console.log(req.username)
    var workoutImage=""
    switch (req.params.workoutType) {
        case "shoulders":
            workoutImage="images/uprightrow.gif"
            break;
        case "biceps":
            workoutImage="images/curls.gif"
            break;
    
        default:
            workoutImage=""
            break;
    }
    return res.render('workout',{user:{
        username:req.username,
        email:req.email,
        workoutImage:workoutImage,
        workoutType:req.params.workoutType
    }
    })
}

module.exports = {
    startSession,
    endSession,
    updateSession,
    getSessions,
    workout,
    complete
  };