import {writeFile} from "node:fs"

function addFile(path, name) {
    writeFile(path + "\\" + name, "", (err) => {
        if (err)
            console.log("Operation failed");
    })
}

export default addFile