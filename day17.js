fs = require("fs");
data = fs.readFileSync("input17.txt", "utf-8").split("\n");

const mergeKeys = (a, b, c) => `${a},${b},${c}`;

map = new Map();
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    key = mergeKeys(i, j, 0);
    map.set(key, data[i][j] == "#");
  }
}

const getActiveNeighboursCount = (x, y, z) => {
  temp = [];
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        // Only if I am not myself
        if (!(i == x && j == y && k == z)) {
          key = mergeKeys(i, j, k);
          if (map.has(key)) temp.push(map.get(key));
        }
      }
    }
  }
  return temp.filter(Boolean).length;
};

for (let cycle = 0; cycle < 6; cycle++) {
  let minx = (maxx = miny = maxy = minz = maxz = null);

  for (const key of map.keys()) {
    [x, y, z] = key.split(",").map(Number);
    if (x < minx) minx = x;
    if (x > maxx) maxx = x;
    if (y < miny) miny = y;
    if (y > maxy) maxy = y;
    if (z < minz) minz = z;
    if (z > maxz) maxz = z;
  }

  newMap = new Map();

  for (let l = minx - 1; l <= maxx + 1; l++) {
    for (let m = miny - 1; m <= maxy + 1; m++) {
      for (let n = minz - 1; n <= maxz + 1; n++) {
        activeCount = getActiveNeighboursCount(l, m, n);
        key = mergeKeys(l, m, n);
        isActive = map.has(key) ? map.get(key) : false;
        if (isActive && activeCount != 2 && activeCount != 3)
          newMap.set(key, false);
        else if (!isActive && activeCount == 3) newMap.set(key, true);
        else newMap.set(key, isActive);
      }
    }
  }

  map = newMap;
}

console.log(Array.from(map.values()).filter(Boolean).length);
