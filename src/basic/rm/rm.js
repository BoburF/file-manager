import {rm} from "node:fs"

function remove(path, currentPosition) {
    if(path.indexOf("c:") === -1){
        path = currentPosition + "\\" + path
    }
    rm(path, (err) => {
        if(err) console.log("Operation failed");
    })
}

export default remove