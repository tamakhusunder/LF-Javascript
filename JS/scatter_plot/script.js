

function createContainer(h,w){
    var container = document.createElement("div");
    container.style.height = h + "px";
    container.style.width = w + 'px';
    container.style.border = '1px solid black';
    document.body.appendChild(container);
    return container;
}

function scatterPoint(x,y,container){
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

    point.onclick=function (event){
        console.log(event.target);
        event.target.style.background = "blue"
    }
    // const handleClick = (event)=>{
    //     console.log(event);
    // }
    // point.addEventListener("click",handleClick);
}




function render(){
    var points = [
        {x: 10, y: 20},
        {x: 40, y: 40},
        {x: 60, y: 20},
    ];
    
    let container = createContainer(500,500);
    points.forEach((value)=>{
        scatterPoint(value.x,value.y,container);
    });
}

render();

