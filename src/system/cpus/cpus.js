import {cpus} from "node:os"

function cpusInf() {
    const arrCpus = cpus()
    arrCpus.forEach((list) => {
        delete list.times
        list.speed = list.speed + "MHz"
    })
    return arrCpus
}

export default cpusInf