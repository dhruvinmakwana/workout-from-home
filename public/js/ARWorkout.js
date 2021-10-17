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


    }
    async initializePoseNet(){
        const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
        this.detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    }
    async  initializeCamera() {
        const camera = new Camera(this.userVideo, {
            onFrame: async () => {
                this.drawUserStream();
                // await faceMesh.send({ image: this.augmentationCanvas });
            },
            width: 1280,
            height: 720,
        });
        camera.start(this.userStream);

    }
    async performPredictions(){
        const poses = await this.detector.estimatePoses(image);
    }
    drawUserStream(){
        this.userCanvasContext.drawImage(this.userVideo,0,0,this.userVideo.videoWidth, this.userVideo.videoHeight)
    }
}