fs = require("fs");
lines = fs.readFileSync("./input18.txt", "utf8").split("\n");
lines.pop();

expressions = lines.map((line) => line.replace(/\s+/g, "").split(""));

const calculateLeftToRight = (data) => {
  let string = "";
  for (let i = 0; i < data.length; i++) {
    if (string) {
      if (Number(data[i])) string = eval(string + data[i]);
      else string += data[i];
    } else {
      string += data[i];
    }
  }
  return eval(string);
};

const subExpr = (expr) => {
  arr = [];
  j = 0;
  while (true) {
    if (expr.indexOf("(") == -1) {
      return calculateLeftToRight(expr);
    } else {
      if (expr[j] == "(") arr.push("(");
      else if (expr[j] == ")") {
        arr.push(")");
        [start, end] = [arr.lastIndexOf("("), arr.indexOf(")")];
        value = calculateLeftToRight(arr.slice(start + 1, end));
        expr.splice(start, end - start + 1, value);
        return subExpr(expr);
      } else arr.push(expr[j]);
    }
    j++;
  }
};

// Part 1 Solution
console.log(expressions.map(subExpr).reduce((x, y) => x + y));
