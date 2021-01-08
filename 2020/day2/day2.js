fs = require("fs");

lines = fs.readFileSync("./input2.txt", "utf8");
data = lines.split("\n").filter(String);

function splitString(str) {
  let [x, y, value] = str.split(" ");
  let [min, max] = x.split("-");
  let letter = y.replace(":", "");
  return [min, max, letter, value];
}

//solution 1
function isCorrect(str) {
  [min, max, letter, value] = splitString(str);
  totalLetters = 0;
  for (i = 0; i < value.length; i++) {
    if (value[i] == letter) {
      totalLetters++;
    }
  }
  return totalLetters >= min && totalLetters <= max;
}

console.log(data.filter(isCorrect).length);

// solution 2
function isCorrect2(str) {
  [min, max, letter, value] = splitString(str);
  charAtMin = value.charAt(Number(min) - 1);
  charAtMax = value.charAt(Number(max) - 1);

  return (charAtMin == letter) != (charAtMax == letter);
}

console.log(data.filter(isCorrect2).length);
