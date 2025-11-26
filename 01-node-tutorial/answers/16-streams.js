const { createReadStream } = require("fs");

const stream = createReadStream("../content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

let counter = 0;

stream.on("data", (chunk) => {
  counter++;
  console.log("Chunk: ", chunk);
  console.log("=================");
});

stream.on("end", () => {
  console.log(`Number of chunks received: ${counter}`);
  console.log("============END============");
});

stream.on("error", (err) => {
  console.log(err);
});
