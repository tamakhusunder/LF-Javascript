//fn_sumo
function fn_sumo() {
    homePage.style.display = "none";
    game3.style.display = "block";


    const  sumoGameTopAreaDiv = document.querySelector('.game-sumo-top');
    const  sumoGameBoundaryDiv = document.querySelector('.sumo-border');
    const sumoInstruction = document.querySelector('.game-sumo-instruction');
    const sumoBoard = document.querySelector('.game-sumo-winnerBoard');
    const sumoBoardLine1Div= document.getElementById('sumo-winnerBoard-line1');
    const sumoBoardLine2Div= document.getElementById('sumo-winnerBoard-line2');
    const sumoBluePointDiv = document.querySelector('.sumo-point-blue');
    const sumoRedPointDiv = document.querySelector('.sumo-point-red');


    const sumoBoundaryWidth = 350;
    const sumoBoundaryHeight = 350;
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
    let sumoBluePoint = 0;
    let sumoRedPoint = 0;


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

        draw() {
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
                // console.log("collision--blue hit first");
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
                    // console.log("collison boundary blue");
                    sumoRedPoint++;
                    sumoRedPointDiv.innerHTML = sumoRedPoint;
                    sumoBoardLine1Div.innerHTML = "Blue Out of Ring";
                    sumoBoardLine2Div.innerHTML = "Red gains the Point";
                    state.current = state.gameOver;
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

        draw() {
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
                // console.log("collision-red first hit");
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
                    // console.log("collison boundary red");
                    sumoBluePoint++;
                    sumoBluePointDiv.innerHTML = sumoBluePoint;
                    sumoBoardLine1Div.innerHTML = "Red Out of Ring";
                    sumoBoardLine2Div.innerHTML = "Blue gains the Point";
                    state.current = state.gameOver;
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

    
    let playerBlue = new PlayerBlue(playerWidth,playerHeight,initialBlueX,initialBlueY,'sumoBluePlayer',imgBlue,'KeyA',velocity,walk);
    let playerRed = new PlayerRed(playerWidth,playerHeight,initialRedX,initialRedY,'sumoRedPlayer',imgRed,'KeyL',velocity,walk);
    playerBlue.draw();
    playerRed.draw();


    // click event for switching 3 stage of screen of sumo game
    sumoGameTopAreaDiv.addEventListener("click", function (event) {
        switch(state.current){
            case state.getReady:
                state.current = state.gameIn;
                break;
            case state.gameIn:
                break;
            case state.gameOver:
                state.current = state.gameIn;
                playerBlue.reset();
                playerRed.reset();
                break;
            default: 
        }
        if(state.current === state.gameIn)  whistleSound.play();
    });


    function showInstruction() {
        if (state.current === state.getReady){
            sumoInstruction.style.display = "block";
        }
        else sumoInstruction.style.display = "none";
    }


    function showBoard() {
        if (state.current === state.gameOver){
            sumoBoard.style.display = "block";
        }
        else sumoBoard.style.display = "none";
    }


    function animation(){
        showInstruction();
        showBoard();
        playerBlue.update();
        playerRed.update();
        requestAnimationFrame(animation);
    }

    animation();
}