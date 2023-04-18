import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";
import { pipeline } from "node:stream";

function compressWithBrotli(pathToFile, pathToNewFile, currentPosition) {
  try {
    let pathToFileFixed, pathToNewFileFixed;
    let fileName = pathToFile;
    fileName = fileName.split("\\");
    fileName = fileName[fileName.length - 1] + ".br";
    if (pathToFile.indexOf("c:") === -1) {
      pathToFileFixed = currentPosition + "\\" + pathToFile;
    } else {
      pathToFileFixed = pathToFile;
    }
    if (pathToNewFile.indexOf("c:") === -1) {
      pathToNewFileFixed = currentPosition + "\\" + pathToNewFile + "\\" + fileName;
    } else {
      pathToNewFileFixed = pathToNewFile + "\\" + fileName;
    }

    const readStream = createReadStream(pathToFileFixed);
    const writeStream = createWriteStream(pathToNewFileFixed);
    const compress = createBrotliCompress()

    pipeline(readStream, compress, writeStream, (err) => {
      if (err) console.log("Operation failed");
    })
  } catch (error) {
    console.log("Operation failed");
  }
}

export default compressWithBrotli