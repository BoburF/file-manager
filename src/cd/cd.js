import {directory} from "../utils/stdout/write.js"
import {homedir} from "node:os"
import {readdirSync} from "node:fs"

let pathS = directory(homedir())

const checkDir = (path, target) => {
    const dir = readdirSync(path)
    return dir.indexOf(target)
}

const currentPath = (path, targetPath) => {
    if(targetPath === pathS || !targetPath){
        return {path: pathS, err: true}
    }else{
        if(targetPath === ".."){
            if(path === "c:\\Users"){
                return {path: path, err: true}
            }else{
                const upPath = path.split("\\")
                return {path: upPath.splice(0 ,upPath.length - 1).join("\\"), err: null}
            }
        }
        const toPath = path + "\\" + targetPath

        if(checkDir(path, targetPath) > -1){
            return {path: directory(toPath), err: null}
        }else{
            return {path: pathS, err: true}
        }
    }
}

export default currentPath