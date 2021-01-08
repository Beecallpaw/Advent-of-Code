fs = require("fs");
lines = fs.readFileSync("./input4.txt", "utf8");
data = lines.split("\n\n");

const mapper = (x) => {
  val = x.split(/\s+/g);
  arr = [];
  val.forEach((v) => {
    [key, value] = v.split(":");
    arr[key] = value;
  });

  return arr;
};

mustInclude = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];

correctData = data
  .map(mapper)
  .filter((val) => mustInclude.every((v) => Object.keys(val).includes(v)));

// Part 1 solution
console.log(correctData.length);

// Part 2 solution
const validYear = (year, min, max) =>
  year.length == 4 && max >= year && year >= min;

ecl = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
const validEyeColor = (color) => ecl.includes(color);
const validHairColor = (color) => /^#[0-9a-f]{6}$/.test(color);
const validPid = (pid) => /^\d{9}$/.test(pid);
const validHeight = (height) => {
  [_, num, unit] = height.split(/(\d+)/);
  return (
    (unit == "cm" && num >= 150 && num <= 193) ||
    (unit == "in" && num >= 59 && num <= 76)
  );
};

console.log(
  correctData.filter(
    (x) =>
      validYear(x["byr"], 1920, 2002) &&
      validYear(x["eyr"], 2020, 2030) &&
      validYear(x["iyr"], 2010, 2020) &&
      validEyeColor(x["ecl"]) &&
      validHeight(x["hgt"]) &&
      validHairColor(x["hcl"]) &&
      validPid(x["pid"])
  ).length
);
