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

const getAdjacentValue = (data, i, j, type) => {
  switch (type) {
    case "L":
      if (data[i]) {
        val = data[i][j - 1];
        if (val == ".") return getAdjacentValue(data, i, j - 1, "L");
        else return val;
      }
      return;
    case "R":
      if (data[i]) {
        val = data[i][j + 1];
        if (val == ".") return getAdjacentValue(data, i, j + 1, "R");
        else return val;
      }
      return;
    case "U":
      if (data[i + 1]) {
        val = data[i + 1][j];
        if (val == ".") return getAdjacentValue(data, i + 1, j, "U");
        else return val;
      }
      return;
    case "D":
      if (data[i - 1]) {
        val = data[i - 1][j];
        if (val == ".") return getAdjacentValue(data, i - 1, j, "D");
        else return val;
      }
      return;
    case "LU":
      if (data[i - 1]) {
        val = data[i - 1][j + 1];
        if (val == ".") return getAdjacentValue(data, i - 1, j + 1, "LU");
        else return val;
      }
      return;
    case "RU":
      if (data[i + 1]) {
        val = data[i + 1][j + 1];
        if (val == ".") return getAdjacentValue(data, i + 1, j + 1, "RU");
        else return val;
      }
      return;
    case "LD":
      if (data[i - 1]) {
        val = data[i - 1][j - 1];
        if (val == ".") return getAdjacentValue(data, i - 1, j - 1, "LD");
        else return val;
      }
      return;
    case "RD":
      if (data[i + 1]) {
        val = data[i + 1][j - 1];
        if (val == ".") return getAdjacentValue(data, i + 1, j - 1, "RD");
        else return val;
      }
      return;
  }
};

const adjacents2 = (data, i, j) => {
  return [
    getAdjacentValue(data, i, j, "L"),
    getAdjacentValue(data, i, j, "R"),
    getAdjacentValue(data, i, j, "U"),
    getAdjacentValue(data, i, j, "D"),
    getAdjacentValue(data, i, j, "LD"),
    getAdjacentValue(data, i, j, "LU"),
    getAdjacentValue(data, i, j, "RU"),
    getAdjacentValue(data, i, j, "RD"),
  ];
};

const calculateAdjacent = (adjCalculator, data, val, i, j, num) => {
  adjs = adjCalculator(data, i, j);
  if (val == "L") {
    if (adjs.indexOf("#") == -1) return "#";
    return "L";
  }
  if (val == "#") {
    if (adjs.filter((val) => val == "#").length >= num) return "L";
    return "#";
  }
};

const occupySeats = (data, adjCalculator, num) => {
  arr = [];
  rowLen = data[0].length;
  colLen = data.length;
  for (i = 0; i < colLen; i++) {
    str = "";
    for (j = 0; j < rowLen; j++) {
      val = data[i][j];
      if (val == ".") str += ".";
      else str += calculateAdjacent(adjCalculator, data, val, i, j, num);
    }
    arr.push(str);
  }
  return arr;
};

const recurse = (data, fn = adjacents, num = 4) => {
  first = occupySeats(data, fn, num);
  second = occupySeats(first, fn, num);
  val = true;
  while (val) {
    if (first.join("") == second.join("")) val = false;
    else recurse(second, fn, num);
  }
  return first.join("").match(/#/g).length;
};

//Part 1 Solution
console.log(recurse(data));

// Part 2 Solution
console.log(recurse(data, adjacents2, 5));
