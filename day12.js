fs = require("fs");
lines = fs.readFileSync("./input12.txt", "utf8");
data = lines.split("\n");
data.pop();

const calculateRotation = (direction, rotationDegree, clockwise = true) => {
  allDirections = "NWSE";
  if (clockwise) allDirections = "NESW";
  currentIndex = allDirections.indexOf(direction);
  degreeIndex = rotationDegree / 90;

  return allDirections[(currentIndex + degreeIndex) % 4];
};

const manhattanDistance = (data) => {
  let obj = { E: 0, S: 0 };
  moving = "E";
  for (i = 0; i < data.length; i++) {
    [x, y] = data[i].split(/(\d+)/);
    moveUnits = +y;
    switch (x) {
      case "F":
        if (moving == "N") {
          obj["S"] -= moveUnits;
        } else if (moving == "S") {
          obj["S"] += moveUnits;
        } else if (moving == "W") {
          obj["E"] -= moveUnits;
        } else {
          obj["E"] += moveUnits;
        }
        break;
      case "N":
        obj["S"] -= moveUnits;
        break;
      case "E":
        obj["E"] += moveUnits;
        break;
      case "S":
        obj["S"] += moveUnits;
        break;
      case "W":
        obj["E"] -= moveUnits;
        break;
      case "R":
        moving = calculateRotation(moving, moveUnits);
        break;
      case "L":
        moving = calculateRotation(moving, moveUnits, false);
        break;
    }
  }
  return obj["E"] + obj["S"];
};
//Part 1 Solution
console.log(manhattanDistance(data));
