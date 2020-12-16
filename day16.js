fs = require("fs");
lines = fs.readFileSync("./input16.txt", "utf8");
[range, myTicket, nearbyTickets] = lines.split("\n\n");

let numSet = new Set();
const allNums = (str) => {
  str.split("\n").forEach((data) => {
    ranges = data.split(" or ");
    ranges.forEach((range) => {
      [min, max] = range.match(/\d+/g);
      for (let i = Number(min); i <= Number(max); i++) {
        numSet.add(i);
      }
    });
  });

  return numSet;
};

allNums(range);

const nearbyTicketNums = (nearbyTickets) => {
  notValid = [];

  nearbyTickets
    .split("\n")
    .slice(1, -1)
    .forEach((ticket) => {
      ticket.split(",").forEach((ticketNum) => {
        if (!numSet.has(+ticketNum)) {
          notValid.push(+ticketNum);
        }
      });
    });

  return notValid.reduce((a, b) => a + b);
};

// Part 1 Solution
console.log(nearbyTicketNums(nearbyTickets));
