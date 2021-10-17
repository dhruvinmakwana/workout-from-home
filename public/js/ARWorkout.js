class ARWorkoutEngine {
    constructor({
        userVideo = "",
        userStream = "",
        userCanvas=""
    } = {}) {
        this.userVideo=userVideo
        this.userCanvas=userCanvas
        this.userStream=userStream
        this.userCanvas.height= this.userVideo.videoHeight
        this.userCanvas.width= this.userVideo.videoWidth
        this.userCanvasContext=this.userCanvas.getContext("2d");
        this.userCanvasContext.translate(this.userCanvas.width, 0);
        this.userCanvasContext.scale(-1, 1);
        this.initializePoseNet()
        this.initializeCamera()
        this.POSENET_LOADED=false

    }
    async initializePoseNet(){
        const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
        this.detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
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
        console.log(poses)
        if(poses.length>0){
            poses[0].keypoints.forEach(element => {
            console.log()
            this.userCanvasContext.beginPath();
            this.userCanvasContext.arc(element.x, element.y, 5, 0, Math.PI*2, true);
            this.userCanvasContext.closePath();
            this.userCanvasContext.fillStyle = 'red';
            this.userCanvasContext.fill();
            });
        }

    }
    drawUserStream(){
        this.userCanvasContext.drawImage(this.userVideo,0,0,this.userVideo.videoWidth, this.userVideo.videoHeight)
    }
}