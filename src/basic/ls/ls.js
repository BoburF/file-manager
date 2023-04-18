import { readdir } from "node:fs/promises"

const loopForPath = (files) => {
    const directory = []
    const file = []
    for (let i = 0; i < files.length; i++) {
        if (files[i].isDirectory()) {
            directory.push({ name: files[i].name, extname: "directory" })
        } else if (files[i].isFile()) {
            file.push({ name: files[i].name, extname: "file" })
        }
    }
    directory.sort((a, b) => a.name.toLowerCase() + b.name.toLowerCase())
    file.sort((a, b) => a.name.toLowerCase() + b.name.toLowerCase())
    return [...directory, ...file]
}

const list = async function (path) {
    try {
        let file = await readdir(path, { withFileTypes: true })
        if (!file) {
            return false
        }
        return loopForPath(file)
    } catch (error) {
        return false
    }
}

export default list