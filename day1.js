fs = require("fs");
lines = fs.readFileSync("./input1.txt", "utf8");
data = lines.split("\n").map(Number);

//solution 1
let product;
for (i = 0; i < data.length; i++) {
  for (j = 1; j < data.length; j++) {
    if (data[i] + data[j] == 2020) {
      product = data[i] * data[j];
      break;
    }
  }
}

console.log(product);

//solution 2
let product2;
for (i = 0; i < data.length; i++) {
  for (j = 1; j < data.length; j++) {
    for (k = 2; k < data.length; k++) {
      if (data[i] + data[j] + data[k] == 2020) {
        product2 = data[i] * data[j] * data[k];
        console.log(product2);
      }
    }
  }
}
