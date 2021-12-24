
class Box{
    constructor(width,height){
        this.width=width;
        this.height=height;

        this.boxElement = document.createElement("div");
        this.boxElement.style.width = 600 +"px";
        this.boxElement .style.height = 600 +"px";
        this.boxElement.style.border = "1px solid black";
        this.boxElement.style.backgroundColor = "gray";
        this.boxElement.style.position = "relative";
        document.body.appendChild(this.boxElement);
        
        return this.boxElement;
    }
}

class Ball{
    constructor(x,y,radius,color,speed,box){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.speed=speed;
        this.color=color;
        this.box=box

        this.myElement = document.createElement('div');
        this.myElement.style.width = this.radius*2 + 'px'; 
        this.myElement.style.height = this.radius*2 + 'px'; 
        this.myElement.style.color = this.color;
        this.myElement.style.position = 'absolute';
        this.myElement.style.left = this.x + 'px'; 
        this.myElement.style.top = 0 + 'px'; 
        this.myElement.style.borderRadius = "50%";
        this.myElement.style.backgroundColor = this.color;


        console.log(this.myElement);
        box.appendChild(this.myElement);
        this.y = 0;
        console.log(this.y)
        let sign=1;
        setInterval(()=>{
            console.log(this.y);
            this.myElement.style.top = this.y + "px";
            if(this.y >= 500){
                sign = -1; 
            }
            else if(this.y <= 0){
                sign = 1; 
            }
            this.y = this.y + this.speed*sign;
            
            
        },70);
    }
    setToggled(){
        
    }
}

let box1 = new Box(600,600); 
let ball1 = new Ball(75, 0, 50, "red", 10, box1); 
let ball2 = new Ball( 375, 100, 50, "blue", 20, box1);
