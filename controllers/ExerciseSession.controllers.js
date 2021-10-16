const {ExerciseSession} = require("../models/exerciseSession.models");

const startSession = async (req, res, next) => {
    if(!req.body.userID || !req.body.workoutType){
        return res.status(400).json({
            message:'Invalid Request'
        })
    }
    var exerciseSession= await ExerciseSession.startExcerciseSession({
        userID: req.body.userID,
        workoutType: req.body.workoutType,
        message:'session started'
    })
    return res.status(200).json({
        sessionID:exerciseSession._id
    })
}
const endSession = async (req, res, next) => {
    if(!req.body.sessionID|| !req.body.accuracy){
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

const getSessions = async (req, res, next) => {
    if(!req.body.userID){
        return res.status(400).json({
            message:'Invalid Request'
        })
    }
    var userSessions= await ExerciseSession.getUserSessions(req.body.userID)
    return res.status(200).json(userSessions)
}

module.exports = {
    startSession,
    endSession,
    getSessions
  };