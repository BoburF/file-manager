import {} from "../stdout/write.js"

const username = (name) => {
   return name = typeof name === "string" ? name.match(/(?<=--username=).*$/gm) : ""
}

const quest = async (rl, writeToStdout, currentPosition, nameToUserName) => { 
   return rl.question("Your name, please: ", (name) => {
     if(name.trim()){
       console.log(`Welcome to the File Manager, ${name}!`);
       writeToStdout(currentPosition);
       nameToUserName(name)
       return name
     }else{
       return quest(rl)
     }
   });
}

export {username, quest}