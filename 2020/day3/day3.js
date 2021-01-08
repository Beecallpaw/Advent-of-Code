fs = require("fs");

lines = fs.readFileSync("./input3.txt", "utf8");
data = lines.split("\n");

const tree = (stepRight = 3, stepDown = 1) => {
  moveStepRight = stepRight;
  totalTrees = 0;
  length = data[0].length; // 31
  for (
    i = stepDown, totalSteps = data.length;
    i < totalSteps;
    i = i + stepDown
  ) {
    if (data[i][moveStepRight] == "#") {
      totalTrees++;
    }
    moveStepRight = (moveStepRight + stepRight) % length;
  }
  return totalTrees;
};

//part1
console.log(tree());

//part2
console.log(tree() * tree(1) * tree(5) * tree(7) * tree(1, 2));
