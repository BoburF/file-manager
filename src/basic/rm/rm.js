import { rm } from "node:fs"

function remove(path, currentPosition) {
    try {
        if (path.indexOf("c:") === -1) {
            path = currentPosition + "\\" + path
        }
        rm(path, (err) => {
            if (err) console.log("Operation failed");
        })
    } catch (error) {
        console.log("Operation failed");
    }
}

export default remove