fs = require("fs");

lines = fs.readFileSync("./input6.txt", "utf8");
data = lines.split("\n\n");

const sum = (xs) => xs.reduce((a, b) => a + b);

const mapper = (x) => {
  str = x.split("\n").join("");
  arr = [];
  for (i = 0, len = str.length; i < len; i++) {
    if (arr.indexOf(str[i]) == -1) {
      arr.push(str[i]);
    }
  }
  return arr.length;
};
// Part1 Solution
console.log(sum(data.map(mapper)));

//Part2 Solution
const mapper2 = (x) => {
  str = x.split("\n").filter(Boolean);
  return allYes(str.length, getObject(str));
};

const allYes = (len, getObject) =>
  Object.values(getObject).filter((val) => val == len).length;

const getObject = (str) => {
  return str.join('').split('').reduce((total, letter) => {
    total[letter] = ++total[letter] || 1;
    return total;
  }, {});
};
console.log(sum(data.map(mapper2)));
