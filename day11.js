fs = require("fs");
lines = fs.readFileSync("./input11.txt", "utf8");
data = lines.split("\n");
data.pop();

const adjacents = (data, i, j) => {
  return [
    (data[i - 1] && data[i - 1][j - 1]) || null,
    (data[i - 1] && data[i - 1][j + 1]) || null,
    (data[i - 1] && data[i - 1][j]) || null,
    (data[i + 1] && data[i + 1][j - 1]) || null,
    (data[i + 1] && data[i + 1][j + 1]) || null,
    (data[i] && data[i][j - 1]) || null,
    (data[i] && data[i][j + 1]) || null,
    (data[i + 1] && data[i + 1][j]) || null,
  ];
};

const calculateAdjacent = (data, val, i, j) => {
  adjs = adjacents(data, i, j);
  if (val == "L") {
    if (adjs.indexOf("#") == -1) return "#";
    return "L";
  }
  if (val == "#") {
    if (adjs.filter((val) => val == "#").length >= 4) return "L";
    return "#";
  }
};

const occupySeats = (data) => {
  arr = [];
  rowLen = data[0].length;
  colLen = data.length;
  for (i = 0; i < colLen; i++) {
    str = "";
    for (j = 0; j < rowLen; j++) {
      val = data[i][j];
      if (val == ".") str += ".";
      else str += calculateAdjacent(data, val, i, j);
    }
    arr.push(str);
  }
  return arr;
};

const recurse = (data) => {
  first = occupySeats(data);
  second = occupySeats(first);
  val = true;
  while (val) {
    if (first.join("") == second.join("")) val = false;
    else recurse(second);
  }
  return first.join("").match(/#/g).length;
};

//Part 1 Solution
console.log(recurse(data));
