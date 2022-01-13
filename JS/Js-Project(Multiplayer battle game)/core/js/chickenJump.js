/**
 *  Whole function for Chicken jump game
 */
function  fn_chicken() {
    homePage.style.display = "none";
    game2.style.display = "block";
    game1.style.display = "none";
    game3.style.display = "none";
    game4.style.display = "none";


    /**
     * Event handler for back to home page
     */
    gotoHomepage = document.getElementById("chicken-gotoHomePage-btn");
    gotoHomepage.addEventListener('click', function (event) {
        let homepage = fn_homePage();
    });
    

    /**
     * Event handler for switching to next game(sumo wrestling)
     */
    const chickenToNextGameDiv = document.getElementById("chicken-to-next-game-btn");
    chickenToNextGameDiv.addEventListener('click', function (event) {
        let nextGame = fn_sumo();
    });

        
    /**
     * Accessing DOM of Chicken game
     */
    const chickenGameTopAreaDiv = document.querySelector(".game-chicken-top");
    const chickenGameBoundaryDiv= document.querySelector(".game-chicken-border");
    const chickenSkyyDiv= document.querySelector(".chicken-border-sky");
    const chickenInstruction = document.querySelector('.game-chicken-instruction');
    const chickenBoard = document.querySelector('.game-chicken-winnerBoard');
    const chickenBoardLine1Div = document.getElementById('chicken-winnerBoard-line1');
    const chickenBoardLine2Div = document.getElementById('chicken-winnerBoard-line2');
    const chickenBoardline2DivImg= document.getElementById('chicken-winnerBoard-line2-img');
    const chickenBluePointDiv = document.querySelector('.chicken-point-blue');
    const chickenRedPointDiv = document.querySelector('.chicken-point-red');
    const chickenEntityControlDiv = document.querySelector(".game-chicken-entity-control");
    const chickenStateControlDiv = document.getElementById("chicken-state-control-btn");
 

    /**
     * chicken Game Constants and variable
     */
    let state;
    const chickenGameBoundaryWidth = 800;
    const chickenGameBoundaryHeight = 250;
    const chickenGameSkyHeight = 220;
    const chickenGameFooterHeight = chickenGameBoundaryHeight-chickenGameSkyHeight;
    const chickenWidth = 50;
    const chickenHeight = 60;
    const chickenX = 2;
    const chickenBlueY = chickenGameSkyHeight - chickenHeight;
    const jumpHeightBLueY = chickenBlueY - 130;
    const keyBlue = "KeyA";
    let chickenBluePoint = 0;
    const chickenRedY = 410;
    const jumpHeightRedY = chickenRedY - 130;
    const keyRed = "KeyL"; 
    let chickenRedPoint = 0;
    const imgBlue = "core/assets/images/chickenrun/chicken-blue.png";
    const imgBlueArray = [
        "core/assets/images/chickenrun/chicken-blue.png",
        "core/assets/images/chickenrun/chicken-blue-jump.png"
    ];
    const imgRed = "core/assets/images/chickenrun/chicken-red.png";
    const imgRedArray = [
        "core/assets/images/chickenrun/chicken-red.png",
        "core/assets/images/chickenrun/chicken-red-jump.png"
    ];
    const obstacleBlueY = 170;
    const obstacleRedY = 420;
    let totalGamePoint = 3;


    //hoisting instances variable name of class
     let chicken1;
     let chicken2;
     let box1;
     let box2;


    /** Class representing for Chicken. */
    class Chicken{
        constructor(width,height,x,y,jumpHeight,key,img){
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.key = key;
            this.keyPressed = false;
            this.velocity = 10;
            this.jumpHeight = jumpHeight;
            this.img = img;
            this.initialX = x;
            this.initialY = y;


            document.addEventListener('keyup',(event) => {
                if(event.code == this.key){
                    if (this.keyPressed === false){
                        this.keyPressed = true;
                        this.jump();
                    }
                }
            });
        }
        

        drawChicken() {
            this.chickenElement = document.createElement("img");
            this.chickenElement.src = this.img[0];
            this.chickenElement.classList.add("chicken");
            this.chickenElement.style.width = this.width+ "px";
            this.chickenElement.style.height = this.height + "px";
            this.chickenElement.style.position = "absolute";
            this.chickenElement.style.left = this.x + "px";
            this.chickenElement.style.top = this.y + "px";
            chickenSkyyDiv.appendChild(this.chickenElement);  
        }
        

        jump() {
            let upTimerId = setInterval(() => {
                //move down
                if (this.y === this.jumpHeight){
                    clearInterval(upTimerId);

                    let downTimeId = setInterval(() => {
                        if (this.y === (this.initialY-this.velocity)){
                            clearInterval(downTimeId);
                            this.keyPressed = false;
                        }
                        this.y += this.velocity;
                        this.chickenElement.style.top = this.y + 'px';
                        this.chickenElement.src = this.img[0];
                    },20);
                }
                //move up
                this.y -= this.velocity;
                this.chickenElement.style.top = this.y + 'px';
                this.chickenElement.src = this.img[1];
            },20);
        }


        reset() {
            this.x = this.initialX;
            this.y = this.initialY;
            this.chickenElement.style.left = this.x + "px";
            this.chickenElement.style.top = this.y + "px";
        }
    }


    /** Class representing for Box(obstacle). */
    class Box{
        constructor(x,y,color){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 10;
        this.color = color;
        this.frame = 1;
        this.initialX = x;
        this.initialY = y;
        }

        
        drawBox() {
            this.boxElement = document.createElement("img");
            this.boxElement.src = "core/assets/images/chickenrun/chicken-obstacle.png";
            this.boxElement.alt = "obstacle-img";
            this.boxElement.classList.add("box1");
            this.boxElement.style.width = this.width+ "px";
            this.boxElement.style.height = this.height + "px";
            this.boxElement.style.position = "absolute";
            this.boxElement.style.left = this.x + "px";
            this.boxElement.style.top = this.y + "px";
            chickenSkyyDiv.appendChild(this.boxElement)
        }


        update() {
            if (state.current == state.gameIn){ 
                if ( this.x < 0-this.width){
                    this.x = (Math.random() < 0.5 ? 800 : 900);
                    this.boxElement.style.left = this.x + "px";
                }
                else{
                    this.x -= this.speed;
                    this.boxElement.style.left = this.x + "px";
                }
                 //increase speed of obstacle with time and frame increases
                 this.frame++;
                 if (this.frame % 1000 === 0) this.speed += 10;
            }
        }


        checkChickenBoxCollision() {
            if (state.current == state.gameIn){ 
                if (this.color = "blue"){
                    if (pointsRectCollision(this,chicken1)){
                        chickenRedPoint++;
                        chickenRedPointDiv.innerHTML = chickenRedPoint;
                        //condition for end point winner in game(total point to be collect 3)
                        if (chickenRedPoint === totalGamePoint){
                            chickenBoardLine1Div.innerHTML = "Red won the Game";
                            chickenBoardLine2Div.innerHTML = "";
                            chickenBoardline2DivImg.style.display = "block";
                            chickenStateControlDiv.style.backgroundImage = replayIconBtn;
                            chickenToNextGameDiv.style.display = "block";
                            chickenRedPoint = 0;
                            chickenBluePoint = 0;
                            winSound.play();
                            state.current = state.gameOver;
                            homeRedPoint++;
                        }
                        else{
                            chickenBoardLine1Div.innerHTML = "Blue Crashed !!!";
                            chickenBoardLine2Div.innerHTML = "Red gains the Point";
                            chickenBoardline2DivImg.style.display = "none";
                            chickenStateControlDiv.style.backgroundImage = playIconBtn;
                            state.current = state.gameOver;
                        }
                    }
                }
                if(this.color = "red"){
                    if (pointsRectCollision(this,chicken2)){
                        chickenBluePoint++;
                        chickenBluePointDiv.innerHTML = chickenBluePoint;
                        //condition for end point winner in game(total point to be collect 3)
                        if (chickenBluePoint === totalGamePoint){
                            chickenBoardLine1Div.innerHTML = "Blue won the Game";
                            chickenBoardLine2Div.innerHTML = "";
                            chickenBoardline2DivImg.style.display = "block";
                            chickenStateControlDiv.style.backgroundImage = replayIconBtn;
                            chickenToNextGameDiv.style.display = "block";
                            chickenRedPoint = 0;
                            chickenBluePoint = 0;
                            winSound.play();
                            state.current = state.gameOver;
                            homeBluePoint++;
                        }
                        else{
                            chickenBoardLine1Div.innerHTML = "Red Crashed !!!";
                            chickenBoardLine2Div.innerHTML = "Blue gains the Point";
                            chickenBoardline2DivImg.style.display = "none";
                            chickenStateControlDiv.style.backgroundImage = playIconBtn;
                            state.current = state.gameOver;
                        }
                    }
                }
            }
        }


        reset() {
            this.frame = 1;
            this.speed = 10;
            this.x = this.initialX;
            this.y = this.initialY;
            this.boxElement.style.left = this.x + "px";
            this.boxElement.style.top = this.y + "px";
        }
    }

    
    /**
     * state object is host once
     * draw the instances of class for once only
     */
     if (clickHomeChickenOnce === false){
        state = {
            current : 0,
            getReady : 0,
            gameIn : 1,
            gameOver : 2
        }


        chicken1 = new Chicken(chickenWidth,chickenHeight,chickenX,chickenBlueY,jumpHeightBLueY,keyBlue,imgBlueArray);
        chicken2 = new Chicken(chickenWidth,chickenHeight,chickenX,chickenRedY,jumpHeightRedY,keyRed,imgRedArray);
        chicken1.drawChicken();
        chicken2.drawChicken();
  

        box1 = new Box((Math.random() < 0.5 ? 800 : 950),obstacleBlueY,"blue");
        box2 = new Box((Math.random() < 0.5 ? 850 : 900),obstacleRedY,"red");
        box1.drawBox();
        box2.drawBox();
        clickHomeChickenOnce = true;
     }
     else{
        chicken1.reset();
        chicken2.reset();
        box1.reset();
        box2.reset();
    }


    // click event for switching 3 state of screen of chicken game
    chickenStateControlDiv.addEventListener("click", function (event) {
        switch(state.current){
            case state.getReady:
                state.current = state.gameIn;
                chickenEntityControlDiv.style.display = "none";
                break;
            case state.gameIn:
                break;
            case state.gameOver:
                state.current = state.gameIn;
                chickenEntityControlDiv.style.display = "none";
                chickenBluePointDiv.innerHTML = chickenBluePoint;
                chickenRedPointDiv.innerHTML = chickenRedPoint;
                chicken1.reset();
                chicken2.reset();
                box1.reset();
                box2.reset();
                break;
            default: 
        }
        if(state.current === state.gameIn)  chickenSound.play();
    });


     /** Fuction for showing or hiding the Instruction div and Button entity of homepage and restart button */
    function showInstruction() {
        if (state.current === state.getReady){
            chickenInstruction.style.display = "block";
            chickenEntityControlDiv.style.display = "block";
        }
        else chickenInstruction.style.display = "none";
    }


    /** Fuction for showing or hiding the winner div and Button entity of homepage and restart button */
    function showBoard() {
        if (state.current === state.gameOver){
            chickenBoard.style.display = "block";
            chickenEntityControlDiv.style.display = "block";
        }
        else{ 
            chickenBoard.style.display = "none";
            chickenToNextGameDiv.style.display = "none";
        }
    }


    /** Function of loop to show state of game and box animation*/
    function animationWithChangeState() {
        showInstruction();
        showBoard();
        box1.update();
        box1.checkChickenBoxCollision();
        box2.update();
        box2.checkChickenBoxCollision();
        requestAnimationFrame(animationWithChangeState);
    }


    animationWithChangeState();
}
