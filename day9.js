fs = require("fs");
lines = fs.readFileSync("./input9.txt", "utf8");
data = lines.split("\n").map(Number);
data.pop();

const outlier = (data, preamble) => {
  ini = 25;
  num = data[preamble];
  for (i = preamble - ini; i <= preamble; i++) {
    for (j = i + 1; j < preamble; j++) {
      if (data[i] + data[j] == num) return outlier(data, preamble + 1);
    }
  }
  return num;
};

outlierNum = outlier(data, 25);

// Part 1 solution
console.log(outlierNum);

const calcRange = (minIndex, maxIndex) => {
  nums = data.slice(minIndex, maxIndex);
  sum = nums.reduce((a, b) => a + b);

  if (sum == outlierNum) {
    sortedList = nums.sort((a, b) => a - b);
    return sortedList[0] + sortedList[sortedList.length - 1];
  }

  if (sum < outlierNum) return calcRange(minIndex, maxIndex + 1);

  return calcRange(minIndex + 1, maxIndex);
};

// Part 2 solution
console.log(calcRange(0, 2));
