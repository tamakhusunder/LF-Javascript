const homePage = document.querySelector('.home-page');
const homeSoccerBtn = document.querySelector('.home-section-content').children[0];
const homeChickenBtn = document.querySelector('.home-section-content').children[1];
const homeSumoBtn = document.querySelector('.home-section-content').children[2];
const homeFishBtn = document.querySelector('.home-section-content').children[3];
const homePlayBtn = document.querySelector('.home-points-bottom-center');

const  gamePage = document.querySelector('.game');
const  soccer = document.querySelector('.game-soccer-top');
const  soccerBoundary = document.querySelector('.soccer-border');

const soccerBoundaryWidth = 850;
const soccerBoundaryHeight = 400;
const soccerCenterX = soccerBoundaryWidth/2;    //300
const soccerCenterY = soccerBoundaryHeight/2;   //200


// const ball = document.createElement('div');
// ball.style.width = 20 + 'px';
// ball.style.height = 20 + 'px';
// ball.style.position = 'absolute';
// ball.style.left = (soccerCenterX-10) + 'px';
// ball.style.top = (soccerCenterY-10) + 'px';
// ball.style.border = '1px solid blue';

// soccerBoundary.appendChild(ball);

// console.log(soccerBorder.style.width);
let angleList =[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5,360];
// let angleList =[0,45,90,135,180,225,270,,315,360];

const extraAngle=20;
let playerWidth = 80;
let playerHeight = 80;
let velocity = 0;
let walk = 1/8;
let initialBlueX = ((soccerBoundaryWidth)/2) - playerWidth*5;
let initialBlueY = (soccerBoundaryHeight)/2 - playerHeight/2;
let initialRedX = ((soccerBoundaryWidth)/2) + playerWidth*4;
let initialRedY = initialBlueY;

// var snd = new Audio("whistle.mp3"); // buffers automatically when created
// snd.play();

class Ball{
    constructor(){
        this.width = 60;
        this.height = 60;
        this.x = soccerCenterX-(this.width/2);
        this.y = soccerCenterY-(this.height/2);
        this.radius = this.width/2;
        this.direction = 1;
        this.velocity = 0;
        this.angleIt = 0;

    }
    draw() {
        this.ballElement = document.createElement('div');
        this.ballElement.classList.add("soccerBall");
        this.ballElement.style.width = this.width + 'px';
        this.ballElement.style.height = this.height + 'px';
        this.ballElement.style.position = 'absolute';
        this.ballElement.style.left = this.x + 'px';
        this.ballElement.style.top = this.y + 'px';
        this.ballElement.style.borderRadius = 50 + '%';
        this.ballElement.style.border = '1px solid blue';
        soccerBoundary.appendChild(this.ballElement);
        console.log(this.ballElement)
    }
    update(){
        // if (this.x > soccerBoundaryWidth-this.width){
        //     this.x = soccerBoundaryWidth-this.width;
        //     this.velocity = 0;
        //     this.ballElement.style.left = this.x + "px";
        // }
        // if (this.y > soccerBoundaryHeight-this.height){
        //     this.y = soccerBoundaryHeight-this.height;
        //     this.velocity = 0;
        //     this.ballElement.style.top = this.y + "px";
        // } 
        this.rotateBall();
        this.checkBallPlayerCollision();
    }

    rotateBall(){
        if((this.angleIt+1)%(360+2) == 0){
            this.angleIt=0;
        }
        this.angle = this.angleIt;
        this.angleIt++;
        this.ballElement.style.transform=`rotate(${this.angle}deg)`;
    }

    checkBallPlayerCollision(){
        if (pointsRectCollision(this,playerBlue)){
            let xDirection = playerBlue.x < ball.x ? 1 : -1;
            let yDirection = playerBlue.y < ball.y ? 1 : -1;
            console.log('sunder');
            this.x = this.x+10;
            this.ballElement.style.left = this.x + 'px';
        }
        if (pointsRectCollision(this,playerRed)){
            console.log('suTamaknder');
            this.x = this.x-10;
            this.ballElement.style.left = this.x + 'px';
        }
    }

}

let ball = new Ball();
ball.draw();


class Player{
    constructor(width,height,x,y,name,key,direction,velocity,walk){
        this.width = width;
        this.height = height;
        this.radius = this.width/2;
        this.x = x;
        this.y = y;
        this.name = name;
        this.key = key;
        this.rotate = 0;
        this.direction = direction;
        this.velocity = velocity;
        this.walk = walk;
        this.keyPressed = false;
        this.angleIt = 0;

        //player control event
        document.addEventListener('keydown',(event) =>{
            if(event.code == this.key){
                this.keyPressed = true;
                
            }
        });
        document.addEventListener('keyup',(event) =>{
            if(event.code == this.key){
                this.keyPressed = false;
                
            }
        });

    }
    draw() {
        this.playerElement = document.createElement('div');
        this.playerElement.classList.add(this.name);
        this.playerElement.style.width = this.width + 'px';
        this.playerElement.style.height = this.height + 'px';
        this.playerElement.style.position = 'absolute';
        this.playerElement.style.left = this.x + 'px';
        this.playerElement.style.top = this.y + 'px';
        this.playerElement.style.borderRadius =  50 + '%';
        this.playerElement.style.border = '1px solid blue';
        soccerBoundary.appendChild(this.playerElement);
        
    }
    update(){
        this.limitPlayerToBoundary()    
    }

    limitPlayerToBoundary(){
        if (this.x > soccerBoundaryWidth-this.width){
            this.x = soccerBoundaryWidth-this.width;
            this.velocity = 0;
            this.playerElement.style.left = this.x + "px";
        }
        if (this.y > soccerBoundaryHeight-this.height){
            this.y = soccerBoundaryHeight-this.height;
            this.velocity = 0;
            this.playerElement.style.top = this.y + "px";
        } 
        if(this.x < 0){
            this.x = 0;
            this.velocity = 0;
            this.playerElement.style.left = this.x + "px";
        }
        if(this.y < 0){
            this.y = 0;
            this.velocity = 0;
            this.playerElement.style.top = this.y + "px";
        }
        if (this.keyPressed == true) this.movePlayer();
        else this.rotatePlayer();
            
    }

    rotatePlayer(){
        if((this.angleIt+1)%(360+2) == 0){
            this.angleIt=0;
        }
        this.angle = this.angleIt;
        this.angleIt++;
        this.playerElement.style.transform=`rotate(${this.angle}deg)`;
    }

    //move player in all direction
    movePlayer(){
        if (this.keyPressed == true){
            if ((this.angle >= 360-extraAngle && this.angle <= 360) || (this.angle>=0 && this.angle<=0+extraAngle)){
                this.velocity += this.walk;
                this.x += this.velocity;
                this.playerElement.style.left = this.x + 'px';
            }
            else if (this.angle > extraAngle && this.angle < 90-extraAngle){
                this.velocity += this.walk;
                this.x += this.velocity;
                this.y += this.velocity;

                this.playerElement.style.left = this.x + 'px';
                this.playerElement.style.top = this.y + 'px';
            }
            else if (this.angle >= 90-extraAngle && this.angle <= 90+extraAngle){
                this.velocity += this.walk;
                this.y += this.velocity;
                this.playerElement.style.top = this.y + 'px';
            }
            else if (this.angle > 90+extraAngle && this.angle < 180-extraAngle){
                this.velocity += this.walk;
                this.x -= this.velocity;
                this.y += this.velocity;
                this.playerElement.style.left = this.x + 'px';
                this.playerElement.style.top = this.y + 'px';
            }
            else if (this.angle >= 180-extraAngle && this.angle <= 180+extraAngle){
                this.velocity += this.walk;
                this.x -= this.velocity;
                this.playerElement.style.left = this.x + 'px';
            }
            else if (this.angle > 180+extraAngle && this.angle < 270-extraAngle){
                this.velocity += this.walk;
                this.x -= this.velocity;
                this.y -= this.velocity;
                this.playerElement.style.left = this.x + 'px';
                this.playerElement.style.top = this.y + 'px';
            }
            else if (this.angle >= 270-extraAngle && this.angle <= 270+extraAngle){
                this.velocity += this.walk;
                this.y -= this.velocity;
                this.playerElement.style.top = this.y + 'px';
            }
            else if (this.angle > 270+extraAngle && this.angle < 360-extraAngle){
                this.velocity += this.walk;
                this.x += this.velocity;
                this.y -= this.velocity;
                this.playerElement.style.left = this.x + 'px';
                this.playerElement.style.top = this.y + 'px';
            }
        }
    }
    // checkBallCollision(){
    //     // this.dist = getDistance(this.x, this.y, ball.x, ball.y);
    //     // if (this.dist <= (this.radius + ball.radius)){
            
    //     //     audioKickBall.play();
    //     // }
    //     if (pointsRectCollision(this,ball)){

    //         console.log('sunder');
    //         ball.x = ball.x+10;
    //         ball.ballElement.style.left = ball.x + 'px';
    //     }
    // }
   
}


let playerBlue = new Player(playerWidth,playerHeight,initialBlueX,initialBlueY,'soccerBluePlayer','KeyA',1,velocity,walk);
let playerRed = new Player(playerWidth,playerHeight,initialRedX,initialRedY,'soccerRedPlayer','KeyL',-1,velocity,walk);
playerBlue.draw();
playerRed.draw();
function animation () {
    ball.update();
    playerBlue.update();
    playerRed.update();
    ball.checkBallPlayerCollision();
    // playerBlue.checkBallCollision();
    // playerRed.checkBallCollision();
    requestAnimationFrame(animation);
}
animation();
