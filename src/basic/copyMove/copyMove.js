import { createReadStream, createWriteStream, rm } from "node:fs";
import { pipeline } from "node:stream";

async function copyOrMove(pathToFile, pathToNewFile, command, currentPosition) {
  try {
    let pathToFileFixed, pathToNewFileFixed;
    let fileName = pathToFile;
    fileName = fileName.split("\\");
    fileName = fileName[fileName.length - 1];

    if (pathToFile.indexOf("c:") === -1) {
      pathToFileFixed = currentPosition + "\\" + pathToFile;
    } else {
      pathToFileFixed = pathToFile;
    }
    if (pathToNewFile.indexOf("c:") === -1) {
      pathToNewFileFixed =
        currentPosition + "\\" + pathToNewFile + "\\" + fileName;
    } else {
      pathToNewFileFixed = pathToNewFile + "\\" + fileName;
    }

    const readFile = createReadStream(pathToFileFixed);
    const writeFile = createWriteStream(pathToNewFileFixed);

    pipeline(readFile, writeFile, (err) => {
      if (err) {
        console.log("Operation failed");
      } else if (command === "mv") {
        rm(pathToFileFixed, (err) => {
          if (err) console.log("Operation failed");
        });
      }
    });
  } catch (error) {
    console.log("Operation failed");
  }
}

export default copyOrMove;