import { createReadStream } from "node:fs";

const read = (path, writeToStdout, currentPosition) => {
  try {
    const arrPath = path.split("\\")

    if(arrPath.indexOf("c:") > -1){
      path = path
    }else{
      path = currentPosition + "\\" + path
    }
    const stream = createReadStream(path, { encoding: "utf8" });
    stream.on("data", (chunk) => {
      console.log(chunk);
    });
    stream.on("end", () => {
      writeToStdout(currentPosition)
    })
    stream.on("error", (err) => {
      if(err) console.log("Operation failed"); writeToStdout(currentPosition);
    })
  } catch (error) {
    console.log("Invalid input")
  }
};

export default read;
