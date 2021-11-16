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
        username: ExerciseSessionObj.username,
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
        reps: ExerciseSessionObj.reps,

    })
}

ExerciseSessionSchema.statics.endExerciseSession = async function (ExerciseSessionObj) {
    var session = await mongoose.model('ExerciseSession').updateOne({
        sessionID:ExerciseSessionObj.sessionID
    }, {
        endedAt: new Date().getTime(),
        accuracy:ExerciseSessionObj.accuracy,

    })
}

ExerciseSessionSchema.statics.getUserSessions = async function (username) {
    var userSessions = await mongoose.model('ExerciseSession').find({
        username:username
    },"username startedAt endedAt accuracy workoutType -_id")
    return userSessions
}
ExerciseSessionSchema.statics.getMostRecentWorkout = async function (username) {
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
    var workouts=0
    var totalAccuracy=0
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth()+1, -1);
    console.log(firstDay)
    console.log(lastDay)
    for(var start=firstDay.getTime();start<lastDay.getTime();start+=86400000){
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