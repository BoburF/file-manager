import {writeFileSync} from "node:fs"

function addFile(path, name) {
    writeFileSync(path + "\\" + name, "")
}

export default addFile