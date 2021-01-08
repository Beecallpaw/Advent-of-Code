fs = require("fs");
lines = fs.readFileSync("./input7.txt", "utf8");
data = lines.split("\n");
last = data.pop();
let myObj = {};

const mapper = (bagRule) => {
  [color, y] = bagRule.split(" bags contain ");
  colors = y.split(", ");

  if (colors[0] == "no other bags.") {
    myObj[color] = 0;
  } else {
    for (i = 0; i < colors.length; i++) {
      [num, ...y] = colors[i]
        .substring(0, colors[i].lastIndexOf(" "))
        .split(" ");
      z = y.join(" ");
      obj = {
        [z]: Number(num),
      };
      if (myObj[color]) {
        Object.assign(myObj[color], obj);
      } else {
        myObj[color] = obj;
      }
    }
  }
};

data.map(mapper);
set = new Set();
const recurse = (obj, color) => {
  for (const [k, v] of Object.entries(obj)) {
    if (v) {
      if (color in v) {
        set.add(k);
        recurse(obj, k);
      }
    }
  }
  return set.size;
};

// Part1 solution
console.log(recurse(myObj, "shiny gold"));

// Part2 solution
const recurse2 = (obj, type) => {
  let bags = 0;
  for (const [k, v] of Object.entries(obj[type])) {
    bags += v;
    bags += v * recurse2(obj, k);
  }
  return bags;
};

console.log(recurse2(myObj, "shiny gold"));
