fs = require("fs");
lines = fs.readFileSync("./input14.txt", "utf8");
data = lines.split("\n");
data.pop();

const getAllIndexesOf0and1 = (str) => {
  let zeros = [],
    ones = [];
  for (i = 0; i < str.length; i++) {
    if (str[i] == 0) zeros.push(i);
    if (str[i] == 1) ones.push(i);
  }
  return [zeros, ones];
};

const allIndexin = (arrOfIndices, str, val) =>
  arrOfIndices.every((index) => str.charAt(index) == val);

const replaceStringIn = (str, indices, val) => {
  arr = str.split("");
  for (i = 0; i < indices.length; i++) {
    arr[indices[i]] = val;
  }
  return arr.join("");
};

const sumOfAll = (data) => {
  obj = {};
  for (inp = 0; inp < data.length; inp++) {
      [mem, val] = data[inp].split(" = ");
    if (mem == "mask") [zeros, ones] = getAllIndexesOf0and1(val);
    else {
      key = mem.match(/\d+/)[0];
      binary = String((+val).toString(2)).padStart(36, 0);
      if (allIndexin(zeros, binary, "0") && allIndexin(ones, binary, "1"))
        obj[key] = +val;
      else
        obj[key] = +(
          "0b" + replaceStringIn(replaceStringIn(binary, zeros, 0), ones, 1)
        );
    }
  }

  return Object.values(obj).reduce((num1, num2) => num1 + num2);
};

//Part 1 Solution
console.log(sumOfAll(data));
