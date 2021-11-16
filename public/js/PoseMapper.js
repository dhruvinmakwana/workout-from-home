class PoseMapper{
    constructor(drawingCanvas){
        window.LEFT_SHOULDER="left_shoulder"
        window.RIGHT_SHOULDER="right_shoulder"
        window.LEFT_WRIST="left_wrist"
        window.RIGHT_WRIST="right_wrist"
        window.LEFT_HIP="left_hip"
        window.RIGHT_HIP="right_hip"
        window.LEFT_ELBOW="left_elbow"
        window.RIGHT_ELBOW="right_elbow"
        this.currentRestucturedPosedata=[]
        this.workoutTime=6
        this.stepsLeft=[
            {
                pointOfReference:window.LEFT_HIP,
                movingPoint:window.LEFT_WRIST,
                allowedError:50,
            },
            {
                pointOfReference:window.LEFT_ELBOW,
                movingPoint:window.LEFT_WRIST,
                allowedError:50
            },
            {
                pointOfReference:window.LEFT_SHOULDER,
                movingPoint:window.LEFT_WRIST,
                allowedError:50
            }
        ]
        this.stepsRight=[    
            //right movement
            {
                pointOfReference:window.RIGHT_HIP,
                movingPoint:window.RIGHT_WRIST,
                allowedError:50
            },
            {
                pointOfReference:window.RIGHT_ELBOW,
                movingPoint:window.RIGHT_WRIST,
                allowedError:50
            },
            {
                pointOfReference:window.RIGHT_SHOULDER,
                movingPoint:window.RIGHT_WRIST,
                allowedError:50
            }
        ]
        this.currentStepIndex=0
        this.nextStepIndex=1
        this.nextDirection=1
        this.currentrDirection=1
        this.canvasAnimator=new CanvasAnimator()
        this.canvasAnimator.addCanvas(drawingCanvas)
        this.initialized=false
        this.reps=0
        this.totalReps=5
        this.workoutAccuracy=100
        this.workoutError=0
        this.startedAt=0
        this.endedAt=0
        this.workoutIsActive=false
        //call from somewhere else
    }

    getNextStep(){

    }
    getCurrentStep(){

    }
    goToNextStep(){
        if(this.nextStepIndex==this.stepsLeft.length-1){
            this.nextDirection=-1
        }
        if(this.nextStepIndex==0){
            this.nextDirection=1
            this.reps+=1
            if(this.totalReps===this.reps){
                this.endWorkout()
            }
        }
        if(this.currentStepIndex==this.stepsLeft.length-1){
            this.currentDirection=-1
            
        }
        if(this.currentStepIndex==0){
            this.currentDirection=1
        }
        this.nextStepIndex+=(1*this.nextDirection)
        this.currentStepIndex+=(1*this.currentDirection)
    }
    startWorkout(workoutType){
        // Fetch steps data

        if(!this.initialized){
            this.initialized=true
        }else{
            return
        }
        this.currentWorkout='biceps'
        this.currentStepIndex=0
        this.workoutIsActive=true
        this.canvasAnimator.addObject(this.stepsLeft[this.currentStepIndex].movingPoint,"red")
        this.canvasAnimator.addObject(this.stepsLeft[this.nextStepIndex].pointOfReference,"green")

        this.canvasAnimator.addObject(this.stepsRight[this.currentStepIndex].movingPoint,"red")
        this.canvasAnimator.addObject(this.stepsRight[this.nextStepIndex].pointOfReference,"green")
        this.startedAt=new Date().getTime() / 1000;
    }
    endWorkout(workoutType){
        // Fetch steps data
        this.workoutIsActive=false
        this.currentWorkout='biceps'
        this.currentStepIndex=0

        this.endedAt=new Date().getTime() / 1000;
        this.accuracy=this.workoutTime/(this.endedAt-this.startedAt)
        if(this.accuracy>=1){
            this.accuracy=100
        }else{
            this.accuracy*=100
            this.accuracy=Math.ceil(this.accuracy)
        }
        this.canvasAnimator.clearObjects();
        this.workoutEndCallback({'accuracy':this.accuracy})
        
    }
    onWorkoutEnd(fn){
        this.workoutEndCallback=fn
    }
    updateKeyPoints(posedata){
        this.currentRestucturedPosedata=posedata
        this.verifyKeyPoints()

    }

    verifyKeyPoints(){
        if(!this.workoutIsActive){
            return
        }
        this.bodyPositionFlag=true
        //left movement
        this.stepsLeft.forEach((elm)=>{
            if(this.bodyPositionFlag){
                if(
                this.currentRestucturedPosedata[elm.pointOfReference].score<0.4
                || this.currentRestucturedPosedata[elm.movingPoint].score<0.4
                ){
                    this.bodyPositionFlag=false
                    return
                }
            }
        })
        //Right Movement
        this.stepsRight.forEach((elm)=>{
            if(this.bodyPositionFlag){
                if(
                this.currentRestucturedPosedata[elm.pointOfReference].score<0.4
                || this.currentRestucturedPosedata[elm.movingPoint].score<0.4
                ){
                    this.bodyPositionFlag=false
                    return
                }
            }
        })
        if(this.bodyPositionFlag){
            this.logSuccess('Body visible')
            this.getDistanceBetweenExpectedVSCurrent()
            if(this.distanceBetweenExpectedVSCurrentSteps<=50){
                this.workoutError+=this.distanceBetweenExpectedVSCurrentSteps;
                this.goToNextStep()
                this.canvasAnimator.clearObjects();
                this.canvasAnimator.addObject(this.stepsLeft[this.currentStepIndex].movingPoint,"red")
                this.canvasAnimator.addObject(this.stepsLeft[this.nextStepIndex].pointOfReference,"green")

                this.canvasAnimator.addObject(this.stepsRight[this.currentStepIndex].movingPoint,"red")
                this.canvasAnimator.addObject(this.stepsRight[this.nextStepIndex].pointOfReference,"green")
            }
            this.debugToElement('pose-status',"visible")
            this.debugToElement('pose-error',this.workoutError)
        }else{
            this.logError("Not visible properly")
            this.debugToElement('pose-status',"not visible")
            // console.log(this.currentRestucturedPosedata)
        }
         
        this.logInfo("current step:"+this.currentStepIndex)
        this.logInfo("next step:"+this.nextStepIndex)
        this.debugToElement('current-step',this.currentStepIndex)
        this.debugToElement('next-step',this.nextStepIndex)
        this.debugToElement('euclidian-distance',this.distanceBetweenExpectedVSCurrentSteps)
        this.debugToElement('reps',this.reps)
        // if(!this.initialized){
        //     this.startWorkout()
        //     this.initialized=true
        // }
        this.canvasAnimator.updateKeyPoints(this.currentRestucturedPosedata)
    }
    getDistanceBetweenExpectedVSCurrent(){
        this.distanceBetweenExpectedVSCurrentSteps=0

        this.distanceBetweenExpectedVSCurrentSteps+=this.euclidianDist(this.currentRestucturedPosedata[this.stepsLeft[this.currentStepIndex].movingPoint],
            this.currentRestucturedPosedata[this.stepsLeft[this.nextStepIndex].pointOfReference])
        this.distanceBetweenExpectedVSCurrentSteps+=this.euclidianDist(this.currentRestucturedPosedata[this.stepsRight[this.currentStepIndex].movingPoint],
            this.currentRestucturedPosedata[this.stepsRight[this.nextStepIndex].pointOfReference])
        console.info("distance"+this.distanceBetweenExpectedVSCurrentSteps)
    }
    euclidianDist(p1,p2){
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    }
    logError=(message)=>{
        console.log('%c  '+message, 'background: #222; color: red;font-weight:30pt',
            'Error');
    }
    logSuccess=(message)=>{
        console.log('%c  '+message, 'background: #222; color: green;font-weight:30pt',
            'Success');
    }
    logInfo=(message)=>{
        console.log('%c  '+message, 'background: #222; color: yellow;font-weight:30pt',
            'Success');
    }
    debugToElement(id,message){
        $('#'+id).text(message)
    }
}