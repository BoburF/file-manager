import { createReadStream } from "node:fs";

const read = (path, writeToStdout, currentPosition) => {
  try {
    const arrPath = path.split("\\")

    if (arrPath.indexOf("c:") > -1) {
      path = path
    } else {
      path = currentPosition + "\\" + path
    }
    const stream = createReadStream(path, { encoding: "utf-8" });
    stream.on("data", (chunk) => {
      console.log(chunk);
    });
    stream.on("end", () => {
      writeToStdout(currentPosition)
    })
    stream.on("error", (err) => {
      console.log("Operation failed")
    })
  } catch (error) {
    console.log("Operation failed")
  }
};

export default read;
