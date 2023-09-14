import { directory } from "../utils/stdout/write.js";
import { homedir } from "node:os";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

const pathS = directory(homedir());

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
      const upPath = path.split("/");
      if (upPath.length === 1) {
        return { path: path, err: true };
      } else {
        upPath.pop();
        return { path: upPath.join("/"), err: null };
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