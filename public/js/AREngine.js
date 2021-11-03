class ARWorkoutEngine {
    static instance

    constructor({
        userVideo = "",
        userStream = "",
        userCanvas="",
        drawingCanvas=""
    } = {}) {
        this.userVideo=userVideo
        this.userCanvas=userCanvas
        this.userStream=userStream
        this.userCanvas.height= this.userVideo.videoHeight
        this.userCanvas.width= this.userVideo.videoWidth
        this.userCanvasContext=this.userCanvas.getContext("2d");
        this.userCanvasContext.translate(this.userCanvas.width, 0);
        this.userCanvasContext.scale(-1, 1);
        
        this.drawingCanvas=drawingCanvas
        this.drawingCanvas.height= this.userVideo.videoHeight
        this.drawingCanvas.width= this.userVideo.videoWidth

        this.initializePoseNet()
        this.initializeCamera()
        this.POSENET_LOADED=false
        this.sketcher=new Sketcher(this.userCanvas)
        ARWorkoutEngine.setInstance(this)
        this.NOSE='nose'
        window.LEFT_SHOULDER="left_shoulder"
        window.RIGHT_SHOULDER="right_shoulder"
        window.LEFT_WRIST="left_wrist"
        window.RIGHT_WRIST="right_wrist"
        window.LEFT_HIP="left_hip"
        window.RIGHT_HIP="right_hip"
        this.poseMapper=new PoseMapper(this.drawingCanvas)

    }
    async initializePoseNet(){
        const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
        this.detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
        $('body').trigger('model-loaded')
        this.POSENET_LOADED=true
    }
    async  initializeCamera() {
        const camera = new Camera(this.userVideo, {
            onFrame: async () => {
                this.drawUserStream();
                if(this.POSENET_LOADED){
                    this.performPredictions()
                }
            },
            width: 1280,
            height: 720,
        });
        camera.start(this.userStream);

    }
    async performPredictions(){
        const poses = await this.detector.estimatePoses(this.userVideo);
        // console.log(poses)
        // this.sketcher.drawPredictions(poses)
        this.restructuredPoseData={}
        if(poses.length==0){
            return
        }
        for (let index = 0; index < poses[0].keypoints.length; index++) {
            const element = poses[0].keypoints[index];
            this.restructuredPoseData[element.name]={
                x:element.x,
                y:element.y,
                score:element.score
            }
        }
        this.restructuredPoseData[window.LEFT_HIP].x*=1.05
        this.restructuredPoseData[window.RIGHT_HIP].x*=0.95
        // console.log(this.restructuredPoseData)
        this.poseMapper.updateKeyPoints(this.restructuredPoseData)

    }


    drawUserStream(){
        this.userCanvasContext.drawImage(this.userVideo,0,0,this.userVideo.videoWidth, this.userVideo.videoHeight)
    }
    updateCanvas(cv){
        this.userCanvas=cv
    }
    updateVideo(video){
        this.userVideo=video
    }
    updateStream(stream){
        this.userStream=stream
    }
    static setInstance(instance){
            this.instance=instance
    }
    static getInstance(){
        if(!this.instance){
            throw new Error('Cannot get ARWorkoutEngine instance without building it.')
        }else{
            return this.instance

        }
    }
}
