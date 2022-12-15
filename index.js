import { createInterface } from "node:readline";
import ls from "./src/ls/ls.js"
import {writeToStdout, pathFix} from "./src/utils/stdout/write.js"
import currentPath from "./src/cd/cd.js"
import {username, quest} from "./src/utils/username/username.js";
import readFileWithStream from "./src/cat/cat.js"
import addFile from "./src/add/add.js";
import reName from "./src/rn/rn.js"

const rl = createInterface({ input: process.stdin, output: process.stdout });

let userName = username(process.argv.splice(3)[0])
let currentPosition = currentPath().path

if (!!userName) {
  console.log(`Welcome to the File Manager, ${userName}!`);
  writeToStdout(currentPosition)
} else {
  function nameToUserName(name) {
    userName = name
  }

  quest(rl, writeToStdout, currentPosition, nameToUserName)
}

rl.on("line", async (line) => {

  const lines = line.split(" ")

if(lines.indexOf("ls") > -1){

  const lists = await ls(currentPosition)
  console.table(lists);

}
else if(lines.indexOf("cd") > -1){
  const pathToFile = pathFix(lines, "cd")

  const checkedPosition = currentPath(currentPosition, pathToFile)


  if(checkedPosition.err === null){
    currentPosition = checkedPosition.path
  }else{
    console.log("Operation failed");
  }

}
else if(lines.indexOf("up") > -1){

  const checkedPosition = currentPath(currentPosition, "..")
  if(checkedPosition.err === null){
    currentPosition = checkedPosition.path
  }else{
    console.log("Operation failed");
  }
}
else if(lines.indexOf(".exit") > -1){

  rl.close()
  return
}
else if(lines.indexOf("cat") > -1){
  const pathToFile = pathFix(lines, "cat")

  readFileWithStream(pathToFile, writeToStdout, currentPosition)
}
else if(lines.indexOf("add") > -1){
  const pathToFile = pathFix(lines, "add")

  addFile(currentPosition, pathToFile)
}
else if(lines.indexOf("rn") > -1){
  const pathToFile = pathFix(lines, "add")

  reName(pathToFile[0], pathToFile[1], currentPosition)
}
else{
  console.log("Invalid input");
}

writeToStdout(currentPosition)
})

rl.on("close", ()=> console.log(`Thank you for using File Manager, ${userName}, goodbye!`))