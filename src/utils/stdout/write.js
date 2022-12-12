function writeToStdout(text) {
  return console.log("You are currently in " + text);
}

function directory(directory) {
  return new URL(directory).href;
}

export {
  writeToStdout,
  directory,
};
