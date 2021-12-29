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