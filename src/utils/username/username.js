import { writeToStdout } from "../stdout/write.js";

const getUsername = (name) => {
  return typeof name === "string" ? name.match(/(?<=--username=).*$/gm) : "";
};

const quest = async (rl, currentPosition, nameToUserName) => {
  const askName = () => {
    return new Promise((resolve) => {
      rl.question("Your name, please: ", (name) => {
        resolve(name.trim());
      });
    });
  };

  const name = await askName();
  if (name) {
    console.log(`Welcome to the File Manager, ${name}!`);
    writeToStdout(currentPosition);
    nameToUserName(name);
    return name;
  } else {
    return quest(rl, currentPosition, nameToUserName);
  }
};

export { getUsername as username, quest };