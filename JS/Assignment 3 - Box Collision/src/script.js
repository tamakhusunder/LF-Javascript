const viewport = document.getElementById('viewport');
const boundaryWidth = 1000;
const boundaryHeight = 600;


class Ball{
    constructor(x, y, radius, color){
        var self = this;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        
    }

    drawBall(){
        this.dx = getDirection();
        this.dy = getDirection();
        this.ball = document.createElement("div");
        this.ball.classList.add("ball");
        this.ball.style.width = 2*this.radius + "px";
        this.ball.style.height = 2*this.radius + "px";

        this.ball.style.top = this.y + "px";
        this.ball.style.left = this.x + "px";
        this.ball.style.position = "absolute";
        this.ball.style.background = this.color;

        viewport.appendChild(this.ball);
        this.moveBall();
    }

    moveBall(){
        setInterval(() => {
            this.x += speed * this.dx;
            this.y += speed * this.dy;
            this.ball.style.top = this.y + "px";
            this.ball.style.left = this.x + "px";
            
            this.checkWallCollision();
            this.checkBallCollision();
            
        }, 1000/fps);
    }

    
    checkWallCollision(){
        if (this.x > boundaryWidth-2*this.radius) {
            this.dx = -1;
        }

        if (this.y > boundaryHeight-2*this.radius) {
            this.dy = -1;
        }

        if (this.x < 0){
            this.dx = 1;
        }
        if(this.y < 0){
            this.dy = 1;
        }
    }

    checkBallCollision(){
        ballArray.forEach((valueBall) => {
            if (valueBall !== this) {
                let d = getDistance(this.x, this.y, valueBall.x, valueBall.y);
                if (d <= (this.radius + valueBall.radius)){
                        if (this.x < valueBall.x) {
                            this.dx = -1; 
                        }
                        else{
                            this.dx = 1; 
                        }
                        if (this.y < valueBall.y) {
                            this.dy = -1; 
                        }
                        else{
                            this.dy = 1; 
                        }
                        
                }
            
            }
        });

    }  
 

        
}




//start up
const ballCount = 100;
const ballArray = [];
const fps = 60;
const speed = 1;

//creating ball array to create list of class object
for(let i = 0; i< ballCount; i++){
    let radius = getRandomInt(5,10);
    let x = getRandomInt(radius,boundaryWidth-2*radius);
    let y = getRandomInt(radius,boundaryHeight-2*radius);
    let color = generateRandomColor();

    // detect collision while generating new ball an creating new center
    if(i !== 0){
        for (let j = 0; j < i; j++){
            let d = getDistance(x, y, ballArray[j].x, ballArray[j].y);
            if (d <= (radius + ballArray[j].radius)){
                x = getRandomInt(radius,boundaryWidth-2*radius);
                y = getRandomInt(radius,boundaryHeight-2*radius);
            }
        }
    }

    let ball = new Ball(x,y,radius,color);
    ballArray.push(ball);

}

//drawing the each ball using class
ballArray.forEach((valueBall) => {
    valueBall.drawBall()
});

