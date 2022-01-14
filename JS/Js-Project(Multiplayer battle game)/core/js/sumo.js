/**
 *  Whole function for Sumo Wrestling game
 */
function fn_sumo() {
    homePage.style.display = "none";
    game3.style.display = "block";
    game1.style.display = "none";
    game2.style.display = "none";
    game4.style.display = "none";


    /**
     * Event handler for back to home page
     */
    const gotoHomepage = document.getElementById("sumo-gotoHomePage-btn");
    gotoHomepage.addEventListener('click', function (event) {
        let homepage = fn_homePage();
    });


     /**
     * Event handler for switching to next game(Catch The Fish)
     */
    const sumoToNextGameDiv = document.getElementById("sumo-to-next-game-btn");
    sumoToNextGameDiv.addEventListener('click', function (event) {
        let nextGame = fn_catchTheFish();
    });


     /**
     * Accessing DOM of sumo game
     */
    const  sumoGameTopAreaDiv = document.querySelector('.game-sumo-top');
    const  sumoGameBoundaryDiv = document.querySelector('.sumo-border');
    const sumoInstruction = document.querySelector('.game-sumo-instruction');
    const sumoBoard = document.querySelector('.game-sumo-winnerBoard');
    const sumoBoardLine1Div= document.getElementById('sumo-winnerBoard-line1');
    const sumoBoardLine2Div= document.getElementById('sumo-winnerBoard-line2');
    const sumoBoardLine2DivImg= document.getElementById('sumo-winnerBoard-line2-img');
    const sumoBluePointDiv = document.querySelector('.sumo-point-blue');
    const sumoRedPointDiv = document.querySelector('.sumo-point-red');
    const sumoEntityControlDiv = document.querySelector(".game-sumo-entity-control");
    const sumoStateControlDiv = document.getElementById("sumo-state-control-btn");
    

     /**
     * sumo Game Constants and variable
     */
    const sumoBoundaryWidth = 350;
    const sumoBoundaryHeight = 350;
    let state;
    const extraAngle=20;
    let playerWidth = 70;
    let playerHeight = 70;
    let velocity = 0;
    let walk = 1/8;
    let initialBlueX = ((sumoBoundaryWidth)/2) - 45;
    let initialBlueY = (sumoBoundaryHeight)/2 - 140;
    let initialRedX = initialBlueX;
    let initialRedY = (sumoBoundaryHeight)/2 + 60;
    const imgBlue = "core/assets/images/sumo/sumo-blue.png";
    const imgRed = "core/assets/images/sumo/sumo-red.png";
    let sumoBluePoint = 0;
    let sumoRedPoint = 0;
    let totalGamePoint = 3;


    //hoisting instances variable name of class
    let playerBlue;
    let playerRed;


    /** Class representing for PlayerBlue. */
    class PlayerBlue{
        constructor(width,height,x,y,name,img,key,velocity,walk){
            this.width = width;
            this.height = height;
            this.radius = this.width/2;
            this.x = x;
            this.y = y;
            this.name = name;
            this.img = img;
            this.key = key;
            this.velocity = velocity;
            this.walk = walk;
            this.pushValue = 10;
            this.keyPressed = false;
            this.angleIt = 0;
            this.dx = 1;
            this.dy = 1;
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


        drawPlayerBlue() {
            this.playerElement = document.createElement('img');
            this.playerElement.classList.add(this.name);
            this.playerElement.src = this.img;
            this.playerElement.alt = this.name;
            this.playerElement.style.width = this.width + 'px';
            this.playerElement.style.height = this.height + 'px';
            this.playerElement.style.position = 'absolute';
            this.playerElement.style.left = this.x + 'px';
            this.playerElement.style.top = this.y + 'px';
            this.playerElement.style.borderRadius =  50 + '%'; 
            sumoGameBoundaryDiv.appendChild(this.playerElement);
        }
        

        update(){
            if(state.current === state.gameIn){
                if (this.keyPressed == true) this.movePlayer();
                else this.rotatePlayer();
                this.checkRingCollision();
                this.checkPlayerCollisionForPush();
            }
        }


        checkPlayerCollisionForPush(){
            let distance = getDistance(this.x,this.y,playerRed.x,playerRed.y);
            if (distance <= this.radius + playerRed.radius){
                this.dx = playerRed.x > this.x ? 1 : -1;
                this.dy = playerRed.y > this.y ? 1 : -1;
                playerRed.x = playerRed.x + this.pushValue * this.dx;
                playerRed.y = playerRed.y + this.pushValue * this.dy;
                playerRed.playerElement.style.left = playerRed.x  + 'px'; 
                playerRed.playerElement.style.top = playerRed.y + 'px'; 
            }
        }


        checkRingCollision(){
            if (this.x > sumoBoundaryWidth-this.width || this.y > sumoBoundaryHeight-this.height
                || this.x < 0 - this.width/3 || this.y < 0 - this.width/3){
                    sumoRedPoint++;
                    sumoRedPointDiv.innerHTML = sumoRedPoint;
                    //condition for end point winner in game(total point to be collect 2 or 3)
                    if (sumoRedPoint === totalGamePoint){
                        sumoBoardLine1Div.innerHTML = "Red won the Game";
                        sumoBoardLine2Div.innerHTML = "";
                        sumoBoardLine2DivImg.style.display = "block";
                        sumoStateControlDiv.style.backgroundImage = replayIconBtn;
                        sumoToNextGameDiv.style.display = "block";
                        sumoRedPoint = 0;
                        sumoBluePoint = 0;
                        winSound.play();
                        state.current = state.gameOver;
                        homeRedPoint++;
                    }
                    else{
                        sumoBoardLine1Div.innerHTML = "Blue Out of Ring";
                        sumoBoardLine2Div.innerHTML = "Red gains the Point";
                        sumoBoardLine2DivImg.style.display = "none";
                        sumoStateControlDiv.style.backgroundImage = playIconBtn;
                        state.current = state.gameOver;
                    }
                }
        }


        rotatePlayer(){
            //reset angle to 0 after 360 degree
            if(this.angleIt > 360){
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


    /** Class representing for PlayerRed. */
    class PlayerRed{
        constructor(width,height,x,y,name,img,key,velocity,walk){
            this.width = width;
            this.height = height;
            this.radius = this.width/2;
            this.x = x;
            this.y = y;
            this.name = name;
            this.img = img;
            this.key = key;
            this.velocity = velocity;
            this.walk = walk;
            this.pushValue = 10;
            this.keyPressed = false;
            this.angleIt = 360;
            this.dx = 1;
            this.dy = 1;
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


        drawPlayerRed() {
            this.playerElement = document.createElement('img');
            this.playerElement.classList.add(this.name);
            this.playerElement.src = this.img;
            this.playerElement.alt = this.name;
            this.playerElement.style.width = this.width + 'px';
            this.playerElement.style.height = this.height + 'px';
            this.playerElement.style.position = 'absolute';
            this.playerElement.style.left = this.x + 'px';
            this.playerElement.style.top = this.y + 'px';
            this.playerElement.style.borderRadius =  50 + '%';
            sumoGameBoundaryDiv.appendChild(this.playerElement);
        }


        update(){
            if(state.current === state.gameIn){
                if (this.keyPressed == true) this.movePlayer();
                else this.rotatePlayer();
                this.checkRingCollision();
                this.checkPlayerCollisionForPush();
            }
        }


        checkPlayerCollisionForPush(){
            let distance = getDistance(this.x,this.y,playerBlue.x,playerBlue.y);
            if (distance <= this.radius + playerBlue.radius){
                this.dx = playerBlue.x > this.x ? 1 : -1;
                this.dy = playerBlue.y > this.y ? 1 : -1;
                playerBlue.x = playerBlue.x + this.pushValue * this.dx;
                playerBlue.y = playerBlue.y + this.pushValue * this.dy;
                playerBlue.playerElement.style.left = playerBlue.x  + 'px'; 
                playerBlue.playerElement.style.top = playerBlue.y + 'px'; 
            }
        }


        checkRingCollision(){
            if (this.x > sumoBoundaryWidth-this.width || this.y > sumoBoundaryHeight-this.height
                || this.x < 0 - this.width/3 || this.y < 0 - this.width/3){
                    sumoBluePoint++;
                    sumoBluePointDiv.innerHTML = sumoBluePoint;
                    //condition for end point winner in game(total point to be collect 2 or 3)
                    if (sumoBluePoint === totalGamePoint){
                        sumoBoardLine1Div.innerHTML = "Blue won the Game";
                        sumoBoardLine2Div.innerHTML = "";
                        sumoBoardLine2DivImg.style.display = "block";
                        sumoStateControlDiv.style.backgroundImage = replayIconBtn;
                        sumoToNextGameDiv.style.display = "block";
                        sumoRedPoint = 0;
                        sumoBluePoint = 0;
                        winSound.play();
                        state.current = state.gameOver;
                        homeBluePoint++;
                    }
                    else{
                        sumoBoardLine1Div.innerHTML = "Red Out of Ring";
                        sumoBoardLine2Div.innerHTML = "Blue gains the Point";
                        sumoBoardLine2DivImg.style.display = "none";
                        sumoStateControlDiv.style.backgroundImage = playIconBtn;
                        state.current = state.gameOver;
                    }
                } 
        }
    

        rotatePlayer(){
            //reset angle to 360 after 0 degree
            if (this.angleIt < 0){
                this.angleIt = 360;
            }
            this.angle = this.angleIt;
            this.angleIt--;
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
     * state object is host once
     * draw the instances of class for once only
     */
     if (clickHomeSumoOnce === false){
        state = {
            current : 0,
            getReady : 0,
            gameIn : 1,
            gameOver : 2
        }
    

        playerBlue = new PlayerBlue(playerWidth,playerHeight,initialBlueX,initialBlueY,'sumoBluePlayer',imgBlue,'KeyA',velocity,walk);
        playerRed = new PlayerRed(playerWidth,playerHeight,initialRedX,initialRedY,'sumoRedPlayer',imgRed,'KeyL',velocity,walk);
        playerBlue.drawPlayerBlue();
        playerRed.drawPlayerRed();
        clickHomeSumoOnce = true;
    }
    else{
       playerBlue.reset();
       playerRed.reset();
    }


    // click event for switching 3 stage of screen of sumo game
    sumoStateControlDiv.addEventListener("click", function (event) {
        switch(state.current){
            case state.getReady:
                state.current = state.gameIn;
                sumoEntityControlDiv.style.display = "none";
                break;
            case state.gameIn:
                break;
            case state.gameOver:
                state.current = state.gameIn;
                sumoEntityControlDiv.style.display = "none";
                sumoBluePointDiv.innerHTML = sumoBluePoint;
                sumoRedPointDiv.innerHTML = sumoRedPoint;
                playerBlue.reset();
                playerRed.reset();
                break;
            default: 
        }
        if(state.current === state.gameIn)  drumSound.play();
    });


    /** Fuction for showing or hiding the Instruction div and Button entity of homepage and restart button */
    function showInstruction() {
        if (state.current === state.getReady){
            sumoInstruction.style.display = "block";
            sumoEntityControlDiv.style.display = "block";
        }
        else sumoInstruction.style.display = "none";
    }


    /** Fuction for showing or hiding the winner div and Button entity of homepage and restart button */
    function showBoard() {
        if (state.current === state.gameOver){
            sumoBoard.style.display = "block";
            sumoEntityControlDiv.style.display = "block";
        }
        else{
            sumoBoard.style.display = "none";
            sumoToNextGameDiv.style.display = "none";
        }
    }


    /** Function of loop to show state of game and box animation*/
    function animationWithChangeState(){
        showInstruction();
        showBoard();
        playerBlue.update();
        playerRed.update();
        requestAnimationFrame(animationWithChangeState);
    }

    
    animationWithChangeState();
}