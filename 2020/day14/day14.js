fs = require("fs");
lines = fs.readFileSync("./input14.txt", "utf8");
data = lines.split("\n");
data.pop();

const getAllIndexesOf0X1 = (str) => {
  let zeros = [],
    ones = [],
    xs = [];
  for (i = 0; i < str.length; i++) {
    if (str[i] == 0) zeros.push(i);
    if (str[i] == 1) ones.push(i);
    if (str[i] == "X") xs.push(i);
  }
  return [zeros, ones, xs];
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

const binaryWithPadding0 = (num, padLen) =>
  String((+num).toString(2)).padStart(padLen, 0);

const sumOfValues = (obj) => Object.values(obj).reduce((x, y) => x + y);

const sumOfAll = (data) => {
  obj = {};
  for (inp = 0; inp < data.length; inp++) {
    [mem, val] = data[inp].split(" = ");
    if (mem == "mask") [zeros, ones, _] = getAllIndexesOf0X1(val);
    else {
      key = mem.match(/\d+/)[0];
      binary = binaryWithPadding0(val, 36);
      if (allIndexin(zeros, binary, "0") && allIndexin(ones, binary, "1"))
        obj[key] = +val;
      else
        obj[key] = +(
          "0b" + replaceStringIn(replaceStringIn(binary, zeros, 0), ones, 1)
        );
    }
  }

  return sumOfValues(obj);
};

//Part 1 Solution
console.log(sumOfAll(data));

const replaceWithX = (str, indices) => {
  indicesLen = indices.length;
  len = Math.pow(2, indicesLen);
  arr = [];
  for (let ind = 0; ind < len; ind++) {
    arr.push(binaryWithPadding0(ind, indicesLen));
  }

  arrLen = arr.length;
  valArr = [];
  for (let j = 0; j < arrLen; j++) {
    strArr = str.split("");
    for (let k = 0; k < indicesLen; k++) {
      strArr[indices[k]] = arr[j][k];
    }
    valArr.push(+("0b" + strArr.join("")));
  }

  return valArr;
};

const sumOfAll2 = (data) => {
  newObj = {};
  for (inp = 0; inp < data.length; inp++) {
    [mem, val] = data[inp].split(" = ");
    if (mem == "mask") [_, ones, xs] = getAllIndexesOf0X1(val);
    else {
      key = mem.match(/\d+/)[0];
      bin = binaryWithPadding0(key, 36);
      memAddressToWrite = replaceWithX(replaceStringIn(bin, ones, 1), xs);
      memAddressToWrite.forEach((addr) => {
        newObj[addr] = +val;
      });
    }
  }
  return sumOfValues(newObj);
};

//Part 2 Solution
console.log(sumOfAll2(data));
