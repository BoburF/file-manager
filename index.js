import { createInterface } from "node:readline";
import {homedir} from "node:os"
const rl = createInterface({ input: process.stdin, output: process.stdout });

let userName = process.argv.splice(3)[0].slice(11);

function writeToStdout(text) {
  return console.log(text);
}

function directory(directory) {
    const path = new URL(directory)
    writeToStdout(`You are currently in ${path}>`)
}

if (userName) {
  writeToStdout(`Welcome to the File Manager, ${userName}!`);
  directory()
} else {
  rl.question("Your name, please: ", (name) => {
    userName = name;
    writeToStdout(`Welcome to the File Manager, ${userName}!`);
    directory(homedir())
  });
}


rl.on("close", ()=> console.log(`Thank you for using File Manager, ${userName}, goodbye!`))