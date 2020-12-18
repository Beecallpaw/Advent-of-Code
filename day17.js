fs = require("fs");
data = fs.readFileSync("input17.txt", "utf-8").split("\n");

const mergeKeys = (a, b, c, d) => `${a},${b},${c},${d}`;

map = new Map();
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    key = mergeKeys(i, j, 0, 0);
    map.set(key, data[i][j] == "#");
  }
}

const getActiveNeighboursCount = (x, y, z, w) => {
  count = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        for (let l = w - 1; l <= w + 1; l++) {
          // Only if I am not myself
          if (!(i == x && j == y && k == z && l == w)) {
            key = mergeKeys(i, j, k, l);
            if (map.has(key) && map.get(key)) count++;
          }
        }
      }
    }
  }
  return count
};

for (let cycle = 0; cycle < 6; cycle++) {
  let minx = (maxx = miny = maxy = minz = maxz = minw = maxw = null);

  for (const key of map.keys()) {
    [x, y, z, w] = key.split(",").map(Number);
    if (x < minx) minx = x;
    if (x > maxx) maxx = x;
    if (y < miny) miny = y;
    if (y > maxy) maxy = y;
    if (z < minz) minz = z;
    if (z > maxz) maxz = z;
    if (w < minw) minw = w;
    if (w > maxw) maxw = w;
  }

  newMap = new Map();

  for (let l = minx - 1; l <= maxx + 1; l++) {
    for (let m = miny - 1; m <= maxy + 1; m++) {
      for (let n = minz - 1; n <= maxz + 1; n++) {
        for (let o = minw - 1; o <= maxw + 1; o++) {
          activeCount = getActiveNeighboursCount(l, m, n, o);
          key = mergeKeys(l, m, n, o);
          isActive = map.has(key) ? map.get(key) : false;
          if (isActive && activeCount != 2 && activeCount != 3)
            newMap.set(key, false);
          else if (!isActive && activeCount == 3) newMap.set(key, true);
          else newMap.set(key, isActive);
        }
      }
    }
  }

  map = newMap;
}

console.log(Array.from(map.values()).filter(Boolean).length);
