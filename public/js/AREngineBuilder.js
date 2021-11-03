class ARWorkoutEngineBuilder  {

    constructor(){
        
    }

    addUserVideo(userVideo){
        this.userVideo=userVideo
        return this
    }
    addUserStream(userStream){
        this.userStream=userStream
        return this
    }
    addUserCanvas(userCanvas){
        this.userCanvas=userCanvas
        return this
    }
    addDrawingCanvas(drawingCanvas){
        this.drawingCanvas=drawingCanvas
        return this
    }
    
    build(){
        return new ARWorkoutEngine(this)
    }
}