/** Class that is used to build the instance of ARWorkoutEngine in a step-wise manner following {@link https://en.wikipedia.org/wiki/Builder_pattern|the Gangs of Four design pattern}. */
class ARWorkoutEngineBuilder  {

    constructor(){
        
    }
    /**
     * Set user video element to be processed.
     * @param {HTMLVideoElement} userVideo 
     * @returns {ARWorkoutEngineBuilder}
     */
    addUserVideo(userVideo){
        this.userVideo=userVideo
        return this
    }

        /**
     * Set user Stream object .
     * @param {MediaStream} userStream 
     * @returns {ARWorkoutEngineBuilder}
     */
    addUserStream(userStream){
        this.userStream=userStream
        return this
    }

        /**
     * Set user canvas on which to draw user video.
     * @param {HTMLCanvasElement} userCanvas 
     * @returns {ARWorkoutEngineBuilder}
     */
    addUserCanvas(userCanvas){
        this.userCanvas=userCanvas
        return this
    }

        /**
     * Set canvas on which the object animation will be performed.
     * @param {HTMLCanvasElement} drawingCanvas 
     * @returns {ARWorkoutEngineBuilder} 
     */
    addDrawingCanvas(drawingCanvas){
        this.drawingCanvas=drawingCanvas
        return this
    }

        /**
     * Set current workout type.
     * @param {String} workoutType 
     * @returns {ARWorkoutEngineBuilder}
     */
    setWorkoutType(workoutType){
        this.workoutType=workoutType
        return this
    }
    /**
     * Build ARWorkoutEngine based on the values provided to the ARWorkoutEngineBuilder
     * @returns {ARWorkoutEngine}
     */
    build(){
        return new ARWorkoutEngine(this)
    }
}