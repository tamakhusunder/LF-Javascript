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
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


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

  
/**
 * @param {object} rect1
 * @param {object} rect2
 * @returns {boolean}
 *
 * Check collision of two rectangle 
 */
  function pointsRectCollision(rect1,rect2){
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        return true;
        }
    else return false;
  }