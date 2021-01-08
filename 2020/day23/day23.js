let xs = "389125467".split("").map(Number);
len = xs.length;
let current = 0;

const roundBy9 = (num) => (num - 1 == 0 ? 9 : num - 1);

for (let i = 0; i < 2; ++i) {
  first = xs[current];
  pickup = [];
  for (i = 1; i <= 3; i++) {
    pickup.push(xs[(current + i) % len]);
  }

  dest = roundBy9(+first);
  while (pickup.indexOf(dest) != -1) {
    dest = roundBy9(dest);
  }
  destIdx = xs.indexOf(dest);
  current = current + 1 == 9 ? 0 : current + 1;
  xs = [first, xs[destIdx], ...pickup];
    "" + first + xs[destIdx] + pickup.join("") + xs.slice(destIdx + 1).join("")
}
console.log(input);
