fs = require("fs");
lines = fs.readFileSync("./input8.txt", "utf8");
data = lines.split("\n").filter(Boolean);

const calculate = (sign, num1, num2) => {
  if (sign == "+") return Number(num1) + Number(num2);
  return Number(num1) - Number(num2);
};

const getAccumulatorValue = (input) => {
  let acc = 0,
    travelledIndexes = [],
    goOn = true,
    index = 0;

  while (goOn) {
    if (travelledIndexes.indexOf(input.length - 1) != -1) {
      return ["finished", acc];
    }

    if (index < 0) {
      return ["error", acc];
    }

    let [ins, arg] = input[index];
    [sign, number] = arg.split(/(\d+)/);

    switch (ins) {
      case "nop":
        travelledIndexes.push(index);
        index++;
        break;
      case "acc":
        travelledIndexes.push(index);
        if (
          travelledIndexes.indexOf(index) == travelledIndexes.lastIndexOf(index)
        ) {
          acc = calculate(sign, acc, number);
          index++;
        } else {
          goOn = false;
        }
        break;
      case "jmp":
        travelledIndexes.push(index);
        if (
          travelledIndexes.indexOf(index) == travelledIndexes.lastIndexOf(index)
        ) {
          index = calculate(sign, index, number);
        } else {
          goOn = false;
        }
        break;
    }
  }
  return ["break", acc];
};

const mapper = (str) => str.split(" ");
xs = data.map(mapper);
[cond, val] = getAccumulatorValue(xs);

//Part1 Solution
console.log(val);

//Part 2 Solution
nopIndices = [];
jmpIndices = [];
for (i = 0, len = xs.length; i < len; i++) {
  if (xs[i][0] == "nop") {
    nopIndices.push(i);
  }
  if (xs[i][0] == "jmp") {
    jmpIndices.push(i);
  }
}

for (i = 0, len = nopIndices.length; i < len; i++) {
  copy = [...data];
  arr = copy.map(mapper);
  arr[i][0] = "jmp";
  [cond, val] = getAccumulatorValue(arr);
  if (cond == "finished") {
    console.log(val);
    break;
  }
}
for (i = 0, len = jmpIndices.length; i < len; i++) {
  copy = [...data];
  newArr = copy.map(mapper);
  newArr[jmpIndices[i]][0] = "nop";
  [cond, val] = getAccumulatorValue(newArr);
  if (cond == "finished") {
    console.log(val);
    break;
  }
}
