const fs = require('fs')

const readFromFile = fileName =>{
    if(!fs.existsSync(fileName)){
        return null
    }

    return fs.readFileSync(fileName, 'utf-8')
}

const readJSON = fileName =>{
    const readFile = readFromFile(fileName)

    if(!readFile){
        return readFile
    }

    return JSON.parse(readFile)
}

write = (data, fileName) => {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2))
}

const value = [
    {
        name:'Daniel',
        city:'Itu',
        state:'SP',
        team:'Palmeiras'
    },
    {
        name:'Yasmin',
        city:'Salto',
        state:'SP',
        team:'Corinthians'
    }
]

//write(value, 'firstJSON.json') //comentar após criar um

console.log(readJSON('firstJSON.json'))