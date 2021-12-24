function createContainer(h,w){
    let container = document.createElement("div");
    container.style.height = h + "px";
    container.style.width = w + 'px';
    container.style.border = '1px solid black';
    container.style.position = 'relative';
    document.body.appendChild(container);

    return container;

}

function animationBall(x,y,container){
    const point = document.createElement("div");
    point.style.width = "50px";
    point.style.height = "50px";
    point.style.position = "absolute";
    point.style.top = y + "px";
    point.style.left = x + "px";
    point.style.background = "red";
    point.style.borderRadius = "50%";
    container.appendChild(point);

    setTimeout(()=>{
        container.removeChild(point);
    },10)

}



let x=300, y=0, speed=5, sign=1;
let container = createContainer(600,600);

setInterval(()=>{
    animationBall(x,y,container);
    y = y + speed*sign;
    if(y>=550){
        sign = -1;
    }
    else if (y<=0) {
        sign = +1
    }
    console.log(y);
},10);



