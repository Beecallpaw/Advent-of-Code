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

  if (arr1.length) return arr1.reverse();
  return arr2.reverse();
};

// Part 1 Solution
console.log(
  playCards([...p1Nums], [...p2Nums]).reduce(
    (acc, val, idx) => acc + val * (idx + 1),
    0
  )
);

// Part 2 Solution
const recurse = (arr1, arr2) => {
  const visitedNums = new Set();
  while (arr1.length && arr2.length) {
    hash = [...arr1, " ", ...arr2].join("");
    if (visitedNums.has(hash)) return { arr: arr1, winner: 1 };
    visitedNums.add(hash);

    const first = arr1.shift();
    const second = arr2.shift();
    if (first <= arr1.length && second <= arr2.length) {
      newArr1 = arr1.slice(0, first);
      newArr2 = arr2.slice(0, second);
      const { winner } = recurse(newArr1, newArr2);
      if (winner == 1) arr1.push(first, second);
      else arr2.push(second, first);
    } else {
      if (first > second) arr1.push(first, second);
      else arr2.push(second, first);
    }
  }

  if (arr1.length) return { arr: arr1, winner: 1 };
  return { arr: arr2, winner: 2 };
};

console.log(
  recurse(p1Nums, p2Nums)
    ["arr"].reverse()
    .reduce((acc, val, idx) => acc + val * (idx + 1), 0)
);
