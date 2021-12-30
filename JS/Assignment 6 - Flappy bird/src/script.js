/**
 * Accessing DOM
 */
const startMenuDiv = document.querySelector(".start-menu");
const gamesectionDiv = document.querySelector(".game-section");
const scoreElement = document.getElementById("scoredigit");
const startbtnElement = document.getElementById("start-btn");
const highScoreElement = document.getElementById("highscoredigit");
const gameOverElement = document.querySelector(".exit-menu");

const  viewport = document.querySelector('.sky_bg');
const  footer = document.querySelector('.footer');


viewportWidth = 600;
viewportHeight = 400;

const skyHeight =300;
const floorWidth = 600;
const floorHeight = 100;


/**
 * Game Constants and variable
 */
let score = 0;
let spacePress = false;


/**
 * Event Handler to start the game
 */
 let initalPage = startbtnElement.addEventListener("click", (event) => {
    startMenuDiv.style.display = "none";
    gamesectionDiv.style.display = "block";
    createArray();
    animation();
});

/**
 * Set a high score in local storage
 */
 if(window.localStorage.flaphighscore != undefined){
    highScoreElement.innerHTML = window.localStorage.getItem('flaphighscore');
}




//  ---------------------------------------------
class Bird{
    constructor(){
        this.x = 10;
        this.y = 10;
        this.vy = 0;    //control bird position
        this.width = 40;
        this.height = 40;
        this.gravity = 1/5;
        this.jump = 1;
    }

    draw() {
        this.birdElement = document.createElement("div");
        this.birdElement.classList.add("bird");
        this.birdElement.style.width = this.width+ "px";
        this.birdElement.style.height = this.height + "px";
        this.birdElement.style.position = "absolute";
        this.birdElement.style.left = this.x + "px";
        this.birdElement.style.top = this.y + "px";

        viewport.appendChild(this.birdElement);
      
    }

    update() {
        if (this.y > viewportHeight-(this.height+floorHeight)){
            this.y = viewportHeight-(this.height+floorHeight);
            this.vy = 0;
            this.birdElement.style.top = this.y + "px";

        }
        else{
            this.vy += this.gravity ;
            this.y += this.vy;
            this.birdElement.style.top =this.y+"px";
        }
        if (this.y < 0){
            this.y = 0;
            this.vy = 0;
            this.birdElement.style.top =this.y+"px";
        }  
        if(spacePress == true) this.flap();
    } 
    flap() {
        if (spacePress == true){
            this.vy -= this.jump;
        }
    }
}

const bird = new Bird();
bird.draw();

//bird control event
document.addEventListener('keydown',(event) =>{
    if(event.code == "Space"){
        spacePress = true;
        
    }
});
document.addEventListener('keyup',(event) =>{
    if(event.code == "Space"){
        spacePress = false;
        
    }
});


//  ---------------------------------------------
class Obstacle{
    constructor(){
        this.topX =getRandomInt(300,1200);
        // this.topX =300;
        this.topY = 0;
        this.width = 30;
        this.height = getRandomInt(20, 50);
        this.speed = 0.9;
        this.temp = 0;
    }

    draw() {
        this.pipeElement = document.createElement("div");
        this.pipeElement.classList.add("pipe1");
        this.pipeElement.style.width = this.width+ "px";
        this.pipeElement.style.height = this.height + "px";
        this.pipeElement.style.position = "absolute";
        this.pipeElement.style.left = this.topX + "px";
        this.pipeElement.style.top = this.topY + "px";

        viewport.appendChild(this.pipeElement);

        this.bottomX = this.topX
        this.bottomY = getRandomInt(200,250);

        this.pipeElement2 = document.createElement("div");
        this.pipeElement2.classList.add("pipe2");
        this.pipeElement2.style.width = this.width+ "px";
        this.pipeElement2.style.height = viewportHeight + "px";
        this.pipeElement2.style.position = "absolute";
        this.pipeElement2.style.left = this.bottomX + "px";
        this.pipeElement2.style.top = this.bottomY + "px";

        viewport.appendChild(this.pipeElement2);

    }
    update() {
        //if-condition for score
        // if (this.topX < (bird.x)) {
        //     score++;
        //     scoreElement.innerHTML = score;
        // }
        //if-condition for update the bird
        if (this.topX < (0-this.width)){
            this.topX = getRandomInt(300,1200);
            this.bottomX = this.topX;
            this.pipeElement.style.left = this.topX + "px";
            this.pipeElement2.style.left = this.bottomX + "px";
            score++;
            scoreElement.innerHTML = score;
        }
        else{
            this.topX -= this.speed;
            this.pipeElement.style.left = this.topX + "px";
            this.pipeElement2.style.left = this.topX + "px";
        }
    }
    checkCollision() {
        let birdDim = {
            x : bird.x,
            y : bird.y,
            w : bird.width,
            h : bird.height
        }
        let topPipeDim ={
            x : this.topX,
            y : this.topY,
            w : this.width,
            h : this.height
        }
        let bottomPipeDim ={
            x : this.bottomX,
            y : this.bottomY,
            w : this.width,
            h : viewportHeight
        }
        console.log(birdDim)
        if ((birdDim.x < topPipeDim.x + topPipeDim.w &&
            birdDim.x + birdDim.w > topPipeDim.x &&
            birdDim.y < topPipeDim.y + topPipeDim.h &&
            birdDim.h + birdDim.y > topPipeDim.y) ||
            (birdDim.x < bottomPipeDim.x + bottomPipeDim.w &&
            birdDim.x + birdDim.w > bottomPipeDim.x &&
            birdDim.y < bottomPipeDim.y + bottomPipeDim.h &&
            birdDim.h + birdDim.y > bottomPipeDim.y)){
                console.log("collision detected!");
                if(window.localStorage.flaphighscore == undefined || window.localStorage.flaphighscore < score){
                    window.localStorage.setItem("flaphighscore",score);
                }
                highScoreElement.innerHTML = window.localStorage.getItem('flaphighscore');
                return true;
            }
        if(birdDim.y <=0 || birdDim.y >= skyHeight-bird.height){
            console.log("collision detected!");
                if(window.localStorage.flaphighscore == undefined || window.localStorage.flaphighscore < score){
                    window.localStorage.setItem("flaphighscore",score);
                }
                highScoreElement.innerHTML = window.localStorage.getItem('flaphighscore');
                return true;
        } 
        else {
            return false;
        }

    }
    
}

const obsArray = [];
function createArray(){
    for (let i = 0; i < 3; i++) {
        const obs =new Obstacle()
        obs.draw();
        obsArray.push(obs);
    }
}


//  ---------------------------------------------
function animation(){
    let collisionFlag = false;
    bird.update();
    obsArray.forEach((obs) => {
        obs.update();
        let flag = obs.checkCollision();
        if (flag == true){
            collisionFlag =true;
        }
    });
    if (collisionFlag == true){
        gameOverElement.style.display ="block";
        return;
    }
    
    requestAnimationFrame(animation);
}


document.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        window.location.reload();
    }
});

