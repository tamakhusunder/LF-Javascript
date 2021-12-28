const viewport = document.getElementById('viewport');
const boundaryWidth = 1000;
const boundaryHeight = 600;


class Ant{
    constructor(x, y, radius){
        var self = this;
        this.x = x;
        this.y = y;
        this.radius = radius;
        
    }

    drawAnt(){
        this.dx = getDirection();
        this.dy = getDirection();
        this.antElement = document.createElement("img");
        this.antElement.classList.add("ant");
        this.antElement.src = "img/movingant.gif";
        this.antElement.alt = "ant_image";
        this.antElement.style.width = 2*this.radius + "px";
        this.antElement.style.height = 2*this.radius + "px";

        this.antElement.style.top = this.y + "px";
        this.antElement.style.left = this.x + "px";
        this.antElement.style.position = "absolute";

        viewport.appendChild(this.antElement);

        // event handler to kill ant
        this.antElement.addEventListener('click',function(e){
                // viewport.removeChild(this.antElement);
                this.antElement.remove();
                score +=1;
                console.log("score: ",score);
                // let removeAntArray = antArray.filter((valueAnt)=>{
                //     return valueAnt != this;
                // })
                // console.log(removeAntArray);
                // antArray = removeAntArray;
        }.bind(this));

        this.moveAnt();
    }

    moveAnt(){
        setInterval(() => {
            this.x += speed * this.dx;
            this.y += speed * this.dy;
            this.antElement.style.top = this.y + "px";
            this.antElement.style.left = this.x + "px";
            
            this.checkWallCollision();
            this.checkAntCollision();
            
        }, 1000/fps);
    }

    
    checkWallCollision(){
        if (this.x > boundaryWidth-2*this.radius) {
            this.dx = -1;
        }

        if (this.y > boundaryHeight-2*this.radius) {
            this.dy = -1;
        }

        if (this.x < 0){
            this.dx = 1;
        }
        if(this.y < 0){
            this.dy = 1;
        }
    }

    checkAntCollision(){
        antArray.forEach((valueAnt) => {
            if (valueAnt !== this) {
                let d = getDistance(this.x, this.y, valueAnt.x, valueAnt.y);
                if (d <= (this.radius + valueAnt.radius)){
                        if (this.x < valueAnt.x) {
                            this.dx = -1; 
                        }
                        else{
                            this.dx = 1; 
                        }
                        if (this.y < valueAnt.y) {
                            this.dy = -1; 
                        }
                        else{
                            this.dy = 1; 
                        }
                        
                }
            
            }
        });

    }  
 

        
}




//start up
let antCount = 50;
let antArray = [];
const fps = 60;
const speed = 1;
let score = 0;

//creating ant array to create list of class object
for(let i = 0; i< antCount; i++){
    let radius = getRandomInt(10,30);
    let x = getRandomInt(radius,boundaryWidth-2*radius);
    let y = getRandomInt(radius,boundaryHeight-2*radius);

    // detect collision while generating new ant an creating new center
    if(i !== 0){
        for (let j = 0; j < i; j++){
            let d = getDistance(x, y, antArray[j].x, antArray[j].y);
            if (d <= (radius + antArray[j].radius)){
                x = getRandomInt(radius,boundaryWidth-2*radius);
                y = getRandomInt(radius,boundaryHeight-2*radius);
            }
        }
    }

    let ant = new Ant(x,y,radius);
    antArray.push(ant);

}

//drawing the each ant using class
antArray.forEach((valueAnt) => {
    valueAnt.drawAnt()
});

