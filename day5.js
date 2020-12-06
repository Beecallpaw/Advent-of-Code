fs = require("fs");

lines = fs.readFileSync("./input5.txt", "utf8");
data = lines.split("\n").filter(Boolean);

const getNumber = (inp, type) => {
  let startIndex = 0;
  let endIndex;

  if (type == "row") endIndex = 127;
  if (type == "col") endIndex = 7;

  inp.split("").forEach((v) => {
    center = Math.ceil((endIndex - startIndex) / 2);
    switch (v) {
      case "L":
      case "F":
        endIndex -= center;
        break;
      case "R":
      case "B":
        startIndex += center;
        break;
    }
  });

  return startIndex;
};

const getSeatId = (row, col) => row * 8 + col;

const highestSeats = (pass) => {
  let [rows, cols] = pass.match(/.{1,7}/g);
  return getSeatId(getNumber(rows, "row"), getNumber(cols, "col"));
};

highestSeatsList = data.map(highestSeats);

// Part 1 solution
console.log(Math.max(...highestSeatsList));

// Part 2 Solution
// console.time("hello");
// let x = highestSeatsList.sort((a, b) => a - b);
// last = x.pop();
// for (i = x[0]; i < last; i++) {
//   if (!x.includes(i)) {
//     console.log(i);
//     break;
//   }
// }

// Part 2 Solution Optimized
let x = highestSeatsList.sort((a, b) => a - b);
let found = true;
let index = 0;
while (found) {
  if (x[index] + 1 != x[index + 1]) {
    console.log(x[index] + 1);
    found = false;
  }
  index += 2;
}
