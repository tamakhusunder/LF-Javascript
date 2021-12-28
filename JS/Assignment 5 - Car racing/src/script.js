const car = document.getElementById("car");
const road = document.querySelector(".road");


let index = 1;
let laneCount = 3;
const laneLength = 600;
const laneWidth = 600;

const eachLaneWith = laneWidth / laneCount; //200
const carPaddingWidth = 50;
const carHeight = 130;
const carWidth = 100;
let speed = 5;

const laneMap = {
    0: "lane-left",
    1: "lane-middle",
    2: "lane-right"
};

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

class Obstacle {
    constructor(obsIndex,obsY,obsspeed) {
        this.index = obsIndex;
        this.y = obsY;
        this.speed = obsspeed;
    }

    drawObstacle() {
        this.element = document.createElement("img");
        // this.element.style.backgroundImage ="img/player.png";
        this.element.src = "img/obstacle.png";
        const laneMapValue = laneMap[this.index];
        this.element.setAttribute("class", `car ${laneMapValue}`);
        // this.element.style.bottom = "auto";
        this.element.style.top = this.y + "px";
        // this.element.style.transition = "none";

        road.appendChild(this.element);
    }

    moveObstacle() {
        this.y += this.speed;
        this.element.style.top = this.y + "px";

        if (this.y > (laneLength)) {
            this.y = getRandomInt(-150, -800);
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
            x : (this.index*eachLaneWith) + carPaddingWidth,
            y : this.y,
            w : carWidth,
            h : carHeight
        }
        if (gameCarDim.x < obstacleCarDim.x + obstacleCarDim.w &&
            gameCarDim.x + gameCarDim.w > obstacleCarDim.x &&
            gameCarDim.y < obstacleCarDim.y + obstacleCarDim.h &&
            gameCarDim.h + gameCarDim.y > obstacleCarDim.y) {
            console.log("collision detected!");
            
        } else {
            // no collision
        }

    }

}

const obsArray = [];

for (let i = 0; i < 2; i++) {
    let obsIndex = getRandomInt(0,3);
    let obsY = getRandomInt(-150, -800);
    let obsspeed = speed;

    const obs =new Obstacle(obsIndex,obsY,obsspeed)
    obs.drawObstacle();
    obsArray.push(obs);
}

function animation() {
    obsArray.forEach((obs) => {
        obs.moveObstacle();
        obs.checkCollision();
    });

    requestAnimationFrame(animation);
}

animation();

