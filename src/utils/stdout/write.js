function writeToStdout(text) {
  return console.log("\n" + "You are currently in " + text);
}

function directory(directory) {
  return new URL(directory).href;
}

function pathFix(lines, command) {
  const line = lines.splice(lines.indexOf(command) + 1)
  const checkTwoParametr = []
  line.filter((a, idx) => {
    if(!!a.match(/c:/m)){
      checkTwoParametr.push(idx)
    }
  })
  if(checkTwoParametr.length){
    line.filter((a,idx) => {
      if(idx > 0){
        checkTwoParametr.push(idx)
      }
    })
  }
  if(checkTwoParametr.length >= 2){
    const paths = []
    for (let i = 0; i < checkTwoParametr.length; i++) {
      paths.push(line.slice(checkTwoParametr[i], checkTwoParametr[i + 1]).join(" "))
    }

    return paths
  }else{
    return line.join(" ")
  }
}

export {
  writeToStdout,
  directory,
  pathFix
};
