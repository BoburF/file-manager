import {userInfo} from "node:os"

function homedirInf() {
    const userInf = userInfo({encoding: "utf-8"})

    return {username: userInf.username, homedir: userInf.homedir}
}

export default homedirInf