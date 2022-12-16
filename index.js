import { createInterface } from "node:readline";
import {writeToStdout, pathFix, twoPathFix} from "./src/utils/stdout/write.js"
import ls from "./src/basic/ls/ls.js"
import currentPath from "./src/basic/cd/cd.js"
import {username, quest} from "./src/utils/username/username.js";
import readFileWithStream from "./src/basic/cat/cat.js"
import addFile from "./src/basic/add/add.js";
import reName from "./src/basic/rn/rn.js"
import copyOrMove from "./src/basic/copyMove/copyMove.js";
import remove from "./src/basic/rm/rm.js";

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
  let pathToFile = twoPathFix(lines, "rn")

  reName(pathToFile[0], pathToFile[1], currentPosition)
}
else if(lines.indexOf("cp") > -1){
  let pathToFile = twoPathFix(lines, "cp")
  
  await copyOrMove(pathToFile[0], pathToFile[1], "cp", currentPosition)
}
else if(lines.indexOf("mv") > -1){
  let pathToFile = twoPathFix(lines, "mv")
  
  await copyOrMove(pathToFile[0], pathToFile[1], "mv", currentPosition)
}
else if(lines.indexOf("rm") > -1){
  const pathToFile = pathFix(lines, "rm")
  remove(pathToFile, currentPosition)
}
else{
  console.log("Invalid input");
}

writeToStdout(currentPosition)
})

rl.on("close", ()=> console.log(`Thank you for using File Manager, ${userName}, goodbye!`))