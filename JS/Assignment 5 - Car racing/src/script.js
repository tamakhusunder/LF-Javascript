/**
 * Accessing DOM
 */
const startMenuDiv = document.querySelector(".start-menu");
const gamesectionDiv = document.querySelector(".game-section");
const scoreElement = document.getElementById("scoredigit");
const startbtnElement = document.getElementById("start-btn");
const highScoreElement = document.getElementById("highscoredigit");
const gameOverElement = document.querySelector(".exit-menu");

const car = document.getElementById("car");
const road = document.querySelector(".road");

/**
 * Game Constants and variable
 */
let index = 1;
let laneCount = 3;
const laneLength = 600;
const laneWidth = 600;

const eachLaneWith = laneWidth / laneCount; //200
const carPaddingWidth = 50;
const carHeight = 130;
const carWidth = 100;
let speed = 5;
let score = 0;

const laneMap = {
    0: "lane-left",
    1: "lane-middle",
    2: "lane-right"
};

/**
 * Event Handler to start the game
 */
let initalPage = startbtnElement.addEventListener("click", (event) => {
        startMenuDiv.style.display = "none";
        gamesectionDiv.style.display = "block";
        createArray();
        startAnimation();
});

/**
 * Event Handler to change player car
 */
let currentCarPosition =
    document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowLeft") {
            index--;
            if (index < 0) index = 0;
        }
        else if (event.code === "ArrowRight") {
            index++;
            if (index > laneCount - 1) index = laneCount - 1;
        }

        const laneMapValue = laneMap[index];

        car.setAttribute("class", `car ${laneMapValue}`);
    });

/**
 * Set a high score in local storage
 */
if(window.localStorage.highscore != undefined){
    highScoreElement.innerHTML = window.localStorage.getItem('highscore');
}



class Obstacle {
    constructor(obsIndex,obsY,obsspeed) {
        this.obsIndex = obsIndex;
        this.y = obsY + 3*carHeight;
        this.speed = obsspeed;
    }

    drawObstacle() {
        this.element = document.createElement("img");
        this.element.src = "img/obstacle.png";
        const laneMapValue = laneMap[this.obsIndex];
        this.element.setAttribute("class", `car ${laneMapValue}`);
        this.element.style.top = this.y + "px";
        this.element.style.transition = "none";

        road.appendChild(this.element);
    }

    moveObstacle() {
        this.y += this.speed;
        this.element.style.top = this.y + "px";

        if (this.y > (laneLength)) {
            this.y = getRandomInt(-150, -800);
            score++;
            scoreElement.innerHTML = score;
        }

    }

    checkCollision() {
        let gameCarDim = {
            x : (index*eachLaneWith) + carPaddingWidth,
            y : laneLength - carHeight,
            w : carWidth,
            h : carHeight
        }
        let obstacleCarDim ={
            x : (this.obsIndex*eachLaneWith) + carPaddingWidth,
            y : this.y,
            w : carWidth,
            h : carHeight
        }
        if (gameCarDim.x < obstacleCarDim.x + obstacleCarDim.w &&
            gameCarDim.x + gameCarDim.w > obstacleCarDim.x &&
            gameCarDim.y < obstacleCarDim.y + obstacleCarDim.h &&
            gameCarDim.h + gameCarDim.y > obstacleCarDim.y) {
                // console.log("collision detected!");
                if(window.localStorage.highscore == undefined || window.localStorage.highscore < score){
                    window.localStorage.setItem("highscore",score);
                }
                highScoreElement.innerHTML = window.localStorage.getItem('highscore');
                return true;
        } else {
            return false;
        }

    }

}


const obsArray = [];
function createArray(){
    for (let i = 0; i < 2; i++) {
        let obsIndex = getRandomInt(0,3);
        let obsY = getRandomInt(-150, -800);
        let obsspeed = speed;
        // if(i !== 0){
        //     console.log(Math.abs(obsArray[i-1].y - obsY));
        //     if(Math.abs(obsArray[i-1].y - obsY < 4*carHeight)){
        //                 obsY = obsY-3*carHeight;
        //             }
        // }
        const obs =new Obstacle(obsIndex,obsY,obsspeed)
        obs.drawObstacle();
        obsArray.push(obs);
    }
}


function startAnimation() {
    let collisionFlag = false;
    obsArray.forEach((obs) => {
        obs.moveObstacle();
        let flag = obs.checkCollision();
        if (flag == true){
            collisionFlag =true;
        }

    });
    if (collisionFlag == true){
        gameOverElement.style.display ="block";
        return;
    }
    requestAnimationFrame(startAnimation);
}



document.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        window.location.reload();
    }
});

