import { readFile } from "node:fs";
import { createHash } from "node:crypto";

async function createHashForFile(pathToFile, currentPosition) {
  try {
    let pathToFileFixed;
    if (pathToFile.indexOf("C:") === -1) {
      pathToFileFixed = currentPosition + "\\" + pathToFile;
    } else {
      pathToFileFixed = pathToFile;
    }

    return await new Promise((res, rej) => {
      readFile(pathToFileFixed, "utf-8", (err, data) => {
        if (err) rej("Operation failed")
        else res(createHash('sha256').update(data).digest('hex'));
      })
    })

    // await readFile(pathToFileFixed, "utf-8", (err, data) => {
    //   if (err) throw new Error("Operation failed")
    //   else console.log(createHash('sha256').update(data).digest('hex'));
    // })
  } catch (error) {
    return "Operation failed"
  }
}

export default createHashForFile;
