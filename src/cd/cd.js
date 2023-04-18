import { directory } from "../utils/stdout/write.js"
import { homedir } from "node:os"
import { readdir, access } from "node:fs"
import { join } from "node:path";

let pathS = directory(homedir())

const isExistFile = async (path) => {
    try {
        await access(path);
        return true;
    } catch (error) {
        return false;
    }
};

const checkDir = async (path, target) => {
    try {
        const checkPosition = await isExistFile(join(path, target))
        if (!checkPosition) return false
        const dir = await readdir(path, { withFileTypes: true })
        const idx = dir.find((a) => a.name === target)

        if (idx) {
            return idx.isDirectory()
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const currentPath = async (path, targetPath) => {
    if (targetPath === pathS || !targetPath) {
        return { path: pathS, err: true }
    } else {
        if (targetPath === "..") {
            if (path === "C:") {
                return { path: "C:", err: true }
            } else {
                console.log("up", targetPath)
                const upPath = path.split("\\")
                return { path: upPath.splice(0, upPath.length - 1).join("\\"), err: null }
            }
        }
        const toPath = join(path, targetPath)
        const checkedPosition = await checkDir(path, targetPath)
        if (checkedPosition) {
            return { path: directory(toPath), err: null }
        } else {
            return { path: pathS, err: true }
        }
    }
}

export default currentPath