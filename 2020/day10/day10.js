fs = require("fs");
lines = fs.readFileSync("./input10.txt", "utf8");
data = lines.split("\n");
data.pop();
data = data.map(Number).sort((a, b) => a - b);

const getDiff = (data) => {
  obj = {
    one: 1,
    three: 1,
  };

  for (i = 0; i < data.length; i++) {
    switch (data[i + 1] - data[i]) {
      case 1:
        obj.one++;
        break;
      case 3:
        obj.three++;
        break;
      default:
        break;
    }
  }
  return obj.one * obj.three;
};

//Part 1 Solution
console.log(getDiff(data));

//Part 2 Solution Optimized
obj = { 0: 1 };
for (i = 0; i < data.length; i++) {
  obj[data[i]] = 0;
  if (data[i] - 1 in obj) obj[data[i]] += obj[data[i] - 1];
  if (data[i] - 2 in obj) obj[data[i]] += obj[data[i] - 2];
  if (data[i] - 3 in obj) obj[data[i]] += obj[data[i] - 3];
}
console.log(obj[data[data.length - 1]]);
