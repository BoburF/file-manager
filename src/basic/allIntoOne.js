import { pathFix, twoPathFix } from "../utils/stdout/write.js";
import addFile from "./add/add.js";
import readFileWithStream from "./cat/cat.js";
import copyOrMove from "./copyMove/copyMove.js";
import remove from "./rm/rm.js";
import reName from "./rn/rn.js";

export default {
  cat: (lines, currentPosition, writeToStdout) => {
    const pathToFile = pathFix(lines, "cat");

    readFileWithStream(pathToFile, writeToStdout, currentPosition);
  },
  add: (lines, currentPosition) => {
    const pathToFile = pathFix(lines, "add");

    addFile(currentPosition, pathToFile);
  },
  rn: (lines, currentPosition) => {
    let pathToFile = twoPathFix(lines, "rn");

    reName(pathToFile[0], pathToFile[1], currentPosition);
  },
  cp: async (lines, currentPosition) => {
    let pathToFile = twoPathFix(lines, "cp");

    await copyOrMove(pathToFile[0], pathToFile[1], "cp", currentPosition);
  },
  mv: async (lines, currentPosition) => {
    let pathToFile = twoPathFix(lines, "mv");

    await copyOrMove(pathToFile[0], pathToFile[1], "mv", currentPosition);
  },
  rm: (lines, currentPosition) => {
    const pathToFile = pathFix(lines, "rm");
    remove(pathToFile, currentPosition);
  },

};
