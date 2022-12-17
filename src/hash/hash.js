import { readFile } from "node:fs";
import { createHash } from "node:crypto";

async function createHashForFile(pathToFile, currentPosition) {
    let pathToFileFixed;
  if (pathToFile.indexOf("c:") === -1) {
    pathToFileFixed = currentPosition + "\\" + pathToFile;
  } else {
    pathToFileFixed = pathToFile;
  }

  await readFile(pathToFileFixed, "utf-8", (err, data) => {
    if(err) throw new Error("FS operation failed")
    else console.log(createHash('sha256').update(data).digest('hex'));
})
}

export default createHashForFile;
