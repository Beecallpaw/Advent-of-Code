fs = require("fs");
lines = fs.readFileSync("./input19.txt", "utf8");
[rules, msgs] = lines.split("\n\n").map((line) => line.split("\n"));

myMap = new Map();
rules.map((rule) => {
  [[idx], value] = rule.split(": ").map((val) => val.split(" | "));
  values = value.map((val) => {
    if (/[a-z]/.test(val)) {
      return val.replace(/"/g, "");
    }
    return val.split(" ").map(Number);
  });
  myMap.set(+idx, values);
});

const createRegexp = (key) => {
  const rules = myMap.get(key);
  if (/[a-z]/.test(rules[0])) return rules[0];
  multiples = rules.map((rule) =>
    rule.map((idx) => createRegexp(idx)).join("")
  );
  return `(${multiples.join("|")})`;
};

// Part 1 answer
console.log(
  msgs
    .map((msg) => new RegExp(`^${createRegexp(0)}$`).test(msg))
    .filter(Boolean).length
);
