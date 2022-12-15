import {createReadStream, createWriteStream, rm} from "node:fs"
import {pipeline} from "node:stream"

async function copyOrMove(pathToFile, pathToNewFile, command, currentPosition) {
    let pathToFileFixed, pathToNewFileFixed;
    let fileName = pathToFile

    if(pathToFile.indexOf("c:") === -1){
        pathToFileFixed = currentPosition + "\\" + pathToFile
        fileName = fileName.split("\\")
    }else{
        pathToFileFixed = pathToFile
    }
    if(pathToNewFile.indexOf("c:") === -1){
        pathToNewFileFixed = currentPosition + "\\" + pathToNewFile + "\\" + (typeof fileName === "string" ? fileName : fileName[fileName.length - 1])
    }else{
        pathToNewFileFixed = pathToNewFile + "\\" + (typeof fileName === "string" ? fileName : fileName[fileName.length - 1])
    }

    const readFile = createReadStream(pathToFileFixed)
    const writeFile = createWriteStream(pathToNewFileFixed)
    let failed = false

    writeFile.on("error", (err) => {
        if(err) {
            console.log("Operation failed");
            failed = true
        }
    })

    readFile.on("error", (err) => {
        if(err) {
            console.log("Operation failed");
            failed = true
        }
    })
    
    if(!failed){
        pipeline(readFile, writeFile, (err) => {
            if(err) {
                console.log("Operation failed");
                failed = true
            }
        })
    }

    if(command === "mv" && !failed){
        rm(pathToFileFixed, (err) => {
            if(err) console.log("Operation failed");
        })
    }
}

export default copyOrMove