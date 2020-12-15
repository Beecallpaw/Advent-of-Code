let arr = [2, 1, 10, 11, 0, 6];

const elvesGame = (nthNum, arr) => {
  map = new Map();
  numberOfTimes = 1;
  for (let i = 0; i < arr.length; i++) {
    numberOfTimes++;
    if (!map.has(arr[i])) {
      map.set(arr[i], i + 1);
    }
    // bit of a hack
    if (i == arr.length - 1) {
      nextNum = 0;
    }
  }

  while (numberOfTimes < nthNum) {
    if (map.has(nextNum)) {
      lastIndex = map.get(nextNum);
      map.set(nextNum, numberOfTimes);
      nextNum = numberOfTimes - lastIndex;
    } else {
      map.set(nextNum, numberOfTimes);
      nextNum = 0;
    }
    numberOfTimes++;
  }

  return nextNum;
};

// Part 1 Solution
console.log(elvesGame(2020, arr));

// Part 2 Solution
console.log(elvesGame(30000000, arr));
