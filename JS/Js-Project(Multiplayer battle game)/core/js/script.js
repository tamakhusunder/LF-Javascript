//accessing dom element
const homePage = document.querySelector('.home-page');
const homeSoccerBtn = document.querySelector('.home-section').children[0];
const homeChickenBtn = document.querySelector('.home-section').children[1];
const homeSumoBtn = document.querySelector('.home-section').children[2];
const homeFishBtn = document.querySelector('.home-section').children[3];
const homePlayBtn = document.querySelector('.home-points-bottom-center');
const homeBluePointDiv = document.querySelector('.home-points-bottom-left');
const homeRedPointDiv = document.querySelector('.home-points-bottom-right');
const game1 = document.querySelector('.game1');
const game2 = document.querySelector('.game2');
const game3 = document.querySelector('.game3');
const game4 = document.querySelector('.game4');

console.log(homeSoccerBtn)
console.log(homeChickenBtn)

var ballHitSound = new Audio('core/assets/audio/soccer/kick ball.wav');
var whistleSound = new Audio('core/assets/audio/whistle.mp3');

let clickSoccerOnce = false;
let homeBluePoint = 0;
let homeRedPoint = 0;



let home = fn_homePage();
// let home = fn_catchTheFish();

//event handler for home page
homeSoccerBtn.addEventListener('click', function (event) {
    let game1 = fn_soccer();
});
homeChickenBtn.addEventListener('click', function (event) {
    let game2 = fn_chicken();
});
homeSumoBtn.addEventListener('click', function (event) {
    let game3 = fn_sumo();
});
homeFishBtn.addEventListener('click', function (event) {
    let game4 = fn_catchTheFish();
});



//function only
//home function
function fn_homePage() {
    homePage.style.display = "block";
    game1.style.display = "none";
    game2.style.display = "none";
    game3.style.display = "none";
    game4.style.display = "none";

    homeBluePointDiv.innerHTML = homeBluePoint;
    homeRedPointDiv.innerHTML = homeRedPoint;
}



//fn_catchTheFish
function fn_catchTheFish() {
    homePage.style.display = "none";
    game4.style.display = "block";


    /**
     * Event handler for back to home page
     */
    // gotoHomepage = document.getElementById("fish-gotoHomePage");
    // gotoHomepage.addEventListener('click', function (event) {
    //     let homepage = fn_homePage();
    // });


    /**
     * Accessing DOM of fish game
     */
    // const fishEntityControlDiv = document.querySelector(".game-fish-entity-control");
    // const fishStageControlDiv = document.getElementById("fish-stage-control");
    const fishGameTopAreaDiv = document.querySelector('.game-fish-top');
    const fishGameBoundaryDiv = document.querySelector('.fish-border');
    const fishInstruction = document.querySelector('.game-fish-instruction');
    const fishBoard = document.querySelector('.game-fish-winnerBoard');
    const fishBoardline1Div= document.getElementById('fish-winnerBoard-line1');
    const fishBoardline2Div= document.getElementById('fish-winnerBoard-line2');
    const fisherBoardline2DivImg= document.getElementById('fish-winnerBoard-line2-img');
    const fishBluePointDiv = document.querySelector('.fish-point-blue');
    const fishRedPointDiv = document.querySelector('.fish-point-red');


    /**
     * fish Game Constants and variable
     */
    const fishBoundaryWidth = 800;
    const fishBoundaryHeight = 400;
    const fishGameCenterX = fishBoundaryWidth/2;    //400
    const fishGameCenterY = fishBoundaryHeight/2;   //200
    const state = {
        current : 0,
        getReady : 0,
        gameIn : 1,
        gameOver : 2
    }
    let playerHandWidth = 100;
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

    let fish = new Fish();
    fish.drawFish();
    fish.updateAlternateFishDisplay();


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
            // this.handElement.style.borderRadius = 50 + '%';
            // this.handElement.style.border = "1px solid yellow";
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
            if (this.propertyName === 'bottom'){
                let dist1 = getDistance(handBlue.x,handBlue.y,fish.x,fish.y)
                if ( dist1 <= handBlue.radius + fish.radius){
                    console.log("collide1blue")
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
                        state.current = state.gameOver;
                        fishBluePoint = 0;
                    }
                }
            }
            if (this.propertyName === 'top'){
                let dist2 = getDistance(handRed.x,handRed.y,fish.x,fish.y)
                if ( dist2 <= handRed.radius+fish.radius){
                    console.log("collide2red")
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
                        state.current = state.gameOver;
                        fishRedPoint = 0;
                    }
                }
            }

        }

    }

    let handBlue = new PlayerHand("bottom",playerHandWidth,playerHandHeight,initialBlueX,initialBlueY,"KeyA",extendBlueHandHeight,blueHandImg);
    let handRed = new PlayerHand("top",playerHandWidth,playerHandHeight,initialRedX,initialRedY,"KeyL",extendRedHandHeight,redHandImg);
    handBlue.drawHand();
    handRed.drawHand();

    // click event for switching 3 stage of screen of fish game
    fishGameTopAreaDiv.addEventListener("click", function (event) {
        console.log("i am click");
        switch(state.current){
            case state.getReady:
                state.current = state.gameIn;
                break;
            case state.gameIn:
                break;
            case state.gameOver:
                state.current = state.gameIn;
                fishBluePointDiv.innerHTML = fishBluePoint;
                fishRedPointDiv.innerHTML = fishRedPoint;
                break;
            default: 
        }
        if(state.current === state.gameIn)  whistleSound.play();
    });

    function showInstruction() {
        if (state.current === state.getReady){
            fishInstruction.style.display = "block";
        }
        else fishInstruction.style.display = "none";
    }


    function showBoard() {
        if (state.current === state.gameOver){
            fishBoard.style.display = "block";
        }
        else fishBoard.style.display = "none";
    }
     

    function animation(){
        console.log(state.current);
        showInstruction();
        showBoard();
        requestAnimationFrame(animation);
    }

    animation();


}

