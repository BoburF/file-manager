import {arch} from "node:os"

function archInfo() {
    return arch()
}

export default archInfo