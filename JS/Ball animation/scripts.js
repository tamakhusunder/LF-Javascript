function createContainer(h,w){
    var container = document.createElement("div");
    container.style.height = h + "px";
    container.style.width = w + 'px';
    container.style.border = '1px solid black';
    document.body.appendChild(container);
    
    let x=230, y=10 ,speed=5;
    setInterval(()=>{
        animationBall(x,y,container);
        if(y>=490){
            speed = -speed;
        }
        else if (y<=9) {
            speed=-speed;
        }
        y+=speed;
        console.log(y);
    },10);

}

function animationBall(x,y,container){
    const point = document.createElement("div");
    point.style.width = "20px";
    point.style.height = "20px";
    point.style.position = "absolute";
    point.style.top = y + "px";
    point.style.left = x + "px";
    point.style.background = "red";
    point.style.borderRadius = "50%";
    // console.log(point);
    container.appendChild(point);
    setTimeout(()=>{
        container.removeChild(point);

    },10)

}

function scatterPoint(x,y,container){
    const point = document.createElement("div");
    point.style.width = "50px";
    point.style.height = "50px";
    point.style.position = "absolute";
    point.style.top = y + "px";
    point.style.left = x + "px";
    point.style.background = "red";
    point.style.borderRadius = "50%";
    // console.log(point);
    container.appendChild(point);

}



function render(){
    let container = createContainer(500,500);
}


render();