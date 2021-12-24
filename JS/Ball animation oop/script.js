function createContainer(width,height){
    const myContainer = document.createElement('div');
    myContainer.style.width = width +"px";
    myContainer.style.height = height +"px";
    myContainer.style.border = "1px solid black";
    myContainer.style.backgroundColor = "gray";
    document.body.appendChild(myContainer);

}

var container = createContainer(900,500);

class Ball{
    constructor(x,y,radius,speed,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.speed=speed;
        this.color=color;

        this.myElement = document.createElement('div');
        this.myElement.style.width = this.radius*2 + 'px'; 
        this.myElement.style.height = this.radius*2 + 'px'; 
        this.myElement.style.color = this.color;
        this.myElement.style.position = 'absolute';
        this.myElement.style.left = this.x + 'px'; 
        this.myElement.style.top = this.y + 'px'; 

        container.appendChild(this.myElement);

    }
}


let ball1 = new Ball(50, 0, 50, 10, "red"); 
let ball2 = new Ball( 10, 0, 50, 10, "red");
