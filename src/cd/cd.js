import { directory } from "../utils/stdout/write.js";
import { homedir } from "node:os";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

let pathS = directory(homedir());

const checkDir = async (path, target) => {
  const dir = await readdir(path, { withFileTypes: true });
  const idx = dir.find((a) => a.name === target);

  if (idx) {
    return idx.isDirectory();
  } else {
    return false;
  }
};

const currentPath = async (path, targetPath) => {
  if (targetPath === pathS || !targetPath) {

    return { path: pathS, err: true };
  } else {
    if (targetPath === "..") {
      if (path === "C:") {
        return { path: path, err: true };
      } else {
        const upPath = path.split("\\");
        return {
          path: upPath.splice(0, upPath.length - 1).join("\\"),
          err: null,
        };
      }
    }
    const toPath = resolve(path, targetPath);

    if (await checkDir(path, targetPath)) {
      return { path: directory(toPath), err: null };
    } else {
      return { path: pathS, err: true };
    }
  }
};


export default currentPath;