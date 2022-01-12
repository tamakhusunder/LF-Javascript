/**
 * Accessing DOM element of homePage
 */
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
const game4 = document.querySelector('.game4');

/**
 * Accessing sound
 */
var ballHitSound = new Audio('core/assets/audio/soccer/kick ball.wav');
var whistleSound = new Audio('core/assets/audio/whistle.mp3');

/**
 * Home Page Constants and variable
 */
let clickHomeSoccerOnce = false;
let clickHomeFishOnce = false;
let homeBluePoint = 0;
let homeRedPoint = 0;


/**
 * Function calling for running Home Page
 */
let home = fn_homePage();


/**
 * event handler from home page to switch to other game
 */
homeSoccerBtn.addEventListener('click', function (event) {
    let game1 = fn_soccer();
});
homeChickenBtn.addEventListener('click', function (event) {
    let game2 = fn_chicken();
});
homeSumoBtn.addEventListener('click', function (event) {
    let game3 = fn_sumo();
});
homeFishBtn.addEventListener('click', function (event) {
    let game4 = fn_catchTheFish();
});


/**
 * Fuction for Home Page
 */
function fn_homePage() {
    homePage.style.display = "block";
    game1.style.display = "none";
    game2.style.display = "none";
    game3.style.display = "none";
    game4.style.display = "none";

    homeBluePointDiv.innerHTML = homeBluePoint;
    homeRedPointDiv.innerHTML = homeRedPoint;
}




