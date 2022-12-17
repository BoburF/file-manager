import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream";

function decompressWithBrotli(pathToFile, pathToNewFile, currentPosition) {
  let pathToFileFixed, pathToNewFileFixed;
  let fileName = pathToFile;
  fileName = fileName.split("\\");
  fileName = fileName[fileName.length - 1];
  fileName = fileName.slice(0, fileName.indexOf(".br"))
  if (pathToFile.indexOf("c:") === -1) {
    pathToFileFixed = currentPosition + "\\" + pathToFile;
  } else {
    pathToFileFixed = pathToFile;
  }
  if (pathToNewFile.indexOf("c:") === -1) {
    pathToNewFileFixed = currentPosition + "\\" + pathToNewFile;
  } else {
    pathToNewFileFixed = pathToNewFile;
  }

  const readStream = createReadStream(pathToFileFixed);
  const writeStream = createWriteStream(pathToNewFileFixed);
  const compress = createBrotliDecompress()

  pipeline(readStream, compress, writeStream, (err) => {
    if(err) console.log("Operation failed");
  })
}

export default decompressWithBrotli