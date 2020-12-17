fs = require("fs");
lines = fs.readFileSync("./input16.txt", "utf8");
[range, myTicket, nearbyTickets] = lines.split("\n\n");

let numSet = new Set();
const allNums = (str) => {
  str.split("\n").forEach((data) => {
    data.split(" or ").forEach((range) => {
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

// Part 2 Solution

const createMap = (data) => {
  myMap = new Map();
  let fields = data.split("\n");
  fields.forEach((val) => {
    [key, nums] = val.split(":");
    mySet = new Set();
    nums.split(" or ").forEach((range) => {
      [min, max] = range.match(/\d+/g);
      for (let i = Number(min); i <= Number(max); i++) {
        mySet.add(i);
      }
    });
    myMap.set(key, mySet);
  });
  return myMap;
};

mapOfFields = createMap(range);

const filterTickets = (nearbyTickets) =>
  nearbyTickets
    .split("\n")
    .slice(1, -1)
    .filter((str) =>
      str
        .split(",")
        .map(Number)
        .every((val) => numSet.has(val))
    );

validTickets = filterTickets(nearbyTickets);

const getAllColumns = () => {
  allColumns = {};
  validTickets.forEach((ticket) => {
    ticket
      .split(",")
      .map(Number)
      .forEach((val, ind) => {
        if (ind in allColumns) allColumns[ind] = [val, ...allColumns[ind]];
        else allColumns[ind] = [val];
      });
  });
  return Object.values(allColumns);
};

const getAllValidFields = () => {
  const colsLen = getAllColumns().length;
  allCols = getAllColumns();
  allValidFields = [];
  while ((newLen = allCols.length)) {
    first = allCols.shift();
    for (const [type, set] of myMap) {
      if (first.every((v) => set.has(v))) {
        obj = {
          field: type,
          index: colsLen - newLen,
        };
        allValidFields.push(obj);
      }
    }
  }
  return allValidFields;
};

const groupAllValidFields = (validFields) => {
  myObj = {};
  validFields.forEach((obj) => {
    if (obj.field in myObj) {
      myObj[obj.field] = [obj.index].concat(myObj[obj.field]);
    } else {
      myObj[obj.field] = obj.index;
    }
  });
  return myObj;
};

groupedFields = groupAllValidFields(getAllValidFields());

const getDepartureIndices = (groupedFields) => {
  finalObj = {};
  departureIndexes = [];
  for (let i = 0; i < myTicket.split(",").length; i++) {
    for (const [x, y] of Object.entries(groupedFields)) {
      if (Array.isArray(y)) {
        let keys = Object.keys(finalObj).map(Number);
        if (y.length == keys.length + 1) {
          y.forEach((val) => {
            if (keys.indexOf(val) == -1) {
              finalObj[val] = x;
              if (x.includes("departure")) {
                departureIndexes.push(+val);
              }
            }
          });
        }
      } else {
        finalObj[y] = x;
        if (x.includes("departure")) {
          departureIndexes.push(+val);
        }
      }
    }
  }
  return departureIndexes;
};

myTicketArray = myTicket.split("\n")[1].split(",").map(Number);
prod = 1;
getDepartureIndices(groupedFields).forEach((val) => {
  prod *= myTicketArray[val];
});

console.log(prod);
