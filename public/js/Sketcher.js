class Sketcher{
    constructor(canvasToDraw){
        this.canvasToDraw=canvasToDraw
        this.canvasToDrawContext=canvasToDraw.getContext('2d')
    }

    drawPredictions(poses){
        if(poses.length>0){
            poses[0].keypoints.forEach(element => {
            this.canvasToDrawContext.beginPath();
            this.canvasToDrawContext.arc(element.x, element.y, 5, 0, Math.PI*2, true);
            this.canvasToDrawContext.closePath();
            this.canvasToDrawContext.fillStyle = 'red';
            this.canvasToDrawContext.fill();
            });
        }
    }

}