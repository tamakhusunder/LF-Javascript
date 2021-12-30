// class Bird{
//     constructor(){
//         this.x = 150;
//         this.y = 200;
//         this.vy = 0;    //center bird position
//         this.width = 20;
//         this.height = 20;
//         this.gravity = 1;
//         this.jump = 2;
//     }

//     draw() {
//         this.birdElement = document.createElement("div");
//         this.birdElement.classList.add("bird");
//         this.birdElement.style.width = this.width+ "px";
//         this.birdElement.style.height = this.height + "px";
//         this.birdElement.style.position = "absolute";
//         this.birdElement.style.left = this.x + "px";
//         this.birdElement.style.top = this.y + "px";

//         viewport.appendChild(this.birdElement);
//         this.birdElement.innerHTML="sss"

//         // this.birdElement.src = "img/movingant.gif";
//         // this.birdElement.alt = "ant_image";
      
//     }

//     update() {
//             this.y+=2;
//              this.birdElement.style.top =this.y+"px";
     
        
        
//     }
      
// }
// console.log(viewport)
// // const bird = new Bird();
// // bird.draw();