import { rename } from "node:fs"

const reName = async (pathToFile, newName, currentPosition) => {
    try {
        let path, newPath;
        if (pathToFile.indexOf("c:") === -1) {
            path = currentPosition + "\\" + pathToFile
            newPath = currentPosition + "\\" + newName
        } else {
            path = pathToFile
            newPath = newName
        }

        rename(path, newPath, (err) => {
            if (err) {
                console.log("Operation failed");
            }
        });
    }catch (error) {
        console.log("Operation failed");
    }
};

export default reName;