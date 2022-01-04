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
  

  function pointsRectCollision(rect1,rect2){
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        return true;
        }
    else return false;
  }