/**
 *  Whole function for Catch the fish game
 */
function fn_catchTheFish() {
    homePage.style.display = "none";
    game4.style.display = "block";


    /**
     * Event handler for back to home page
     */
    gotoHomepage = document.getElementById("fish-gotoHomePage-btn");
    gotoHomepage.addEventListener('click', function (event) {
        let homepage = fn_homePage();
    });


    /**
     * Accessing DOM of fish game
     */
    const fishGameTopAreaDiv = document.querySelector('.game-fish-top');
    const fishGameBoundaryDiv = document.querySelector('.fish-border');
    const fishInstruction = document.querySelector('.game-fish-instruction');
    const fishBoard = document.querySelector('.game-fish-winnerBoard');
    const fishBoardline1Div= document.getElementById('fish-winnerBoard-line1');
    const fishBoardline2Div= document.getElementById('fish-winnerBoard-line2');
    const fishBoardline2DivImg= document.getElementById('fish-winnerBoard-line2-img');
    const fishBluePointDiv = document.querySelector('.fish-point-blue');
    const fishRedPointDiv = document.querySelector('.fish-point-red');
    const fishEntityControlDiv = document.querySelector(".game-fish-entity-control");
    const fishStateControlDiv = document.getElementById("fish-state-control-btn");
    

    /**
     * fish Game Constants and variable
     */
    const fishBoundaryWidth = 800;
    const fishBoundaryHeight = 400;
    const fishGameCenterX = fishBoundaryWidth/2;    //400
    const fishGameCenterY = fishBoundaryHeight/2;   //200
    let state;
    let playerHandWidth = 110;
    let playerHandHeight = 190;
    let playerRadius = playerHandHeight/2;
    let initialBlueX = fishGameCenterX - playerHandWidth/2;     //350
    let initialBlueY =  fishGameCenterY + 90;   //290
    let extendBlueHandHeight = fishGameCenterY + 20;   //220
    let initialRedX = initialBlueX;
    let initialRedY = initialBlueY
    let extendRedHandHeight = extendBlueHandHeight;
    let fishBluePoint = 0;
    let fishRedPoint = 0;
    let totalGamePoint = 3;
    const blueHandImg = "core/assets/images/catchTheFish/longblue.png";
    const redHandImg = "core/assets/images/catchTheFish/longred.png";
    const fishImgArray = [
        "core/assets/images/catchTheFish/fish.png",
        "core/assets/images/catchTheFish/blackfish.png"
    ];

    
    //hoisting instances variable name of class
    let fish;
    let handBlue;
    let handRed;


    /** Class representing for fish. */
    class Fish{
        constructor(){
            this.width = 90;
            this.height = 90;
            this.x = fishGameCenterX-this.width/2;
            this.y = fishGameCenterY-this.width/2;
            this.radius = this.height/2;
            this.imgIndex = 0;
            this.fixedX = this.x;
            this.fixedY = this.y;
        }

        drawFish() {
            this.fishElement = document.createElement('img');
            this.fishElement.src = fishImgArray[this.imgIndex]
            this.fishElement.classList.add("fish");
            this.fishElement.style.width = this.width + 'px';
            this.fishElement.style.height = this.height + 'px';
            this.fishElement.style.position = 'absolute';
            this.fishElement.style.left = this.x + 'px';
            this.fishElement.style.top = this.y + 'px';
            setTimeout(() => {
                fishGameBoundaryDiv.appendChild(this.fishElement);
            },1000);
            
        }

        updateAlternateFishDisplay() {
            let i=0;
            let timeId = setInterval(() => {
                i++;
                if (i % 2 !== 0) {
                    this.imgIndex = (Math.random() < 0.5 ? 0 : 1);
                    this.x = this.fixedX;
                    this.y =this.fixedY;
                    this.fishElement.style.left = this.x +"px";
                    this.fishElement.style.top = this.y +"px";
                    this.fishElement.src = fishImgArray[this.imgIndex];
                    this.fishElement.style.display = 'block';
                } 
                else {
                    this.fishElement.style.display = 'none';
                    this.x  = 0;
                    this.fishElement.style.left = this.x + "px";
                }
            },1000);
        }
    }

    

    /** Class representing for Hand. */
    class PlayerHand{
        constructor(propertyName,width,height,x,y,key,extendHand,img){
            this.propertyName = propertyName;
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.radius = playerRadius;
            this.key = key;
            this.keyPressed = false;
            this.velocity = 10;
            this.extendHandLimit = extendHand;
            this.img = img;
            this.initialX = x;
            this.initialY = y;

            document.addEventListener('keyup',(event) => {
                if(event.code == this.key){
                    if (this.keyPressed === false){
                        this.keyPressed = true;
                        this.handMovement();
                    }
                }
            });
        }

        drawHand() {
            this.handElement = document.createElement("img");
            this.handElement.src = this.img;
            this.handElement.classList.add("hand");
            this.handElement.style.width = this.width+ "px";
            this.handElement.style.height = this.height + "px";
            this.handElement.style.position = "absolute";
            this.handElement.style.left = this.x + "px";
            this.handElement.style[this.propertyName] = this.y + "px";
            fishGameBoundaryDiv.appendChild(this.handElement); 
        }

        handMovement(){ 
                let upTimerId = setInterval(() => {
                    if (state.current == state.gameIn){ 
                        this.checkHandFishCollision();
                    }
                    //move down for red or move down for blue
                    if (this.y === this.extendHandLimit){
                        clearInterval(upTimerId);

                        let downTimeId = setInterval(() => {
                            if (this.y === (this.initialY-this.velocity)){
                                clearInterval(downTimeId);
                                this.keyPressed = false;
                            }
                            this.y += this.velocity;
                            this.handElement.style[this.propertyName] = this.y + 'px';
                        },20);

                    }
                    //move up for red or move down for blue
                    this.y -= this.velocity;
                    this.handElement.style[this.propertyName] = this.y + 'px';
                },20);
            
        }
        
        checkHandFishCollision(){
            //collision condition for blue hand
            if (this.propertyName === 'bottom'){
                let dist1 = getDistance(handBlue.x,handBlue.y,fish.x,fish.y)
                if ( dist1 <= handBlue.radius + fish.radius){
                    fish.x = 0 - fish.width;
                    fish.fishElement.style.left= fish.x + "px";
                    if (fish.imgIndex === 0){
                        fishBluePoint++;
                    }
                    else if (fish.imgIndex === 1){
                        fishBluePoint--;
                    }
                    fishBluePointDiv.innerHTML = fishBluePoint;
                    if (fishBluePoint === totalGamePoint){
                        fishBoardline1Div.innerHTML = "Blue won the Game";
                        fishStateControlDiv.style.backgroundImage = replayIconBtn;
                        fishBluePoint = 0;
                        fishRedPoint = 0;
                        state.current = state.gameOver;
                        homeBluePoint++;
                    }
                }
            }

            //collision condition for red hand
            if (this.propertyName === 'top'){
                let dist2 = getDistance(handRed.x,handRed.y,fish.x,fish.y)
                if ( dist2 <= handRed.radius+fish.radius){
                    fish.x = 0 - fish.width;
                    fish.fishElement.style.left= fish.x + "px";
                    if (fish.imgIndex === 0){
                        fishRedPoint++;
                    }
                    else if (fish.imgIndex === 1){
                        fishRedPoint--;
                    }
                    fishRedPointDiv.innerHTML = fishRedPoint;
                    if (fishRedPoint === totalGamePoint){
                        fishBoardline1Div.innerHTML = "Red won the Game";
                        fishStateControlDiv.style.backgroundImage = replayIconBtn;
                        fishRedPoint = 0;
                        fishBluePoint = 0;
                        state.current = state.gameOver;
                        homeRedPoint++;
                    }
                }
            }

        }
    }


    /**
     * state object is host once
     * draw the instances of class for once only 
     */
     if (clickHomeFishOnce === false){
        state = {
            current : 0,
            getReady : 0,
            gameIn : 1,
            gameOver : 2
        }
        fish = new Fish();
        fish.drawFish();
        fish.updateAlternateFishDisplay();

        handBlue = new PlayerHand("bottom",playerHandWidth,playerHandHeight,initialBlueX,initialBlueY,"KeyA",extendBlueHandHeight,blueHandImg);
        handRed = new PlayerHand("top",playerHandWidth,playerHandHeight,initialRedX,initialRedY,"KeyL",extendRedHandHeight,redHandImg);
        handBlue.drawHand();
        handRed.drawHand();
        clickHomeFishOnce = true;
     }


    // click event for switching 3 state of screen of fish game
    fishStateControlDiv.addEventListener("click", function (event) {
        switch(state.current){
            case state.getReady:
                state.current = state.gameIn;
                fishEntityControlDiv.style.display = "none";
                break;
            case state.gameIn:
                break;
            case state.gameOver:
                state.current = state.gameIn;
                fishEntityControlDiv.style.display = "none";
                fishBluePointDiv.innerHTML = fishBluePoint;
                fishRedPointDiv.innerHTML = fishRedPoint;
                break;
            default: 
        }
        if(state.current === state.gameIn)  whistleSound.play();
    });


    /** shows or hide the Instruction div and Button entity of homepage and restart button*/
    function showInstruction() {
        if (state.current === state.getReady){
            fishInstruction.style.display = "block";
            fishEntityControlDiv.style.display = "block";
        }
        else fishInstruction.style.display = "none";
    }


    /** shows or hide the winner div and Button entity of homepage and restart button*/
    function showBoard() {
        if (state.current === state.gameOver){
            fishBoard.style.display = "block";
            fishEntityControlDiv.style.display = "block";

        }
        else fishBoard.style.display = "none";
    }
     

    /** loop function to show state of game*/
    function animationWithChangeState(){
        showInstruction();
        showBoard();
        requestAnimationFrame(animationWithChangeState);
    }


    animationWithChangeState();


}
