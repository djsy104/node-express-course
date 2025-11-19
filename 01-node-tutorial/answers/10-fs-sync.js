const { writeFileSync, readFileSync } = require("fs");
console.log("====Beginning====\n");
writeFileSync("./temporary/fileA.txt", "Line 1\nLine 2\nLine 3\n", {
  flag: "a",
});

const result = readFileSync("./temporary/fileA.txt", "utf8");
console.log(result);

console.log("====End====\n");
