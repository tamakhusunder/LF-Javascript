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
 * Accessing sound and images
 */
var whistleSound = new Audio('core/assets/audio/soccer/whistle.mp3');
var chickenSound = new Audio('core/assets/audio/chickenRun/chick.mp3');
var drumSound = new Audio('core/assets/audio/sumo/drum.wav');
var catSound = new Audio('core/assets/audio/catchTheFish/cat.wav');
var winSound = new Audio('core/assets/audio/win.wav');
const playIconBtn = "url('core/assets/images/play.png')";
const replayIconBtn = "url('core/assets/images/replay-btn.png')";
const nextIconBtn = "url('../assets/images/next-btn.png')";


/**
 * Home Page variable(Use while making class instance for once only)
 */
let clickHomeSoccerOnce = false;
let clickHomeChickenOnce = false;
let clickHomeSumoOnce = false;
let clickHomeFishOnce = false;


/**
 * Variable for home page
 */
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
homePlayBtn.addEventListener('click', function (event) {
    let playGame = fn_soccer();
});


/**
 * Fuction for Home Page with home score points
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




