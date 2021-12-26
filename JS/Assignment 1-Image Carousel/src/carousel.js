
/**
 * retrieving div tag from html
 */
 var container = document.getElementsByClassName('carousel-container')[0];
 var wrapperImage =  document.querySelector('.carousel-image-wrapper');
 wrapperImage.style.left = "0px";
 
 
 /**
  * images variable with value
  */
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
 
 
 
 
 /**
  * Assigning variable
  */
 let currentIndex=0;
 let speed = 20;
 let currentWrapperPosition;
 let newWrapperPosition;
 let dx=0;
 let sign = 1;
 
 
 
 
 
 /**
  * function for next-animation
  * @param {number} currentPosition - currentWrapperPosition
  * @param {number} finalPosition - newWrapperPosition
  * @param {number} sign - signvalue
  */
 function nextAnimation(currentPosition, finalPosition,sign){
     dx=currentPosition;
     let interval = setInterval(() => { 
                         wrapperImage.style.left = dx +"px";
                         if (dx==finalPosition){
                             clearInterval(interval);
                         }
                         dx=dx-speed*sign;
                     },5); 
     // while(dx!= finalPosition){
     //     wrapperImage.style.left = dx +"px";
     //     dx=dx-speed*sign;
     // }
     // wrapperImage.style.left = dx +"px";
 
 }
 
 
 /**
  * function for prev-animation
  * @param {number} currentPosition - currentWrapperPosition
  * @param {number} finalPosition - newWrapperPosition
  * @param {number} sign - signvalue
  */
 function prevAnimation(currentPosition, finalPosition,sign){ 
     dx=currentPosition;
     let interval = setInterval(() => { 
                         wrapperImage.style.left = dx +"px";
                         if (dx==finalPosition){
                             clearInterval(interval);
                         }
                         dx=dx+speed*sign;
                     },5); 
 
 }
 
 
 /**
  * event handler for nextButtton
  */
 nextBtn.onclick = function () {
     currentWrapperPosition = parseInt(wrapperImage.style.left);
     if(currentIndex == 2){
         currentIndex = 0;
         sign=-1;
         
     }
     else{
         currentIndex++;
         sign = 1;
     }
     newWrapperPosition = -(currentIndex*imageWidth)
     console.log(sign);
     nextAnimation(currentWrapperPosition,newWrapperPosition,sign);
 
 }
 
 /**
  * event handler for previousButtton
  */
 prevBtn.onclick = function () {
     currentWrapperPosition = parseInt(wrapperImage.style.left);
     if(currentIndex == 0){
         currentIndex = 2;
         sign = -1;
     }
     else{      
         currentIndex--;
         sign = 1;
     }
     newWrapperPosition = -(currentIndex*imageWidth);
     prevAnimation(currentWrapperPosition,newWrapperPosition,sign);
 
 }
 
 
 
 /**
  * event handler for  3-dots of carousel
  * currentIndex is global variable
  */
 carouselDotCotainer.children[0].addEventListener('click', function (event) {
     let dotIndex = 0;
     currentWrapperPosition = parseInt(wrapperImage.style.left);
     newWrapperPosition = -(dotIndex * imageWidth);
     if (currentIndex == dotIndex){
         //pass
     }
     else{
         sign=1;
         prevAnimation(currentWrapperPosition,newWrapperPosition,sign);
     }
     currentIndex=dotIndex;
 
 });
 
 carouselDotCotainer.children[1].addEventListener('click', function (event) {
     let dotIndex = 1;
     currentWrapperPosition = parseInt(wrapperImage.style.left);
     newWrapperPosition = -(dotIndex * imageWidth)
     if (currentIndex == dotIndex){
         //pass
     }
     else if(currentIndex>dotIndex){
         sign=1;
         prevAnimation(currentWrapperPosition,newWrapperPosition,sign);
     }
     else {
         sign=1;
         nextAnimation(currentWrapperPosition,newWrapperPosition,sign);
     }
     currentIndex=dotIndex;
 });
 
 
 carouselDotCotainer.children[2].addEventListener('click', function (event) {
     let dotIndex = 2;
     currentWrapperPosition = parseInt(wrapperImage.style.left);
     newWrapperPosition = -(dotIndex * imageWidth)
     if (currentIndex == dotIndex){
         //pass
     }
     else{
         sign=1;
         nextAnimation(currentWrapperPosition,newWrapperPosition,sign);
     }
     currentIndex=dotIndex;
 });
 
 