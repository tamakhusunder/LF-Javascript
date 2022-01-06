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
    const imgBlue = "core/assets/images/chickenrun/chicken-blue.png";

    const imgBlueArray = [
        "core/assets/images/chickenrun/chicken-blue.png",
        "core/assets/images/chickenrun/chicken-blue-jump.png"
    ];

    
    const chickenRedY = 410;
    const jumpHeightRedY = chickenRedY - 130;
    const keyRed = "KeyL"; 
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
            this.vy = 0;
            this.run = 1;
            this.key = key;
            this.keyPressed = false;
            this.velocity = 10;
            this.jumpHeight = jumpHeight;
            this.img = img;

            this.initialX = x;
            this.initialY = y;
            console.log(this.initialY);
            this.temp = 0;
            
        }
        
        draw() {
            this.chickenElement = document.createElement("img");
            this.chickenElement.src = this.img;
            this.chickenElement.classList.add("chicken");
            this.chickenElement.style.width = this.width+ "px";
            this.chickenElement.style.height = this.height + "px";
            this.chickenElement.style.position = "absolute";
            this.chickenElement.style.left = this.x + "px";
            this.chickenElement.style.top = this.y + "px";
            this.chickenElement.style.border = "1px solid green";

            chickenSkyyDiv.appendChild(this.chickenElement);

            document.addEventListener('keyup',(event) => {
                if(event.code == this.key){
                    if (this.keyPressed === false){
                        this.keyPressed = true;
                        this.jump();
                    }
                }
            })

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
                    },20);

                }
                 //move up
                this.y -= this.velocity;
                this.chickenElement.style.top = this.y + 'px';
            },20);

        }
    }

  

    class Box{
        constructor(x,y,bird){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 10;
        this.initialX = x;
        this.bird = bird
        console.log(this.bird.y);
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
            this.boxElement.innerHTML=this.temp;
            chickenSkyyDiv.appendChild(this.boxElement)
    
        }
        update(){
            if ( this.x < 0-this.width){
                this.x = (Math.random() < 0.5 ? 800 : 900);
                this.boxElement.style.left = this.x + "px";
                // score++;
                // scoreElement.innerHTML = score;
            }
            else{
                this.x -= this.speed;
                this.boxElement.style.left = this.x + "px";
            }
        }
        checkCollision(){
            if (pointsRectCollision(this,this.bird)){
                // console.log("collision")
            }
        }


    }

    const obstacleBlueY = 170;
    const obstacleRedY = 410;
    let chicken1 = new Chicken(chickenWidth,chickenHeight,chickenX,chickenBlueY,jumpHeightBLueY,keyBlue,imgBlue);
    let chicken2 = new Chicken(chickenWidth,chickenHeight,chickenX,chickenRedY,jumpHeightRedY,keyRed,imgRed);
    chicken1.draw();
    chicken2.draw();


    let box1 = new Box((Math.random() < 0.5 ? 800 : 850),obstacleBlueY,chicken1);
    let box2 = new Box((Math.random() < 0.5 ? 900 : 950),obstacleRedY,chicken2);
    box1.draw();
    box2.draw();

    function animation() {
        chicken1.update();
        box1.update();
        box1.checkCollision()
        box2.update();
        box2.checkCollision()
        requestAnimationFrame(animation)
    }
    animation();



}

