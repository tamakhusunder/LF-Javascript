
let boxElement = document.querySelector('#box');
console.log(boxElement);


class Point{
    constructor(x,y){
        this.left = x+'px';
        this.top = y+'px';
        
        
        
        this.element = document.createElement("div");
        this.element.style.width = "20px";
        this.element.style.height = "20px";
        this.element.style.position = "absolute";
        this.element.style.left = this.left;
        this.element.style.top = this.top;
        this.element.style.borderRadius = "50%";
        this.element.style.background = '#'+Math.floor(Math.random()*16777215).toString(16);

        boxElement.appendChild(this.element);

        this.element.addEventListener('click', this.changeColor.bind(this));

    }

    changeColor(){
        this.element.style.background = '#'+Math.floor(Math.random()*16777215).toString(16);
    }

}



function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
    
  }

function init(){
    //  var points = [
    //             {x: 0, y: window.innerHeight-20},
    //             {x: 0, y: 0},
    //             {x: 60, y: 20},
    //         ]; 
    let arr =Array(100).fill(0)
    let points =arr.map((val)=>({
        x:getRandomNumberInRange(0, window.innerWidth-20),
        y:getRandomNumberInRange(0, window.innerHeight-20)
    }));
    console.log(points);
     
    points.forEach((val) => {
        points = new Point(val.x,val.y);
    });
        
}

init();