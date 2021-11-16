class CanvasAnimator{
    constructor(){// initializing the list of objects (body parts)
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
        this.draw()
    }
    addObject(key,color){ //add the objects (circles) which are defined on the basis of the colours, shape and size which helps the user to visualise the points
        this.canvasObjects[key]={
            radius: this.circleRadius, color, x: 100, y: 100,flipY:true
        }

    }
    clearObjects(){
        this.canvasObjects=[] // To clean the added objects
    }
    updateKeyPoints(keyPoints){ // to update the location (x,y coordinates) of the added objects
        Object.keys(keyPoints).forEach((key)=>{
            if(key in this.canvasObjects){
                this.canvasObjects[key].x=keyPoints[key].x
                this.canvasObjects[key].y=keyPoints[key].y
            }
        })


        this.keyPoints=keyPoints
    }
    addCanvas(canvas){ // canvas is selected based on the workout type
        this.canvas=canvas
        this.canvasContext=canvas.getContext('2d')

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

    draw(){ // function which runs on loop to enable the construction and clearing of canvas 
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