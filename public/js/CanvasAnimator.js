/**
 * @file Class that is used to animate objects on the screen based on the workout activity being performed.
 * @author Sagar Gupta
 */
/**
 * Class that is used to animate objects on the screen based on the workout activity being performed
 */
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
    /**
     * Add new object to the list of objects being animated.
     * @param {string} key - name of the object to be animated
     * @param {string} color -color of the object
     */
    addObject(key,color){ //add the objects (circles) which are defined on the basis of the colours, shape and size which helps the user to visualise the points
        this.canvasObjects[key]={
            radius: this.circleRadius, color, x: 100, y: 100,flipY:true
        }

    }
    /**
     * Remove all objects from being animated
     */
    clearObjects(){
        this.canvasObjects=[] // To clean the added objects
    }

    /**
     * based on the prediction from  the ARWorkoutEngine update keypoints of CanvasAnimator to reflect newly detected keypoints.
     * @param {Array} keyPoints - Array of objects representing 17 landmarks of the body.  
     */
    updateKeyPoints(keyPoints){ // to update the location (x,y coordinates) of the added objects
        Object.keys(keyPoints).forEach((key)=>{
            if(key in this.canvasObjects){
                this.canvasObjects[key].x=keyPoints[key].x
                this.canvasObjects[key].y=keyPoints[key].y
            }
        })


        this.keyPoints=keyPoints
    }
    /**
     * set the canvas to be used for animating objects on the screen.
     * @param {Canvas} canvas - HTML canvas on which to animate the objects 
     */
    addCanvas(canvas){ // canvas is selected based on the workout type
        this.canvas=canvas
        this.canvasContext=canvas.getContext('2d')

        for(var key in this.canvasObjects){
            this.fabricCanvas.add( this.canvasObjects[key])
        }

    }
    /**
     * Draw circle on the drawing canvas based on the value of the  x, y coordinate and color provided.  
     * @param {int} x - X cordinate of the center of the circle. 
     * @param {int} y - Y cordinate of the center of the circle.
     * @param {String} color - color of the circle being drawn 
     */
    drawCircle(x,y,color){
        this.canvasContext.fillStyle = color;
        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, this.circleRadius, 0, 2 * Math.PI);
        this.canvasContext.fill();
    }
    /**
     * Recursively looped function what constantly draws the objects on the upaded values of their X-Y coordinates to provide efect of the animation.
     */
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