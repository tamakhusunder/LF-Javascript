//accessing dom element
const homePage = document.querySelector('.home-page');
const homeSoccerBtn = document.querySelector('.home-section').children[0];
const homeChickenBtn = document.querySelector('.home-section').children[1];
const homeSumoBtn = document.querySelector('.home-section').children[2];
const homeFishBtn = document.querySelector('.home-section').children[3];
const homePlayBtn = document.querySelector('.home-points-bottom-center');
const homeBluePointDiv = document.querySelector('.home-points-bottom-left');
const homeRedPointDiv = document.querySelector('.home-points-bottom-right');
const game1 = document.querySelector('.game1');
const game2 = document.querySelector('.game2');
const game3 = document.querySelector('.game3');

console.log(homeSoccerBtn)
console.log(homeChickenBtn)

var ballHitSound = new Audio('core/assets/audio/soccer/kick ball.wav');
var whistleSound = new Audio('core/assets/audio/whistle.mp3');

let clickSoccerOnce = false;
let homeBluePoint = 0;
let homeRedPoint = 0;



let home = fn_homePage();

//event handler for home page
homeSoccerBtn.addEventListener('click', function (event) {
    let game1 = fn_soccer();
});
homeChickenBtn.addEventListener('click', function (event) {
    console.log("g2")
    let game2 = fn_chicken();
});
homeSumoBtn.addEventListener('click', function (event) {
    console.log("g3")
    let game3 = fn_sumo();
});



//function only
//home function
function fn_homePage() {
    homePage.style.display = "block";
    game1.style.display = "none";
    game2.style.display = "none";
    game3.style.display = "none";

    homeBluePointDiv.innerHTML = homeBluePoint;
    homeRedPointDiv.innerHTML = homeRedPoint;
}



//fn_catchTheFish
function fn_catchTheFish() {

}

