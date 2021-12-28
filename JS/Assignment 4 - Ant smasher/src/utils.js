/**
 * @returns {Number}
 */
function getDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}


/**
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 *
 * return random number in a range
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }


/**
 * @returns {String}
 */
// function generateRandomColor(){
//     var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
//     return randomColor;
// }


/**
 * @param {Number} x1
 * @param {Number} x2
 * @param {Number} y1
 * @param {Number} y2
 * @returns {Number}
 *
 * Calculate distance between two points
 */
function getDistance(x1,y1,x2,y2){
  return Math.sqrt((x2-x1)**2+(y2-y1)**2)
}


