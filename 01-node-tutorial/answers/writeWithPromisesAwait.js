const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    await writeFile("./temp.txt", "Line 1\nLine 2\nLine 3\n", {
      flag: "a",
    });
  } catch (e) {
    console.log(e);
  }
};

const reader = async () => {
  try {
    const message = await readFile("./temp.txt", "utf8");
    console.log(message);
  } catch (e) {
    console.log(e);
  }
};

const readWrite = async () => {
  try {
    await writer();
    await reader();
  } catch (e) {
    console.log(e);
  }
};

readWrite();
