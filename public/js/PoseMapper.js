/**
 * @file Class that is responsible performing tasks related to analysing user's body movement based on current vs expected position.
 * @author Mansi Brahmbhatt, Girik Prabhakar, Ripudaman Uppal
 */
/**
 * Class that is responsible performing tasks related to analysing user's body movement based on current vs expected position.
 */
class PoseMapper{
    /**
     * Create instance of the Posemapper based on  which canvas to use for animating objects.
     * @param {HTMLCanvasElement} drawingCanvas 
     */
    constructor(drawingCanvas){
        window.LEFT_SHOULDER="left_shoulder"
        window.RIGHT_SHOULDER="right_shoulder"
        window.LEFT_WRIST="left_wrist"
        window.RIGHT_WRIST="right_wrist"
        window.LEFT_HIP="left_hip"
        window.RIGHT_HIP="right_hip"
        window.LEFT_ELBOW="left_elbow"
        window.RIGHT_ELBOW="right_elbow"
        window.LEFT_KNEE="left_knee"
        window.RIGHT_KNEE="right_knee"
        this.currentRestucturedPosedata=[]
        this.workoutTime=20
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
        this.MOST_ERRORS=0
        this.startedAt=0
        this.endedAt=0
        this.workoutIsActive=false
        //call from somewhere else
    }

    getNextStep(){

    }
    getCurrentStep(){

    }
    
    /**
     * Go to the next step of the workout
     */
    goToNextStep(){
        if(this.nextStepIndex==this.stepsLeft.length-1){
            this.nextDirection=-1
        }
        if(this.nextStepIndex==0){
            this.nextDirection=1
            this.reps+=1
            this.repUpdateCallback({'reps':this.reps})
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

    /**
     * Initiate workout session by loading the expected position points of respective workouts.
     * @param {string} workoutType - current workout type 
     * 
     */
    startWorkout(workoutType){
        // Fetch steps data

        if(!this.initialized){
            this.initialized=true
        }else{
            return
        }
        switch (workoutType) {
            case "biceps":
                this.currentWorkout=workoutType
                this.loadBicepPoints()
                break;
            case "shoulders":
                this.currentWorkout=workoutType
                this.loadShoulderPoints()
                break;
            case "legs":
                this.currentWorkout=workoutType
                this.loadLegsPoints()
                break;
            
            default:
                break;
        }
        // this.currentWorkout='biceps'
        this.currentStepIndex=0
        this.workoutIsActive=true
        this.canvasAnimator.addObject(this.stepsLeft[this.currentStepIndex].movingPoint,"red")
        this.canvasAnimator.addObject(this.stepsLeft[this.nextStepIndex].pointOfReference,"green")

        this.canvasAnimator.addObject(this.stepsRight[this.currentStepIndex].movingPoint,"red")
        this.canvasAnimator.addObject(this.stepsRight[this.nextStepIndex].pointOfReference,"green")
        // this.startedAt=new Date().getTime() / 1000;
    }
    /**
     * Load points related to the bicep workouts
     */
    loadBicepPoints(){
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
    }
    /**
     * Load points related to the shoulder workout.
     */
    loadShoulderPoints(){
        this.stepsLeft=[
            {
                pointOfReference:window.LEFT_HIP,
                movingPoint:window.LEFT_WRIST,
                allowedError:50,
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
                pointOfReference:window.RIGHT_SHOULDER,
                movingPoint:window.RIGHT_WRIST,
                allowedError:50
            }
        ]
    }
    /**
     * Load points related to the leg workout.
     */
    loadLegsPoints(){
        this.stepsLeft=[
            {
                pointOfReference:window.LEFT_HIP,
                movingPoint:window.LEFT_HIP,
                allowedError:50,
            },
            {
                pointOfReference:window.LEFT_KNEE,
                movingPoint:window.LEFT_HIP,
                allowedError:50
            }
        ]
        this.stepsRight=[    
            //right movement
            {
                pointOfReference:window.RIGHT_KNEE,
                movingPoint:window.RIGHT_HIP,
                allowedError:50
            },
            {
                pointOfReference:window.RIGHT_KNEE,
                movingPoint:window.RIGHT_HIP,
                allowedError:50
            }
        ]
    }
    /**
     * End user's workout session
     */
    endWorkout(workoutType){
        // Fetch steps data
        this.workoutIsActive=false
        this.currentWorkout='biceps'
        this.currentStepIndex=0

        this.endedAt=new Date().getTime() / 1000;
        this.timeBasedAccuracy=this.workoutTime/(this.endedAt-this.startedAt)
        this.postureAccuracy=1-(this.workoutError/this.MOST_ERRORS)
        this.accuracy=(this.timeBasedAccuracy+this.postureAccuracy)/2
        if(this.accuracy>=1){
            this.accuracy=100
        }else{
            this.accuracy*=100
            this.accuracy=Math.ceil(this.accuracy)
        }
        this.canvasAnimator.clearObjects();
        this.workoutEndCallback({'accuracy':this.accuracy})
        
    }
    /**
     * register callback functions on workout end
     * @param {function} fn callback function 
     */
    onWorkoutEnd(fn){
        this.workoutEndCallback=fn
    }
    /**
     * register callback functions for reps updated workout event.
     * @param {function} fn callback function 
     */
    onRepsUpdate(fn){
        this.repUpdateCallback=fn
    }
    /**
     * Update current workout points to the newly detected workout points.
     * @param {array} posedata - array containing list of objects representing body pose data 
     */
    updateKeyPoints(posedata){
        this.currentRestucturedPosedata=posedata
        this.verifyKeyPoints()

    }
    /**
     * get current rep count
     * @returns {int} reps-count of current reps
     */
    get_reps() {
        return this.reps
    }

    /**
     * Verify new keypoints to check if they are in expected range based on workout type .
     */
    verifyKeyPoints(){
        this.verifyKeyPointsforBiceps()
        //verifyKeyPointsforExercise2
    }
    /**
     * Perform verification steps for keypoints for bicep woprkout
     * 
     */
    verifyKeyPointsforBiceps(){
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
                this.MOST_ERRORS+=50
                this.goToNextStep()
                if(this.startedAt==0){
                    this.startedAt=new Date().getTime() / 1000;
                }
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

    /**
     * Perform verification steps for keypoints for shoulder workout
     * 
     */
    verifyKeyPointsforShoulder(){
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
                if(this.startedAt==0){
                    this.startedAt=new Date().getTime() / 1000;
                }
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
    /**
     * get distance between expected pose and current pose
     */
    getDistanceBetweenExpectedVSCurrent(){
        this.distanceBetweenExpectedVSCurrentSteps=0

        this.distanceBetweenExpectedVSCurrentSteps+=this.euclidianDist(this.currentRestucturedPosedata[this.stepsLeft[this.currentStepIndex].movingPoint],
            this.currentRestucturedPosedata[this.stepsLeft[this.nextStepIndex].pointOfReference])
        this.distanceBetweenExpectedVSCurrentSteps+=this.euclidianDist(this.currentRestucturedPosedata[this.stepsRight[this.currentStepIndex].movingPoint],
            this.currentRestucturedPosedata[this.stepsRight[this.nextStepIndex].pointOfReference])
        console.info("distance"+this.distanceBetweenExpectedVSCurrentSteps)
    }

    /**
     * get euclidian distance between points p1 and p2
     * @param {object} p1 
     * @param {object} p2 
     * @returns {float} distance between two points
     */
    euclidianDist(p1,p2){
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    }
    /**
     * Log error message to console
     * @param {string} message 
     */
    logError=(message)=>{
        console.log('%c  '+message, 'background: #222; color: red;font-weight:30pt',
            'Error');
    }
       /**
     * Log success message to console
     * @param {string} message 
     */
    logSuccess=(message)=>{
        console.log('%c  '+message, 'background: #222; color: green;font-weight:30pt',
            'Success');
    }
       /**
     * Log info message to console
     * @param {string} message 
     */
    logInfo=(message)=>{
        console.log('%c  '+message, 'background: #222; color: yellow;font-weight:30pt',
            'Success');
    }
       /**
     * display message on the html element with id specified by input parameter id
     * @param {string} id - element id on which to display message  
     * @param {string} message 
     */
    debugToElement(id,message){
        $('#'+id).text(message)
    }
}