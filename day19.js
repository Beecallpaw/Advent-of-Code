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

const createRegexp2 = (key) => {
  // 8: 42 | 42 8 => 42 | 42 42 42...
  if (key == 8) return `${createRegexp2(42)}+`;
  // 11: 42 31 | 42 11 31 => 42 31 | 42 42 42... 31 31 31...
  if (key == 11) {
    let r42 = createRegexp2(42);
    let r31 = createRegexp2(31);
    let regex = [];
    // random number 10
    for (let i = 1; i <= 10; i++) {
      regex.push(`(${r42}{${i}}${r31}{${i}})`);
    }
    return `(${regex.join("|")})`;
  }
  rules = myMap.get(key);
  if (/[a-z]/.test(rules[0])) return rules[0];
  multiples = rules.map((rule) =>
    rule.map((idx) => createRegexp2(idx)).join("")
  );
  return `(${multiples.join("|")})`;
};

// Part 2 answer
console.log(
  msgs
    .map((msg) => new RegExp(`^${createRegexp2(0)}$`).test(msg))
    .filter(Boolean).length
);
