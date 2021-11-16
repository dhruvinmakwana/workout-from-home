const { ReturnDocument } = require("mongodb");
const {ExerciseSession} = require("../models/exerciseSession.models");

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
const endSession = async (req, res, next) => {
    if(!req.body.sessionID){
        return res.status(400).json({
            message:'Invalid Request'
        })
    }
     await ExerciseSession.endExerciseSession({
        sessionID: req.body.sessionID,
        })
    return res.status(200).json({
        sessionID:req.body.sessionID,
        message:'session ended'
    })
}
const updateSession = async (req, res, next) => {
    if(!req.body.sessionID|| !req.body.accuracy){
        return res.status(400).json({
            message:'Invalid Request'
        })
    }
     await ExerciseSession.updateExerciseSession({
        sessionID: req.body.sessionID,
        accuracy:req.body.accuracy,
        reps:req.body.reps
        })
    return res.status(200).json({
        sessionID:req.body.sessionID,
        message:'session ended'
    })
}

const getSessions = async (req, res, next) => {
    if(!req.body.username){
        return res.status(400).json({
            message:'Invalid Request'
        })
    }
    var userSessions= await ExerciseSession.getUserSessions(req.body.username)
    return res.status(200).json(userSessions)
}

const workout = async (req, res, next) => {
    console.log(req.username)
    return res.render('workout',{user:{
        username:req.username,
        email:req.email
    }
    })
}

module.exports = {
    startSession,
    endSession,
    updateSession,
    getSessions,
    workout
  };