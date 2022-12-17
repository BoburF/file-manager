import { createInterface } from "node:readline";
import {writeToStdout, pathFix, twoPathFix} from "./src/utils/stdout/write.js"
import ls from "./src/basic/ls/ls.js"
import currentPath from "./src/cd/cd.js"
import {username, quest} from "./src/utils/username/username.js";
import operationOs from "./src/system/allIntoOne.js";
import basicOperation from "./src/basic/allIntoOne.js"

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

  const lines = line.trim().split(" ")

if(lines.indexOf("ls") > -1){

  const lists = await ls(currentPosition)
  console.table(lists);

}
else if(lines.indexOf("cd") === 0){
  const pathToFile = pathFix(lines, "cd")

  const checkedPosition = currentPath(currentPosition, pathToFile)


  if(checkedPosition.err === null){
    currentPosition = checkedPosition.path
  }else{
    console.log("Operation failed");
  }

}
else if(lines.indexOf("up") === 0){

  const checkedPosition = currentPath(currentPosition, "..")
  if(checkedPosition.err === null){
    currentPosition = checkedPosition.path
  }else{
    console.log("Operation failed");
  }
}
else if(lines.indexOf(".exit") === 0){

  rl.close()
  return
}
else if(lines.indexOf("cat") === 0){
  basicOperation["cat"](lines, currentPosition, writeToStdout)
}
else if(lines.indexOf("add") === 0){
  basicOperation["add"](lines, currentPosition)
}
else if(lines.indexOf("rn") === 0){
  basicOperation["rn"](lines, currentPosition)
}
else if(lines.indexOf("cp") === 0){
  basicOperation["cp"](lines, currentPosition)
}
else if(lines.indexOf("mv") === 0){
  basicOperation["mv"](lines, currentPosition)
}
else if(lines.indexOf("rm") === 0){
  basicOperation["rm"](lines, currentPosition)
}
else if(lines.indexOf("os") === 0){
  operationOs(lines)
}
else{
  console.log("Invalid input");
}

writeToStdout(currentPosition)
})

rl.on("close", ()=> console.log(`Thank you for using File Manager, ${userName}, goodbye!`))