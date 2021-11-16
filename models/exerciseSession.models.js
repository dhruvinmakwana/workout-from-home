// excercise session
//     data:
//         started at
//         workout type
//         ended at
//         accuracy 
//     methods:
//         session_id start_new_session ({workout_type})
//         end_session (session_id)
const mongoose = require('mongoose');
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
/**
 * creates a new excercise session for a specified user
 * @param {*} ExerciseSessionObj 
 * @returns exercise session id
 */
 ExerciseSessionSchema.statics.startExcerciseSession = async function (ExerciseSessionObj) {
    var exerciseSession = await mongoose.model('ExerciseSession').create({
        userID: ExerciseSessionObj.userID,
        workoutType: ExerciseSessionObj.workoutType,
        startedAt: new Date().getTime()
    })
    await exerciseSession.save()
    return exerciseSession._id
}
ExerciseSessionSchema.statics.updateExerciseSession = async function (ExerciseSessionObj) {
    var session = await mongoose.model('ExerciseSession').updateOne({
        sessionID:ExerciseSessionObj.sessionID
    }, {
        accuracy:ExerciseSessionObj.accuracy,
        reps: ExerciseSessionObj.reps,

    })
}

ExerciseSessionSchema.statics.endExerciseSession = async function (ExerciseSessionObj) {
    var session = await mongoose.model('ExerciseSession').updateOne({
        sessionID:ExerciseSessionObj.sessionID
    }, {
        endedAt: new Date().getTime(),

    })
}

ExerciseSessionSchema.statics.getUserSessions = async function (userID) {
    var userSessions = await mongoose.model('ExerciseSession').find({
        userID:userID
    },"userID startedAt endedAt accuracy workoutType -_id")
    return userSessions
}
ExerciseSessionSchema.statics.getStreak = async function (username) {
    var streak=0
    var date = new Date();
    console.log(username)
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth()+1, -1);
    console.log(firstDay)
    console.log(lastDay)
    for(var start=firstDay.getTime();start<lastDay.getTime();start+=86400000){
        var userSessions = await mongoose.model('ExerciseSession').find({
            // username:username,
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