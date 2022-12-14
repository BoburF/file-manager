function writeToStdout(text) {
  return console.log("\n" + "You are currently in " + text);
}

function directory(directory) {
  return new URL(directory).href;
}

function pathFix(lines, command) {
  return lines.splice(lines.indexOf(command) + 1).join(" ")
}

export {
  writeToStdout,
  directory,
  pathFix
};
