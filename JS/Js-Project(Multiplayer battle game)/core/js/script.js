//accessing dom element
const homePage = document.querySelector('.home-page');
const homeSoccerBtn = document.querySelector('.home-section').children[0];
const homeChickenBtn = document.querySelector('.home-section').children[1];
const homeSumoBtn = document.querySelector('.home-section').children[2];
const homeFishBtn = document.querySelector('.home-section').children[3];
const homePlayBtn = document.querySelector('.home-points-bottom-center');
const game1 = document.querySelector('.game1');
const game2 = document.querySelector('.game2');

console.log(homeSoccerBtn)
console.log(homeChickenBtn)

var ballHitSound = new Audio('core/assets/audio/soccer/kick ball.wav');
// ballHitSound.play();
var whistleSound = new Audio('core/assets/audio/whistle.mp3');



//event handler for home page
homeSoccerBtn.addEventListener('click', function (event) {
    let g1 = fn_soccer();
});
homeChickenBtn.addEventListener('click', function (event) {
    console.log("g2")
    let g2 = fn_chicken();
});

// let g2 = fn_chicken();



//function only
//fn_chicken-run
function  fn_chicken() {
    homePage.style.display = "none";
    game2.style.display = "block";

        
    const chickenGameTopAreaDiv = document.querySelector(".game-chicken-top");
    const chickenGameBoundaryDiv= document.querySelector(".game-chicken-border");
    const chickenSkyyDiv= document.querySelector(".chicken-border-sky");

    const chickenInstruction = document.querySelector('.game-chicken-instruction');
    const chickenBoard = document.querySelector('.game-chicken-winnerBoard');
    const chickenBoardLine1Div = document.getElementById('chicken-winnerBoard-line1');
    const chickenBoardLine2Div = document.getElementById('chicken-winnerBoard-line2');
    const chickenBluePointDiv = document.querySelector('.chicken-point-blue');
    const chickenRedPointDiv = document.querySelector('.chicken-point-red');


  
    const state = {
        current : 0,
        getReady : 0,
        gameIn : 1,
        gameOver : 2
    }
    const chickenGameBoundaryWidth = 800;
    const chickenGameBoundaryHeight = 250;
    const chickenGameSkyHeight = 220;
    const chickenGameFooterHeight = chickenGameBoundaryHeight-chickenGameSkyHeight; //30

    const chickenWidth = 50;
    const chickenHeight = 60;
    const chickenX = 2;
    const chickenBlueY = chickenGameSkyHeight - chickenHeight; //170
    const jumpHeightBLueY = chickenBlueY - 130;
    const keyBlue = "KeyA";
    let chickenBluePoint = 0;
    const imgBlue = "core/assets/images/chickenrun/chicken-blue.png";
    const imgBlueArray = [
        "core/assets/images/chickenrun/chicken-blue.png",
        "core/assets/images/chickenrun/chicken-blue-jump.png"
    ];

    
    const chickenRedY = 410;
    const jumpHeightRedY = chickenRedY - 130;
    const keyRed = "KeyL"; 
    let chickenRedPoint = 0;
    const imgRed = "core/assets/images/chickenrun/chicken-red.png";
    const imgRedArray = [
        "core/assets/images/chickenrun/chicken-red.png",
        "core/assets/images/chickenrun/chicken-red-jump.png"
    ];

    



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
        
        draw() {
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

        update(){
        }

        jump(){
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
        

        reset(){
            this.x = this.initialX;
            this.y = this.initialY;
            this.chickenElement.style.left = this.x + "px";
            this.chickenElement.style.top = this.y + "px";
        }
    }


    let chicken1 = new Chicken(chickenWidth,chickenHeight,chickenX,chickenBlueY,jumpHeightBLueY,keyBlue,imgBlueArray);
    let chicken2 = new Chicken(chickenWidth,chickenHeight,chickenX,chickenRedY,jumpHeightRedY,keyRed,imgRedArray);
    chicken1.draw();
    chicken2.draw();
  

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

        draw() {
            this.boxElement = document.createElement("img");
            this.boxElement.src = "core/assets/images/chickenrun/chicken-obstacle.png";
            this.boxElement.alt = "obstacle-img";
            this.boxElement.classList.add("box1");
            this.boxElement.style.width = this.width+ "px";
            this.boxElement.style.height = this.height + "px";
            this.boxElement.style.position = "absolute";
            this.boxElement.style.left = this.x + "px";
            this.boxElement.style.top = this.y + "px";
            this.boxElement.style.boder = "1px solid black";
            chickenSkyyDiv.appendChild(this.boxElement)
    
        }
        update(){
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

        checkCollision(){
            if (state.current == state.gameIn){ 
                if (this.color = "blue"){
                    if (pointsRectCollision(this,chicken1)){
                        console.log("collision blue")
                        chickenRedPoint++;
                        chickenRedPointDiv.innerHTML = chickenRedPoint;
                        chickenBoardLine1Div.innerHTML = "Blue Crashed !!!";
                        chickenBoardLine2Div.innerHTML = "Red gains the Point";
                        state.current = state.gameOver;
                    }
                }
                if(this.color = "red"){
                    console.log(this,chicken2)
                    if (pointsRectCollision(this,chicken2)){
                        console.log("collision red")
                        chickenBluePoint++;
                        chickenBluePointDiv.innerHTML = chickenBluePoint;
                        chickenBoardLine1Div.innerHTML = "Red Crashed !!!";
                        chickenBoardLine2Div.innerHTML = "Blue gains the Point";
                        state.current = state.gameOver;
                    }
                }
            }
        }

        reset(){
            this.frame = 1;
            this.speed = 10;
            this.x = this.initialX;
            this.y = this.initialY;
            this.boxElement.style.left = this.x + "px";
            this.boxElement.style.top = this.y + "px";
        }


    }

    const obstacleBlueY = 170;
    const obstacleRedY = 420;


    let box1 = new Box((Math.random() < 0.5 ? 800 : 950),obstacleBlueY,"blue");
    let box2 = new Box((Math.random() < 0.5 ? 850 : 900),obstacleRedY,"red");
    box1.draw();
    box2.draw();

    // click event for switching 3 stage of screen of soccer game
    chickenGameTopAreaDiv.addEventListener("click", function (event) {
        console.log("i am click");
        // whistleSound.play();
        switch(state.current){
            case state.getReady:
                state.current = state.gameIn;
                break;
            case state.gameIn:
                break;
            case state.gameOver:
                state.current = state.gameIn;
                chicken1.reset();
                chicken2.reset();
                box1.reset();
                box2.reset();
                break;
            default: 
        }
        if(state.current === state.gameIn)  whistleSound.play();
    });

    
    function showInstruction() {
        if (state.current === state.getReady){
            chickenInstruction.style.display = "block";
        }
        else chickenInstruction.style.display = "none";
    }


    function showBoard() {
        if (state.current === state.gameOver){
            chickenBoard.style.display = "block";
        }
        else chickenBoard.style.display = "none";
    }
      


    function animation() {
        showInstruction();
        showBoard();
        chicken1.update();
        chicken2.update();
        box1.update();
        box1.checkCollision();
        box2.update();
        box2.checkCollision();
        requestAnimationFrame(animation);
    }


    animation();



}