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

//Part 2 Solution
waypoint = {
  E: 10,
  N: 1,
  S: 0,
  W: 0,
};
rotateWaypoint = (waypoint, degree, clockwise) => {
  newWayPoint = {};
  for (key in waypoint) {
    if (waypoint[key]) {
      newKey = calculateRotation(key, degree, clockwise);
      newWayPoint[newKey] = waypoint[key];
    }
  }
  return newWayPoint;
};

const manhattanDistance2 = (data) => {
  obj = { E: 0, S: 0, W: 0, N: 0 };
  for (i = 0; i < data.length; i++) {
    [x, y] = data[i].split(/(\d+)/);
    moveUnits = +y;
    switch (x) {
      case "F":
        for (key in waypoint) {
          if (waypoint[key]) {
            if (key == "N") {
              obj["N"] += waypoint[key] * moveUnits;
            } else if (key == "S") {
              obj["S"] += waypoint[key] * moveUnits;
            } else if (key == "W") {
              obj["W"] += waypoint[key] * moveUnits;
            } else {
              obj["E"] += waypoint[key] * moveUnits;
            }
          }
        }
        break;
      case "N":
        waypoint["N"] += moveUnits;
        break;
      case "E":
        waypoint["E"] += moveUnits;
        break;
      case "W":
        waypoint["W"] += moveUnits;
        break;
      case "S":
        waypoint["S"] += moveUnits;
        break;
      case "R":
        waypoint = rotateWaypoint(waypoint, moveUnits);
        break;
      case "L":
        waypoint = rotateWaypoint(waypoint, moveUnits, false);
        break;
    }
  }
  return obj.E - obj.W + obj.N - obj.S;
};
console.log(manhattanDistance2(data));
