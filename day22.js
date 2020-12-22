fs = require("fs");
lines = fs.readFileSync("./input22.txt", "utf8");
[line1, line2] = lines.split("\n\n").map((line) => line.split("\n"));
line2.pop();

p1Nums = line1.slice(1).map(Number);
p2Nums = line2.slice(1).map(Number);

const playCards = (arr1, arr2) => {
  while (arr1.length && arr2.length) {
    first = arr1.shift();
    second = arr2.shift();
    if (first > second) arr1.push(first, second);
    else arr2.push(second, first);
  }
  if (arr1.length) {
    return arr1.reverse();
  }
  return arr2.reverse();
};

console.log(
  playCards(p1Nums, p2Nums).reduce((acc, val, idx) => acc + val * (idx + 1), 0)
);
