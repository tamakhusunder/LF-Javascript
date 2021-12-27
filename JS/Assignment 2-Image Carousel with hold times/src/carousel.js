
class Carousel{

    constructor(obj){
        this.carouselId = obj.carouselId;
        this.holdTime = obj.holdTime;
        this.transitionTime = obj.transitionTime;
        this.imageWidth = obj.imageWidth;
    }

    runCarousel(){
        var self=this;
        var container = document.querySelector(`.${this.carouselId}`);
        var wrapperImage = container.children[0]
        wrapperImage.style.left = "0px";


        var imageCount = wrapperImage.children.length;
        

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
        controller.appendChild(carouselBtnContainer);
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
            image.style.left = `${i * this.imageWidth}px`;
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
        let lastIndex = imageCount-1;

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
                            },self.transitionTime); 

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
                            },self.transitionTime); 

        }

        /**
         * automatic using function for animation
         */
        let animateAuto = setInterval(()=>{
            currentWrapperPosition = parseInt(wrapperImage.style.left);
            if(currentIndex == lastIndex){
                currentIndex = 0;
                sign=-1;
                
            }
            else{
                currentIndex++;
                sign = 1;
            }
            newWrapperPosition = -(currentIndex*self.imageWidth)
            nextAnimation(currentWrapperPosition,newWrapperPosition,sign);
        
        },self.holdTime);

        /**
         * event handler for nextButtton
         */
        nextBtn.onclick = function () {
            currentWrapperPosition = parseInt(wrapperImage.style.left);
            if(currentIndex == lastIndex){
                currentIndex = 0;
                sign=-1;
                
            }
            else{
                currentIndex++;
                sign = 1;
            }
            newWrapperPosition = -(currentIndex*self.imageWidth)
            nextAnimation(currentWrapperPosition,newWrapperPosition,sign);
        
        }
        
        /**
         * event handler for previousButtton
         */
        prevBtn.onclick = function () {
            currentWrapperPosition = parseInt(wrapperImage.style.left);
            if(currentIndex == 0){
                currentIndex = lastIndex;
                sign = -1;
            }
            else{      
                currentIndex--;
                sign = 1;
            }
            newWrapperPosition = -(currentIndex*self.imageWidth);
            prevAnimation(currentWrapperPosition,newWrapperPosition,sign);
        
        }
        
        
        
        /**
         * event handler for  3-dots of carousel
         * currentIndex is global variable
         */
        carouselDotCotainer.children[0].addEventListener('click', function (event) {
            let dotIndex = 0;
            currentWrapperPosition = parseInt(wrapperImage.style.left);
            newWrapperPosition = -(dotIndex * self.imageWidth);
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
            newWrapperPosition = -(dotIndex * self.imageWidth)
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
            newWrapperPosition = -(dotIndex * self.imageWidth)
            if (currentIndex == dotIndex){
                //pass
            }
            else{
                sign=1;
                nextAnimation(currentWrapperPosition,newWrapperPosition,sign);
            }
            currentIndex=dotIndex;
        });

    }
}


/**
 * creating class 
 */
const carousel1 = new Carousel({
                        carouselId : 'carousel-container-1',
                        transitionTime : 5,
                        holdTime : 3000,
                        imageWidth : 600 
                    })
carousel1.runCarousel();

const carousel2 = new Carousel({
                        carouselId : 'carousel-container-2',
                        transitionTime : 20,
                        holdTime : 4000,
                        imageWidth : 600 
                    })
carousel2.runCarousel();




        