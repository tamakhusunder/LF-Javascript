/**
 * Function for whole soccer game to play
 */
function fn_soccer() {
    homePage.style.display = "none";
    game1.style.display = "block";


    /**
     * Event handler for back to home page
     */
    gotoHomepage = document.getElementById("soccer-gotoHomePage");
    gotoHomepage.addEventListener('click', function (event) {
        let homepage = fn_homePage();
    });


    /**
     * Accessing DOM of Soccer game
     */
    const soccerEntityControlDiv = document.querySelector(".game-soccer-entity-control");
    const soccerStageControlDiv = document.getElementById("soccer-stage-control");
    const soccer = document.querySelector('.game-soccer-top');
    const soccerBoundary = document.querySelector('.soccer-border');
    const soccerInstruction = document.querySelector('.game-soccer-instruction');
    const soccerBoard = document.querySelector('.game-soccer-winnerBoard');
    const soccerBoardline1Div= document.getElementById('soccer-winnerBoard-line1');
    const soccerBoardline2Div= document.getElementById('soccer-winnerBoard-line2');
    const soccerBoardline2DivImg= document.getElementById('soccer-winnerBoard-line2-img');
    const soccerBluePointDiv = document.querySelector('.soccer-point-blue');
    const soccerRedPointDiv = document.querySelector('.soccer-point-red');


    /**
     * Soccer Game Constants and variable
     */
    const soccerBoundaryWidth = 850;
    const soccerBoundaryHeight = 400;
    const soccerCenterX = soccerBoundaryWidth/2;    //425
    const soccerCenterY = soccerBoundaryHeight/2;   //200
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
    let totalGamePoint = 2;
    let goalPost1;
    let goalPost2;
    let ball;
    let playerBlue;
    let playerRed;


    class GoalPost{
        constructor(width,height,x,y){
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
        }

        draw() {
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


    class Ball{
        constructor() {
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

        update() {
            if (state.current == state.gameIn){ 
                if (this.x > soccerBoundaryWidth-this.width){
                    this.x = soccerBoundaryWidth-2*this.width;
                    this.ballElement.style.left = this.x + "px";
                }
                if (this.y > soccerBoundaryHeight-this.height){
                    this.y = soccerBoundaryHeight-2*this.height;
                    this.ballElement.style.top = this.y + "px";
                }
                if (this.x < 0){
                    this.x = 0+this.width;
                    this.ballElement.style.left = this.x + "px";
                }
                if (this.y < 0){
                    this.y = 0+this.height;;
                    this.ballElement.style.top = this.y + "px";
                }
                this.rotateBall();
                this.checkBallPlayerCollisionForRoll();
                this.checkGoalPostCollision();
            }
        }

        rotateBall() {
                if((this.angleIt+1)%(360+2) == 0){
                    this.angleIt=0;
                }
                this.angle = this.angleIt;
                this.angleIt++;
                this.ballElement.style.transform=`rotate(${this.angle}deg)`;
            
        }

        checkBallPlayerCollisionForRoll(){
                let dist1 = getDistance(this.x,this.y,playerBlue.x,playerBlue.y)
                if ( dist1 <= this.radius+playerBlue.radius){
                    console.log("colide");
                    this.dx = ball.x > playerBlue.x ? 1 : -1;
                    this.dy = ball.y > playerBlue.y ? 1 : -1;
                    this.x = this.x + this.roll * this.dx;
                    this.y = this.y + this.roll * this.dy;
                    this.ballElement.style.left = this.x + 'px'; 
                    this.ballElement.style.top = this.y + 'px'; 
                }
                let dist2 = getDistance(this.x,this.y,playerRed.x,playerRed.y)
                if ( dist2 <= this.radius+playerRed.radius){
                    console.log("colide2");
                    this.dx = ball.x > playerRed.x ? 1 : -1; 
                    this.dy = ball.y > playerRed.y ? 1 : -1;
                    this.x = this.x + this.roll * this.dx;
                    this.y = this.y + this.roll * this.dy;
                    this.ballElement.style.left = this.x + 'px'; 
                    this.ballElement.style.top = this.y + 'px'; 
                }
        }

        checkGoalPostCollision(){
            soccerRedPointDiv.innerHTML = soccerRedPoint;
            soccerBluePointDiv.innerHTML = soccerBluePoint;
            if (pointsRectCollision(this,goalPost1)) {
                console.log("post1 collision");
                soccerRedPoint++;
                soccerRedPointDiv.innerHTML = soccerRedPoint;
                //condition for end point winner in game(total point to be collect 2 or 3)
                if (soccerRedPoint === totalGamePoint){
                    soccerBoardline1Div.innerHTML = "Red won the Game";
                    soccerBoardline2Div.innerHTML = "";
                    soccerBoardline2DivImg.style.display = "block";
                    soccerRedPoint = 0;
                    soccerBluePoint = 0;
                    state.current = state.gameOver;
                    homeRedPoint++;
                }
                else{
                    soccerBoardline1Div.innerHTML = "Goal ! ! !";
                    soccerBoardline2Div.innerHTML = "Red gains the point.";
                    soccerBoardline2DivImg.style.display = "none";
                    state.current = state.gameOver;
                }
            }
            if (pointsRectCollision(this,goalPost2)) {
                console.log("post2 collision");
                soccerBluePoint++;
                soccerBluePointDiv.innerHTML = soccerBluePoint;
                //condition for end point winner in game(total point to be collect 2 or 3)
                if (soccerBluePoint === totalGamePoint){
                    soccerBoardline1Div.innerHTML = "Blue won the Game";
                    soccerBoardline2Div.innerHTML = "";
                    soccerBoardline2DivImg.style.display = "block";
                    soccerRedPoint = 0;
                    soccerBluePoint = 0;
                    state.current = state.gameOver;
                    homeBluePoint++;
                }
                else{
                    soccerBoardline1Div.innerHTML = "Goal ! ! !";
                    soccerBoardline2Div.innerHTML = "Blue gains the point.";
                    soccerBoardline2DivImg.style.display = "none";
                    state.current = state.gameOver;
                }
            }
        }

        reset(){
            this.x = this.initialX;
            this.y = this.initialY;
            this.ballElement.style.left = this.x + "px";
            this.ballElement.style.top = this.y + "px";
        }
    }


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
                //control the speed/velocity of player(donot go morethan 5 velocity)
                if(this.velocity > 5) this.velocity = 3;
                //face direction movement
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

    /**
     * draw the instances of class for once only
     */
    if (clickSoccerOnce === false){
        goalPost1 = new GoalPost(10,100,(0-5),(soccerCenterY/2)+50);
        goalPost2 = new GoalPost(10,100,(soccerBoundaryWidth-10)+4,(soccerCenterY/2)+50);
        goalPost1.draw();
        goalPost2.draw();
        
        ball = new Ball();
        ball.draw();

        playerBlue = new Player(playerWidth,playerHeight,initialBlueX,initialBlueY,'soccerBluePlayer','KeyA',1,velocity,walk);
        playerRed = new Player(playerWidth,playerHeight,initialRedX,initialRedY,'soccerRedPlayer','KeyL',-1,velocity,walk);
        playerBlue.draw();
        playerRed.draw();
        clickSoccerOnce = true;
    }
    else{
        ball.reset();
        playerBlue.reset();
        playerRed.reset();
    }
    

    /**
     * Click event for switching 3 stage of screen of soccer game
     */
    soccerStageControlDiv.addEventListener("click", function (event) {
        switch(state.current){
            case state.getReady:
                state.current = state.gameIn;
                soccerEntityControlDiv.style.display = "none";
                break;
            case state.gameIn:
                break;
            case state.gameOver:
                state.current = state.gameIn;
                soccerEntityControlDiv.style.display = "none";
                ball.reset();
                playerBlue.reset();
                playerRed.reset();
                break;
            default: 
        }
        if(state.current === state.gameIn)  whistleSound.play();
    });


    /**
     * Function for showing instruction for player
     */
    function showInstruction() {
        if (state.current === state.getReady){
            soccerInstruction.style.display = "block";
            soccerEntityControlDiv.style.display = "block";
        }
        else {
            soccerInstruction.style.display = "none";
        }
    }


    /**
     * Function for showing showboard for points and winner
     */
    function showBoard() {
        if (state.current === state.gameOver){
            soccerBoard.style.display = "block";
            soccerEntityControlDiv.style.display = "block";
        }
        else soccerBoard.style.display = "none";
    }

    /**
     * Function for showing soccer animation
     */
    function animation() {
        showInstruction();
        showBoard();
        playerBlue.update();
        playerRed.update();
        ball.update();
        requestAnimationFrame(animation);
    }
    
    
    animation();

}