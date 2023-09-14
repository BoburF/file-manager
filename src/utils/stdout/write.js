import { resolve } from "node:path";

function writeToStdout(text) {
  console.log(`\nYou are currently in ${text}`);
}

function directory(directory) {
  return resolve(directory);
}

function pathFix(lines, command) {
  const line = lines.slice(lines.indexOf(command) + 1);
  return line.join(" ");
}

function twoPathFix(lines, command) {
  const line = lines.slice(lines.indexOf(command) + 1);

  const indexes = line.reduce((acc, val, idx) => {
    if (val.includes("c:")) {
      acc.push(idx);
    }
    return acc;
  }, []);

  if (indexes.length) {
    line.find((val, idx) => {
      if (val.includes(".")) {
        indexes.push(idx + 1);
      }
    });
  }

  const res = [];
  let j = 0;

  if (indexes.length) {
    for (let i = 0; i < indexes.length; i++) {
      res.push(line.slice(j, indexes[i + 1]).join(" "));
      j = indexes[i + 1];
    }
  } else {
    res.push(...line);
  }

  return res;
}

export { writeToStdout, directory, pathFix, twoPathFix };