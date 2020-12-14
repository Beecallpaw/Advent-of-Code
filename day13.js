fs = require("fs");
lines = fs.readFileSync("./input13.txt", "utf8");
data = lines.split("\n");

earliestTimestamp = +data[0];

busIds = data[1].split(",").filter(Number).map(Number);

const getSlightlyBiggerNum = (id, earliestTimestamp) =>
  Math.ceil(earliestTimestamp / id) * id;

obj = {};
busIds.forEach((id) => {
  obj[id] = getSlightlyBiggerNum(id, earliestTimestamp);
});

const answer = (obj) => {
  let min;
  let newObj = {};
  for (const [k, v] of Object.entries(obj)) {
    diff = v - earliestTimestamp;
    if (!min) min = diff;
    else {
      if (diff < min) {
        min = diff;
        newObj = { [k]: min };
      }
    }
  }
  for (id in newObj) {
    return id * newObj[id];
  }
};

// Part 1 Solution
console.log(answer(obj));

// Part 2 Solution
const part2 = (str) => {
  arr = str.split(",");
  narr = [];

  arr.forEach((val, key) => {
    if (val != "x") {
      key = (val - (key % val)) % val;
      narr.push([key, +val]);
    }
  });
  return narr.sort(([_, v1], [__, v2]) => v2 - v1);
};

const solution2 = (arr) => {
  let timestamp = 0;
  let inc = 1;

  for (let i = 0; i < arr.length; i++) {
    while (timestamp % arr[i][1] !== arr[i][0]) {
      timestamp += inc;
    }
    inc *= arr[i][1];
  }
  return timestamp;
};

console.log(solution2(part2(data[1])));
