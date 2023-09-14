import { createInterface } from "node:readline";
import { writeToStdout, pathFix, twoPathFix } from "./src/utils/stdout/write.js";
import ls from "./src/basic/ls/ls.js";
import currentPath from "./src/cd/cd.js";
import { username, quest } from "./src/utils/username/username.js";
import operationOs from "./src/system/allIntoOne.js";
import basicOperation from "./src/basic/allIntoOne.js";
import compressWithBrotli from "./src/brotli/compress.js";
import decompressWithBrotli from "./src/brotli/decompress.js";
import createHashForFile from "./src/hash/hash.js";
import { homedir } from "node:os";

const rl = createInterface({ input: process.stdin, output: process.stdout });

let userName = username(process.argv[3]);
let currentPosition = homedir();

if (userName) {
  console.log(`Welcome to the File Manager, ${userName}!`);
  writeToStdout(currentPosition);
} else {
  function nameToUserName(name) {
    userName = name;
  }

  quest(rl, currentPosition, nameToUserName);
}

rl.on("line", async (line) => {
  const lines = line.trim().split(" ");

  if (lines.includes("ls")) {
    const lists = await ls(currentPosition);
    console.table(lists);
  } else if (lines[0] === "cd") {
    const pathToFile = pathFix(lines, "cd");
    const checkedPosition = await currentPath(currentPosition, pathToFile);

    if (!checkedPosition.err) {
      currentPosition = checkedPosition.path;
    } else {
      console.log("Operation failed");
    }
  } else if (lines[0] === "up") {
    const checkedPosition = await currentPath(currentPosition, "..");
    if (!checkedPosition.err) {
      currentPosition = checkedPosition.path;
    } else {
      console.log("Operation failed");
    }
  } else if (lines[0] === ".exit") {
    rl.close();
    return;
  } else if (lines[0] === "cat") {
    basicOperation["cat"](lines, currentPosition, writeToStdout);
  } else if (lines[0] === "add") {
    basicOperation["add"](lines, currentPosition);
  } else if (lines[0] === "rn") {
    basicOperation["rn"](lines, currentPosition);
  } else if (lines[0] === "cp") {
    basicOperation["cp"](lines, currentPosition);
  } else if (lines[0] === "mv") {
    basicOperation["mv"](lines, currentPosition);
  } else if (lines[0] === "rm") {
    basicOperation["rm"](lines, currentPosition);
  } else if (lines[0] === "os") {
    operationOs(lines);
  } else if (lines[0] === "compress") {
    const pathToFile = twoPathFix(lines, "compress");
    compressWithBrotli(pathToFile[0], pathToFile[1], currentPosition);
  } else if (lines[0] === "decompress") {
    const pathToFile = twoPathFix(lines, "decompress");
    decompressWithBrotli(pathToFile[0], pathToFile[1], currentPosition);
  } else if (lines[0] === "hash") {
    const pathToFile = pathFix(lines, "hash");
    console.log(await createHashForFile(pathToFile, currentPosition));
  } else {
    console.log("Invalid input");
  }

  writeToStdout(currentPosition);
});

rl.on("close", () =>
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
);