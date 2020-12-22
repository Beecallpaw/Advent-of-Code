fs = require("fs");
lines = fs.readFileSync("./input20.txt", "utf8");
tiles = lines.split("\n\n");
tiles.pop();

const reverse = (string) => string.split("").reverse().join("");

myMap = new Map();
tiles.forEach((tile) => {
  [tileNum, ...tileData] = tile.split("\n").filter(Boolean);
  [number] = tileNum.match(/\d+/g);
  row1 = tileData[0];
  revRow1 = reverse(row1);
  row2 = tileData[tileData.length - 1];
  revRow2 = reverse(row2);
  col1 = tileData.reduce((acc, val) => acc + val[0], "");
  revCol1 = reverse(col1);
  col2 = tileData.reduce((acc, val) => acc + val[val.length - 1], "");
  revCol2 = reverse(col2);
  myMap.set(number, [
    row1,
    row2,
    col1,
    col2,
    revRow1,
    revRow2,
    revCol1,
    revCol2,
  ]);
});

const getAllTileEdges = (tiles) => {
  allTiles = [];
  for (let tile of tiles) {
    tile.forEach((t) => {
      allTiles.push(t);
    });
  }
  return allTiles;
};
allTiles = getAllTileEdges(myMap.values());

const getProduct = () => {
  obj = {};
  for (let [num, tile] of myMap.entries()) {
    let count = 0;
    tile.forEach((row) => {
      if (allTiles.filter((x) => x == row).length >= 2) {
        count++;
      }
      obj[num] = count;
    });
  }

  prod = 1;
  for (let key in obj) {
    if (obj[key] == 4) {
      prod *= +key;
    }
  }
  return prod;
};

console.log(getProduct());
