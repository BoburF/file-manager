import {resolve} from "node:path"

function writeToStdout(text) {
  return console.log("\n" + "You are currently in " + text);
}

function directory(directory) {
  return resolve(directory);
}

function pathFix(lines, command) {
  const line = lines.splice(lines.indexOf(command) + 1)
  return line.join(" ")
}

function twoPathFix(lines, command) {
  const line = lines.splice(lines.indexOf(command) + 1)

  const indexes = []
  line.filter((a, idx) => {
    if(a.indexOf("c:") !== -1) {
      indexes.push(idx)
    }
  })

  if(indexes.length){
    line.find((a, idx) => {
      if(a.indexOf(".") !== -1){
        indexes.push(idx + 1)
      }
    })
  }

  const res = []
  let j = 0

  if(indexes.length){
    for (let i = 0; i < indexes.length; i++) {
      res.push(line.slice(j, indexes[i + 1]).join(" "))    
      j = indexes[i + 1]
    }
  }else{
    res.push(...line)
  }

  return res
}

export {
  writeToStdout,
  directory,
  pathFix,
  twoPathFix
};
