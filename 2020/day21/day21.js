fs = require("fs");
lines = fs.readFileSync("./input21.txt", "utf8");
data = lines.split("\n");
data.pop();

let obj = {};
allIngredients = [];
data.forEach((row) => {
  [ingredients, y] = row.split("(contains ");
  ingredients = ingredients.split(" ").filter(Boolean);
  ingredients.forEach((ingredient) => {
    allIngredients.push(ingredient);
  });
  allergens = y.replace(")", "").split(", ");
  allergens.forEach((allergen) => {
    if (allergen in obj) {
      arr = [...obj[allergen], ...ingredients]
        .filter((val, _, arr) => arr.indexOf(val) != arr.lastIndexOf(val))
        .filter((v, idx, arr) => arr.indexOf(v) == idx);
      obj[allergen] = arr;
    } else {
      obj[allergen] = ingredients;
    }
  });
});

set = new Set();
for ([key, values] of Object.entries(obj)) {
  values.forEach((val) => {
    set.add(val);
  });
}
arr = Array.from(set);

count = 0;
allIngredients.forEach((ing) => {
  if (arr.indexOf(ing) == -1) {
    count++;
  }
});

//Part 1 Solution
console.log(count);

const deleteFrom = (obj, value) => {
  for (let [_, v] of Object.entries(obj)) {
    if ((idx = v.indexOf(value)) != -1) {
      v.splice(idx, 1);
    }
  }
};

newObj = {};
while (Object.keys(obj).length > 0) {
  for (let [key, value] of Object.entries(obj)) {
    if (value.length == 1) {
      newObj[value[0]] = key;
      delete obj[key];
      deleteFrom(obj, value[0]);
    }
  }
}

reversed = Object.entries(newObj).reduce(
  (obj, data) => (obj[data[1]] = data[0]) && obj,
  {}
);

console.log(
  Object.values(Object.fromEntries(Object.entries(reversed).sort())).join(",")
);
