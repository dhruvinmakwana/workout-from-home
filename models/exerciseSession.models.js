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
    userID: {
        type: String,
        required: true
    },
    startedAt: {
        type: Number,
    },
    workoutType: {
        type: Number,
    },
    endedAt: {
        type: Number,
    },
    accuracy: {
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

ExerciseSessionSchema.statics.endExerciseSession = async function (ExerciseSessionObj) {
    var session = await mongoose.model('ExerciseSession').updateOne({
        sessionID:ExerciseSessionObj.sessionID
    }, {
        accuracy:ExerciseSessionObj.accuracy,
        endedAt: new Date().getTime(),

    })
}


const ExerciseSession = mongoose.model('ExerciseSession', ExerciseSessionSchema);
module.exports = { ExerciseSession };