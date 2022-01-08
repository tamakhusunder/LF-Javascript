//accessing dom element
const homePage = document.querySelector('.home-page');
const homeSoccerBtn = document.querySelector('.home-section').children[0];
const homeChickenBtn = document.querySelector('.home-section').children[1];
const homeSumoBtn = document.querySelector('.home-section').children[2];
const homeFishBtn = document.querySelector('.home-section').children[3];
const homePlayBtn = document.querySelector('.home-points-bottom-center');
const game1 = document.querySelector('.game1');
const game2 = document.querySelector('.game2');
const game3 = document.querySelector('.game3');

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
homeSumoBtn.addEventListener('click', function (event) {
    console.log("g3")
    let g3 = fn_sumo();
});

// let g3 = fn_sumo();



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

    // click event for switching 3 stage of screen of chicken game
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

function fn_sumo() {
    console.log("dddd")
    homePage.style.display = "none";
    game3.style.display = "block";


    const  sumoGameTopAreaDiv = document.querySelector('.game-sumo-top');
    const  sumoGameBoundaryDiv = document.querySelector('.sumo-border');


    const sumoInstruction = document.querySelector('.game-sumo-instruction');
    const sumoBoard = document.querySelector('.game-sumo-winnerBoard');
    const sumoBoardline2Div= document.getElementById('sumo-winnerBoard-line2');
    const sumoBluePointDiv = document.querySelector('.sumo-point-blue');
    const sumoRedPointDiv = document.querySelector('.sumo-point-red');


    const sumoBoundaryWidth = 350;
    const sumoBoundaryHeight = 350;
    const sumoGameCenterX = sumoBoundaryWidth/2;    //175
    const sumoGameCenterY = sumoBoundaryHeight/2;   //175


    const state = {
        current : 0,
        getReady : 0,
        gameIn : 1,
        gameOver : 2
    }
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

    // let initialBlueX = ((sumoBoundaryWidth)/2) - playerWidth*5;
    // let initialBlueY = (sumoBoundaryHeight)/2 - playerHeight/2;
    // let initialRedX = ((sumoBoundaryWidth)/2) + playerWidth*4;
    // let initialRedY = initialBlueY;
    let sumoBluePoint = 0;
    let sumoRedPoint = 0;


    

    class PlayerBlue{
        constructor(width,height,x,y,name,img,key,direction,velocity,walk){
            this.width = width;
            this.height = height;
            this.radius = this.width/2;
            this.x = x;
            this.y = y;
            this.name = name;
            this.img = img;
            this.key = key;
            this.pushValue = 10;
            this.direction = direction;
            this.velocity = velocity;
            this.walk = walk;
            this.keyPressed = false;
            this.angleIt = 0;
            this.dx = 1;
            this.dy = 1;

            this.initialX = x;
            this.initialY = y;
            console.log(this)

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
            console.log('sunder')
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
            if (this.keyPressed == true) this.movePlayer();
            else this.rotatePlayer();
            this.checkRingCollision();
            this.checkPlayerCollisionForPush();
        }

        checkPlayerCollisionForPush(){
            let distance = getDistance(this.x,this.y,playerRed.x,playerRed.y);
            if (distance <= this.radius + playerRed.radius){
                console.log("collision--blue hit first");
                this.dx = playerRed.x > this.x ? 1 : -1;
                this.dy = playerRed.y > this.y ? 1 : -1;
                playerRed.x = playerRed.x + this.pushValue * this.dx;
                playerRed.y = playerRed.y + this.pushValue * this.dy;
                playerRed.playerElement.style.left = playerRed.x  + 'px'; 
                playerRed.playerElement.style.top = playerRed.y + 'px'; 
            }
        }

        checkRingCollision(){
            if (this.x > sumoBoundaryWidth-this.width){
                this.x = sumoBoundaryWidth-this.width;
                this.velocity = 0;
                this.playerElement.style.left = this.x + "px";
            }
            if (this.y > sumoBoundaryHeight-this.height){
                this.y = sumoBoundaryHeight-this.height;
                this.velocity = 0;
                this.playerElement.style.top = this.y + "px";
            } 
            if(this.x < 0 - this.width/3){
                this.x = 0- this.width/3;
                this.velocity = 0;
                this.playerElement.style.left = this.x + "px";
            }
            if(this.y < 0 - this.width/3){
                this.y = 0 - this.width/3;
                this.velocity = 0;
                this.playerElement.style.top = this.y + "px";
            }    
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

    class PlayerRed{
        constructor(width,height,x,y,name,img,key,direction,velocity,walk){
            this.width = width;
            this.height = height;
            this.radius = this.width/2;
            this.x = x;
            this.y = y;
            this.name = name;
            this.img = img;
            this.key = key;
            this.pushValue = 10;
            this.direction = direction;
            this.velocity = velocity;
            this.walk = walk;
            this.keyPressed = false;
            this.angleIt = 0;

            this.initialX = x;
            this.initialY = y;
            console.log(this)

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
            console.log('sunder')
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
            if (this.keyPressed == true) this.movePlayer();
            else this.rotatePlayer();
            this.checkRingCollision();
            this.checkPlayerCollision();
        }

        checkPlayerCollision(){
            let distance = getDistance(this.x,this.y,playerBlue.x,playerBlue.y);
            if (distance <= this.radius + playerBlue.radius){
                console.log("collision-red hit");
                this.dx = playerBlue.x > this.x ? 1 : -1;
                this.dy = playerBlue.y > this.y ? 1 : -1;
                playerBlue.x = playerBlue.x + this.pushValue * this.dx;
                playerBlue.y = playerRed.y + this.pushValue * this.dy;
                playerBlue.playerElement.style.left = playerBlue.x  + 'px'; 
                playerBlue.playerElement.style.top = playerBlue.y + 'px'; 
            }
        }

        checkRingCollision(){
            if (this.x > sumoBoundaryWidth-this.width){
                this.x = sumoBoundaryWidth-this.width;
                this.velocity = 0;
                this.playerElement.style.left = this.x + "px";
            }
            if (this.y > sumoBoundaryHeight-this.height){
                this.y = sumoBoundaryHeight-this.height;
                this.velocity = 0;
                this.playerElement.style.top = this.y + "px";
            } 
            if(this.x < 0 - this.width/3){
                this.x = 0- this.width/3;
                this.velocity = 0;
                this.playerElement.style.left = this.x + "px";
            }
            if(this.y < 0 - this.width/3){
                this.y = 0 - this.width/3;
                this.velocity = 0;
                this.playerElement.style.top = this.y + "px";
            }    
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


    
    let playerBlue = new PlayerBlue(playerWidth,playerHeight,initialBlueX,initialBlueY,'sumoBluePlayer',imgBlue,'KeyA',1,velocity,walk);
    let playerRed = new PlayerRed(playerWidth,playerHeight,initialRedX,initialRedY,'sumoRedPlayer',imgRed,'KeyL',-1,velocity,walk);
    playerBlue.draw();
    playerRed.draw();

    function animation(){
        playerBlue.update();
        playerRed.update();
        requestAnimationFrame(animation);
    }

    animation();
}

