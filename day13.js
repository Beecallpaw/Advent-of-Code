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
console.log(answer(obj));
