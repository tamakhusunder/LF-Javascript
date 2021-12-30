const  viewport = document.querySelector('.sky_bg');
const  footer = document.querySelector('.footer');

console.log(viewport)
viewportWidth = 600;
viewportHeight = 400;

const floorWidth = 600;
const floorHeight = 100;

let score = 0;
let highScore = 0;
let gameSpeed = 2;
let frame = 0;
let spacePress = false;


//bird-----------------
class Bird{
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;    //center bird position
        this.width = 20;
        this.height = 20;
        this.gravity = 1;
        this.jump = 2;
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
        this.birdElement.innerHTML="sss"

        // this.birdElement.src = "img/movingant.gif";
        // this.birdElement.alt = "ant_image";
      
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


////////////////////////////////////////
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
        this.pipeElement.innerHTML="sss";

        this.bottomX = this.topX
        this.bottomY = getRandomInt(200,250);

        this.pipeElement2 = document.createElement("div");
        this.pipeElement2.classList.add("pipe2");
        this.pipeElement2.style.width = this.width+ "px";
        this.pipeElement2.style.height = 200 + "px";
        this.pipeElement2.style.position = "absolute";
        this.pipeElement2.style.left = this.bottomX + "px";
        this.pipeElement2.style.top = this.bottomY + "px";

        viewport.appendChild(this.pipeElement2);
        this.pipeElement2.innerHTML="sss";

    }
    update() {
        if (this.topX < (0-this.width)){
            this.topX = getRandomInt(300,1200);
            this.bottomX = this.topX;
            this.pipeElement.style.left = this.topX + "px";
            this.pipeElement2.style.left = this.bottomX + "px";
        }
        else{
            this.topX -= this.speed;
            this.pipeElement.style.left = this.topX + "px";
            this.pipeElement2.style.left = this.topX + "px";
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
createArray();


////////////////////////////
function animation(){
    
    bird.update();
    obsArray.forEach((obs) => {
        obs.update();
    });
    
    requestAnimationFrame(animation);
}
animation();

