class CanvasAnimator{
    constructor(){
        this.objects=[]
        this.loop=false
        this.LEFT_SHOULDER="left_shoulder"
        this.RIGHT_SHOULDER="right_shoulder"
        this.LEFT_WRIST="left_wrist"
        this.RIGHT_WRIST="right_wrist"
        this.LEFT_HIP="left_hip"
        this.RIGHT_HIP="right_hip"
        this.MOVING_POINT="moving_point"
        this.keyPoints=[]
        this.canvasObjects=[]
        this.circleRadius=10
        // this.canvasObjects[this.LEFT_SHOULDER]={
        //     radius: this.circleRadius, fill: 'green', x: 100, y: 100,flipY:true
        // }
        // this.canvasObjects[this.RIGHT_SHOULDER]={
        // radius: this.circleRadius, fill: 'green', x: 100, y: 100,flipY:true

        // }
        // this.canvasObjects[this.LEFT_HIP]={
        // radius: this.circleRadius, fill: 'green', x: 100, y: 100,flipY:true

        // }
        // this.canvasObjects[this.RIGHT_HIP]={
        // radius: this.circleRadius, fill: 'green', x: 100, y: 100,flipY:true

        // }
        // this.canvasObjects[this.LEFT_WRIST]={
        //     radius: this.circleRadius, fill: 'green', x: 100, y: 100,flipY:true
        // }
        // this.canvasObjects[this.RIGHT_WRIST]={
        //     radius: this.circleRadius, fill: 'green', x: 100, y: 100,flipY:true
        // }
        this.draw()
    }
    addObject(key,color){
        this.canvasObjects[key]={
            radius: this.circleRadius, color, x: 100, y: 100,flipY:true
        }

    }
    clearObjects(){
        this.canvasObjects=[]
    }
    updateKeyPoints(keyPoints){
        Object.keys(keyPoints).forEach((key)=>{
            if(key in this.canvasObjects){
                this.canvasObjects[key].x=keyPoints[key].x
                this.canvasObjects[key].y=keyPoints[key].y
            }
        })
        // keyPoints.keypoints.forEach((elm)=>{
        //     if(elm.name in this.canvasObjects){
        //         // this.canvasObjects[elm.name].set("left",elm.x).set('top',elm.y)
        //         this.canvasObjects[elm.name].set('left', elm.x-(this.circleRadius/2), {
        //             onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas)
        //           }).set('top', elm.y-(this.circleRadius/2), {
        //             onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas)
        //           });
        //                       }
        //     // console.log(elm)/
        // })
        // this.fabricCanvas.requestRenderAll();

        this.keyPoints=keyPoints
    }
    addCanvas(canvas){
        this.canvas=canvas
        this.canvasContext=canvas.getContext('2d')


        // this.fabricCanvas = new fabric.Canvas('drawing-canvas');
        // this.fabricCanvas.setHeight(480);
        // this.fabricCanvas.setWidth(640);
        // this.fabricCanvas.renderAll();
        // this.canvasContext.translate(this.canvas.width, 0);
        // this.canvasContext.scale(-1, 1);
        for(var key in this.canvasObjects){
            this.fabricCanvas.add( this.canvasObjects[key])
        }

    }

    drawCircle(x,y,color){
        this.canvasContext.fillStyle = color;
        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, this.circleRadius, 0, 2 * Math.PI);
        this.canvasContext.fill();
    }
    startLoop(){
        this.loop=true
    }
    endLoop(){
        this.loop=false
    }
    draw(){
        if(Object.keys(this.canvasObjects).length>0){
            this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
            Object.keys(this.canvasObjects).forEach((key)=>{
                var elm=this.canvasObjects[key]
                this.drawCircle(elm.x,elm.y,elm.color)
            })
            
        }

        window.requestAnimationFrame(this.draw.bind(this));
    }
}