/**
 * retrieving div tag from html
 */
var container = document.getElementsByClassName('carousel-container')[0];
var wrapperImage =  document.querySelector('.carousel-image-wrapper');
wrapperImage.style.left = "0px";


const imageWidth = 600;
const imageCount = wrapperImage.children.length;
const wrapperWidth = imageCount * imageWidth;


/**
 * Create elements
 */
const controller = document.createElement('div');
const carouselBtnContainer = document.createElement('div');
const carouselDotCotainer = document.createElement('div');
const nextBtn = document.createElement('button')
const prevBtn = document.createElement('button')

controller.classList.add('controller');
carouselBtnContainer.classList.add('carouselBtnContainer');
carouselDotCotainer.classList.add('carouselDotCotainer');
nextBtn.classList.add('carouselBtnContainer-nextBtn');
prevBtn.classList.add('carouselBtnContainer-prevBtn');

container.appendChild(controller);
controller.appendChild(carouselBtnContainer)
controller.appendChild(carouselDotCotainer);
carouselBtnContainer.appendChild(prevBtn);
carouselBtnContainer.appendChild(nextBtn);

for(let i=0; i<imageCount; i++){
    var carouselDots = document.createElement('div');
    carouselDots.classList.add(`carouselDotCotainer-dots${i}`);
    carouselDotCotainer.appendChild(carouselDots);
    // carouselDots.innerHTML="&FilledSmallSquare;";
}

nextBtn.innerHTML="&rangd;";
prevBtn.innerHTML="&langd;";


/**
 * Create horizontal alignment of images using loop
 */
for (let i = 0; i < imageCount; i++) {
    const image = wrapperImage.children[i];
    image.style.left = `${i * imageWidth}px`;
}


let currentIndex=0;
let speed = 20;
let position;
let currentWrapperPosition;
let currentImagePosition;
let newWrapperPosition;
let newImagePosition;
let dx=0;
let sign = 1;
console.log("---->>>",currentIndex);




/**
 * event handler for nextButtton
 */
nextBtn.onclick = function () {
    if(currentIndex == 2){
        currentIndex = 0;
        currentWrapperPosition = parseInt(wrapperImage.style.left);
        dx=currentWrapperPosition;
        sign=-1;
    }
    else{
        sign = 1;
        currentIndex++;
    }
    newWrapperPosition = - currentIndex*imageWidth;

    let interval = setInterval(() => { 
                        console.log("sunder");
                        wrapperImage.style.left = dx +"px";
                        if (dx==newWrapperPosition){
                            clearInterval(interval);
                        }
                        dx=dx-speed*sign;
                    },5); 
            
    console.log("tamakhus");

}

/**
 * event handler for previousButtton
 */
prevBtn.onclick = function () {
    if(currentIndex == 0){
        currentIndex = 2;
        currentWrapperPosition = parseInt(wrapperImage.style.left);
        dx=currentWrapperPosition;
        sign = -1;
    }
    else{
        sign = 1;
        currentIndex--;
    }
    newWrapperPosition = -currentIndex*imageWidth;
    let interval = setInterval(() => { 
                        console.log("sunder");
                        wrapperImage.style.left = dx +"px";
                        if (dx==newWrapperPosition){
                            clearInterval(interval);
                        }
                        dx=dx+speed*sign;
                    },5); 

}
