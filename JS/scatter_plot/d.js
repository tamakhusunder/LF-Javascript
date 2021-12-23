function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min);
  }

let points = Array(100)
  .fill(null)
  .map((x) => ({
    x: getRandomNumberInRange(40, window.innerWidth),
    y: getRandomNumberInRange(40, window.innerHeight),
  }));

//   console.log(points);
  console.log(window.innerHeight,window.innerWidth)