import { pathFix } from "../utils/stdout/write.js";
import archInfo from "./arch/arch.js";
import cpusInf from "./cpus/cpus.js";
import eol from "./eol/eol.js";
import homedirInf from "./userHomedir/userHomedir.js";

function operationOs(lines) {
    const objOs = {
        "--EOL": () => console.log(eol()),
        "--cpus": () => {
          cpusInf().forEach((item) => {
            console.log("Model: " + item.model + ",", "speed: " + item.speed);
          })
        },
        "--homedir": () => console.log(homedirInf().homedir),
        "--username": () => console.log(homedirInf().username),
        "--architecture": () => console.log(archInfo()),
      }
      const operation = pathFix(lines, "os")
      const currentOperation = objOs[operation]
    
      if(currentOperation){
        currentOperation()
      }else{
        console.log("Invalid input");
      }
}

export default operationOs