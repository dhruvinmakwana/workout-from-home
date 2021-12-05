
/**
 * @file This file contains the model functions responsible for performing databse operations for the ExcerciseSession
 * @author Dhruvin Hasmukh Makwana, Darshil Hirenkumar Shah, ​Mahima Vadlamudi​, Mannat Jyot Singh
 */
/**
 * This file contains the model functions responsible for performing databse operations for the ExcerciseSession
 * @module Model/ExcerciseSession
 */
const mongoose = require('mongoose');
/**
 * Describes the schema of the ExerciseSession document
 */
const ExerciseSessionSchema = new mongoose.Schema({
    // Model attributes are defined here
    id: {
        type: 'ObjectId',
    },
    username: {
        type: String,
        required: true
    },
    startedAt: {
        type: Number,
    },
    workoutType: {
        type: String,
    },
    endedAt: {
        type: Number,
    },
    accuracy: {
        type: Number,
    },
    reps: {
        type: Number,
    },
})


 ExerciseSessionSchema.statics.startExcerciseSession = async function (ExerciseSessionObj) {
/**
 * creates a new excercise session for a specified user
 * @function startExcerciseSession
 * @param {object} ExerciseSessionObj 
 * @returns exercise session id
 */
    var exerciseSession = await mongoose.model('ExerciseSession').create({
        username: ExerciseSessionObj.username,
        workoutType: ExerciseSessionObj.workoutType,
        startedAt: new Date().getTime()
    })
    await exerciseSession.save()
    return exerciseSession._id
}


ExerciseSessionSchema.statics.updateExerciseSession = async function (ExerciseSessionObj) {
    /**
 * This functions updates the user session data based on the  ExerciseSessionObj passed
 * @function updateExerciseSession
 * @param {object} ExerciseSessionObj 
 * @returns null
 */
    console.log(ExerciseSessionObj)
    var session = await mongoose.model('ExerciseSession').updateOne({
        _id:ExerciseSessionObj.sessionID
    }, {
        $set:{reps: parseInt(ExerciseSessionObj.reps)},

    })
    console.log(session)
}

ExerciseSessionSchema.statics.endExerciseSession = async function (ExerciseSessionObj) {
        /**
 * This functions ends the user session data based on the  ExerciseSessionObj passed
 * @function endExerciseSession
 * @param {object} ExerciseSessionObj 
 * @returns null
 */
    var session = await mongoose.model('ExerciseSession').updateOne({
        _id:ExerciseSessionObj.sessionID
    }, {
        endedAt: new Date().getTime(),
        accuracy:ExerciseSessionObj.accuracy,

    })
}

ExerciseSessionSchema.statics.getUserSessions = async function (username) {
        /**
 * This functions gets previous  user session data based on the  username passed
 * @function getUserSessions
 * @param {String} username 
 * @returns {object} userSessions
 */
    var userSessions = await mongoose.model('ExerciseSession').find({
        username:username
    },"username startedAt endedAt accuracy workoutType -_id")
    return userSessions
}
ExerciseSessionSchema.statics.getMostRecentWorkout = async function (username) {
/**
 * This functions gets most recent workout performed by the user based on the  username passed
 * @function getMostRecentWorkout
 * @param {String} username 
 * @returns {string} workoutType
 */
    var userSessions = await mongoose.model('ExerciseSession').findOne({
        username:username
    },"username startedAt endedAt accuracy workoutType -_id").sort({startedAt:-1})
    if(userSessions){
        return userSessions.workoutType    
    }else{
        return ""
    }
    
}
ExerciseSessionSchema.statics.getAverageAccuracy = async function (username) {
/**
 * This functions calculates the average accuracy of the workouts performed by the user based on the  username passed
 * @function getAverageAccuracy
 * @param {String} username 
 * @returns {int} averageAccuracy
 */
    var workouts=0
    var totalAccuracy=0
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0);
    console.log(firstDay)
    console.log(lastDay)
    for(var start=firstDay.getTime();start<=lastDay.getTime();start+=86400000){
        var userSessions = await mongoose.model('ExerciseSession').find({
            username:username,
            $and: [{ startedAt: { $gte : start} }, { startedAt: { $lte:start+86400000} }]
        },"userID startedAt endedAt accuracy workoutType -_id")
        userSessions.forEach(element => {
            console.log(element)
            if(element.accuracy){
                totalAccuracy+=element.accuracy
                workouts++;
            }
        });
    
    }   
    if(workouts>0){
        return parseInt(totalAccuracy/workouts)
    }else{
        return 0
    }
}
ExerciseSessionSchema.statics.getStreak = async function (username) {
    /**
 * This functions calculates the number of days user has performed workouts in a month based on the  username passed
 * @function getStreak
 * @param {String} username 
 * @returns {int} streak
 */
    var streak=0
    var date = new Date();
    console.log(username)
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0);
    console.log(firstDay)
    console.log(lastDay)
    for(var start=firstDay.getTime();start<=lastDay.getTime();start+=86400000){
        var userSessions = await mongoose.model('ExerciseSession').find({
            username:username,
            $and: [{ startedAt: { $gte : start} }, { startedAt: { $lte:start+86400000} }]
        },"userID startedAt endedAt accuracy workoutType -_id")
        console.log(userSessions)
        if(userSessions.length){
            streak++;
        }
    
    }   

    return streak
}


const ExerciseSession = mongoose.model('ExerciseSession', ExerciseSessionSchema);
module.exports = { ExerciseSession };