import { readFile } from "node:fs";
import { createHash } from "node:crypto";

async function createHashForFile(pathToFile, currentPosition) {
  try {
    let pathToFileFixed;
    if (pathToFile.indexOf("c:") === -1) {
      pathToFileFixed = currentPosition + "\\" + pathToFile;
    } else {
      pathToFileFixed = pathToFile;
    }

    await readFile(pathToFileFixed, "utf-8", (err, data) => {
      if (err) throw new Error("Operation failed")
      else console.log(createHash('sha256').update(data).digest('hex'));
    })
  } catch (error) {
    console.log("Operation failed")
  }
}

export default createHashForFile;
