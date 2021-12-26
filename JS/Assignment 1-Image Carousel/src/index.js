/*

var container = document.getElementsByClassName('carousel-container')[0];
var wrapperImage =  document.querySelector('.carousel-image-wrapper');

const imageWidth = 600;
const imageCount = wrapperImage.children.length;
console.log(imageCount)

// images.style.width = `${imageCount * imageWidth}px`;
//loop for horizontal alignment of image
for (let i = 0; i < imageCount; i++) {
    const image = wrapperImage.children[i];
    image.style.left = `${i * imageWidth}px`;
}

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex=0;
let velocity = 10;
let interval;
let currentImagePosition;
let newImagePosition;
let dx;
console.log("---->>>",currentIndex);
nextBtn.onclick = function () {
    if (currentIndex==2){
        currentIndex=0;
    }
    else{
        currentIndex++;
    }
    console.log("//////",currentIndex);
    for (let i = 0; i < imageCount; i++) {
        const image = wrapperImage.children[i];
        currentImagePosition = parseInt(image.style.left);
        if (currentIndex == 2){
            newImagePosition = currentImagePosition + (currentIndex * imageWidth);
        }
        else{
            newImagePosition = currentImagePosition - imageWidth;
        }
        console.log("sunder");
        // setInterval(() => {
        //     dx = currentImagePosition + velocity;
        //     console.log(dx);
        //     image.style.left = dx;
        // },1000);
        // let a = interval;
        image.style.left = `${(i * imageWidth)-(imageWidth*currentIndex)}px`;
        
    }
}
prevBtn.onclick = function () {
    // console.log(currentIndex,"<<<<<<<<<");
    if (currentIndex==0){
        currentIndex=2;
    }
    else{
        currentIndex--;
    }
    console.log("<<<<<<<<<",currentIndex);
    for (let i = 0; i < imageCount; i++) {
        const image = wrapperImage.children[i];
        image.style.left = `${(i * imageWidth)-(imageWidth*currentIndex)}px`;
        console.log(">>>>>>>>>");
        console.log((i * imageWidth)-(imageWidth*currentIndex));
    }
    
}

*/