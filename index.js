import { createInterface } from "node:readline";
import ls from "./src/ls/ls.js"
import {writeToStdout} from "./src/utils/stdout/write.js"
import currentPath from "./src/cd/cd.js"
const rl = createInterface({ input: process.stdin, output: process.stdout });

let userName = process.argv.splice(3)[0].match(/(?<=--username=).*$/gm)
let currentPosition = currentPath().path

if (!!userName) {
  console.log(`Welcome to the File Manager, ${userName}!`);
  writeToStdout(currentPosition)
} else {
  rl.question("Your name, please: ", (name) => {
    userName = name;
    console.log(`Welcome to the File Manager, ${userName}!`);
    writeToStdout(currentPosition)
  });
}

rl.on("close", ()=> console.log(`Thank you for using File Manager, ${userName}, goodbye!`))

rl.on("line", async (line) => {

  const lines = line.split(" ")

if(lines.indexOf("ls") > -1){

  const lists = await ls(currentPosition)
  console.table(lists);

}else if(lines.indexOf("cd") > -1){

  const linesLine = lines.splice(lines.indexOf("cd") + 1).join(" ")
  const checkedPosition = currentPath(currentPosition, linesLine)

  if(checkedPosition.err === null){
    currentPosition = checkedPosition.path
  }else{
    console.log("Operation failed");
  }

}else if(lines.indexOf("up") > -1){
  const checkedPosition = currentPath(currentPosition, "..")
  if(checkedPosition.err === null){
    currentPosition = checkedPosition.path
  }else{
    console.log("Operation failed");
  }
}
else{
  console.log("Invalid input");
}
writeToStdout(currentPosition)
})