
//fn_soccer
function fn_soccer() {
    homePage.style.display = "none";
    game1.style.display = "block";

    const  soccer = document.querySelector('.game-soccer-top');
    const  soccerBoundary = document.querySelector('.soccer-border');


    const soccerInstruction = document.querySelector('.game-soccer-instruction');
    const soccerBoard = document.querySelector('.game-soccer-winnerBoard');
    const soccerBluePointDiv = document.querySelector('.soccer-point-blue');
    const soccerRedPointDiv = document.querySelector('.soccer-point-red');


    const soccerBoundaryWidth = 850;
    const soccerBoundaryHeight = 400;
    const soccerCenterX = soccerBoundaryWidth/2;    //425
    const soccerCenterY = soccerBoundaryHeight/2;   //200


    // const ball = document.createElement('div');
    // ball.style.width = 20 + 'px';
    // ball.style.height = 20 + 'px';
    // ball.style.position = 'absolute';
    // ball.style.left = (soccerCenterX-10) + 'px';
    // ball.style.top = (soccerCenterY-10) + 'px';
    // ball.style.border = '1px solid blue';

    // soccerBoundary.appendChild(ball);
    const state = {
        current : 0,
        getReady : 0,
        gameIn : 1,
        gameOver : 2
    }
    const extraAngle=20;
    let playerWidth = 80;
    let playerHeight = 80;
    let velocity = 0;
    let walk = 1/8;
    let initialBlueX = ((soccerBoundaryWidth)/2) - playerWidth*5;
    let initialBlueY = (soccerBoundaryHeight)/2 - playerHeight/2;
    let initialRedX = ((soccerBoundaryWidth)/2) + playerWidth*4;
    let initialRedY = initialBlueY;
    let soccerBluePoint = 0;
    let soccerRedPoint = 0;


    class GoalPost{
        constructor(width,height,x,y){
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
        }

        draw(){
            this.goalPostElement = document.createElement('div');
            this.goalPostElement.classList.add("soccerGoalPost");
            this.goalPostElement.style.width = this.width + 'px';
            this.goalPostElement.style.height = this.height + 'px';
            this.goalPostElement.style.position = 'absolute';
            this.goalPostElement.style.left = this.x + 'px';
            this.goalPostElement.style.top = this.y + 'px';
            soccerBoundary.appendChild(this.goalPostElement);
        }
    }


    let goalPost1 = new GoalPost(10,200,(0-40),soccerCenterY/2);
    let goalPost2 = new GoalPost(10,200,(soccerBoundaryWidth-10)+40,soccerCenterY/2);
    goalPost1.draw();
    goalPost2.draw();


    class Ball{
        constructor(){
            this.width = 60;
            this.height = 60;
            this.x = soccerCenterX-(this.width/2);  //395
            this.y = soccerCenterY-(this.height/2); //170
            this.radius = this.width/2;
            this.dx = 1;
            this.dy = 1;
            this.angleIt = 0;
            this.roll = 10;

            this.initialX = soccerCenterX-(this.width/2);
            this.initialY = soccerCenterY-(this.height/2);
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
                soccerBoundary.appendChild(this.ballElement);
        }

        update(){
            if (state.current == state.gameIn){ 
                this.rotateBall();
                this.checkBallPlayerCollision();
                this.checkGoalPostCollision();
            }
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
                let dist1 = getDistance(this.x,this.y,playerBlue.x,playerBlue.y)
                if ( dist1 <= this.radius+playerBlue.radius){
                    console.log("colide");
                    this.dx = ball.x > playerBlue.x ? 1 : -1;
                    this.x = this.x + this.roll * this.dx;
                    this.ballElement.style.left = this.x + 'px'; 
                }
                let dist2 = getDistance(this.x,this.y,playerRed.x,playerRed.y)
                if ( dist2 <= this.radius+playerRed.radius){
                    console.log("colide2");
                    this.dx = ball.x > playerRed.x ? 1 : -1; 
                    this.x = this.x + this.roll * this.dx;
                    this.ballElement.style.left = this.x + 'px'; 
                }
        }

        checkWallCollision(){
            if (this.x >  soccerBoundaryWidth-this.width) {
                this.dx = -1;
            }

            if (this.y >soccerBoundaryHeight-this.height) {
                this.dy = -1;
            }

            if (this.x < 0){
                this.dx = 1;
            }
            if(this.y < 0){
                this.dy = 1;
            }
        }

        checkGoalPostCollision(){
            if (pointsRectCollision(this,goalPost1)) {
                console.log("post1 collision");
                soccerRedPoint++;
                soccerRedPointDiv.innerHTML = soccerRedPoint;
                state.current = state.gameOver;
            
            }
            else if (pointsRectCollision(this,goalPost2)) {
                console.log("post2 collision");
                soccerBluePoint++;
                soccerBluePointDiv.innerHTML = soccerBluePoint;
                state.current = state.gameOver;
            }
        }

        reset(){
            this.x = this.initialX;
            this.y = this.initialY;
            this.ballElement.style.left = this.x + "px";
            this.ballElement.style.top = this.y + "px";
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

            this.initialX = x;
            this.initialY = y;

            //player control event with key A and L
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
            soccerBoundary.appendChild(this.playerElement);
            
        }
        update(){
            if( state.current == state.gameIn)
            this.limitPlayerToBoundarywithMovement() ; 
        }

        limitPlayerToBoundarywithMovement(){
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

        reset(){
            this.x = this.initialX;
            this.y = this.initialY;
            this.playerElement.style.left = this.x + "px";
            this.playerElement.style.top = this.y + "px";
        }
    }


    let playerBlue = new Player(playerWidth,playerHeight,initialBlueX,initialBlueY,'soccerBluePlayer','KeyA',1,velocity,walk);
    let playerRed = new Player(playerWidth,playerHeight,initialRedX,initialRedY,'soccerRedPlayer','KeyL',-1,velocity,walk);
    playerBlue.draw();
    playerRed.draw();


    // click event for switching 3 stage of screen of soccer game
    soccer.addEventListener("click", function (event) {
        // console.log("i am click");
        switch(state.current){
            case state.getReady:
                state.current = state.gameIn;
                break;
            case state.gameIn:
                break;
            case state.gameOver:
                state.current = state.gameIn;
                ball.reset();
                playerBlue.reset();
                playerRed.reset();
                break;
            default: 
        }
        if(state.current === state.gameIn)  whistleSound.play();
    });


    function showInstruction() {
        if (state.current === state.getReady){
            soccerInstruction.style.display = "block";
        }
        else soccerInstruction.style.display = "none";
    }


    function showBoard() {
        if (state.current === state.gameOver){
            soccerBoard.style.display = "block";
        }
        else soccerBoard.style.display = "none";
    }


    function animation () {
        // console.log(state.current)
        showInstruction();
        showBoard();
        playerBlue.update();
        playerRed.update();
        ball.update();
        requestAnimationFrame(animation);
    }


    animation();

}