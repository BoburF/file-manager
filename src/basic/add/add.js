import {writeFile} from "node:fs"

function addFile(currentPosition, name) {
    writeFile(currentPosition + "\\" + name, "", (err) => {
        if (err)
            console.log("Operation failed");
    })
}

export default addFile