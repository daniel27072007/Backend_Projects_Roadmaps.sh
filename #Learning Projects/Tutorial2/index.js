import { error } from 'console';
import fs from 'fs';

/*  Sobre ler JSON

//  forma asincorna de pegar info (readFile) - precisa de callback
fs.readFile('./user.json', 'utf-8', (error, data) => {

    if(error){
        console.log(error);
        return;
    }

    try{
        const user = JSON.parse(data);
        console.log(user.name);
    }catch(e){
        console.log(e);
    }

});

//  forma sincorna de pegar info (readFileSync) - nao precisa de callback
try{
const data = fs.readFileSync('./user.json', 'utf-8')
const user = JSON.parse(data);

console.log(user.name)    
}catch(e){
    console.log(e);
}*/

/*  Sobre escrever JSON

const data = {
    "id": 2,
    "name": "Daniel Belculfine",
    "email": "Daniel.bleculfine@gmail",
    "phone": "123-456-789-01",
    "dob": "1985-05-17T03:00.00.000Z",
    "avatar": "none"
};

//  forma assincrona de escrever(writeFile) - precisa de callback
fs.writeFile('./broga.json', JSON.stringify(data, ['id', 'name', 'email'], 2), 'utf-8', (error, result) => {
    if(error){
        console.error(error);
        return;
    }
    console.log(result)
})

//  forma sincrona de escrever(writeFileSync) - nao precisa de callback
try{
    const result = fs.writeFileSync('./broga.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log(result);
}catch(e){
    console.log(e);
}*/

/*  Pegando e alterando dados JSON (sincrona)

const updateFile = (filePath, updatedData, fileEncoding = 'utf-8') =>{
    const dataString = fs.readFileSync(filePath, fileEncoding);
    const dataObject = JSON.parse(dataString);
    const newDataObject = {...dataObject, ...updatedData};
    const newDataString = JSON.stringify(newDataObject, null, 2);
    fs.writeFileSync(filePath, newDataString, fileEncoding);
}

const filePath = './broga.json';
const fileEncoding = 'utf-8';
const data = {
    id: 1,
    name: 'Daniel Belculfine',
    age: 18,
};

updateFile(filePath, data);*/

module.exports = {JSONRead, JSONWrite, JSONUpdate, JSONDelete};

//criando helpers

const JSONWrite = (filePath, data, enconding = 'utf-8') => {
    const promiseCallback = (resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), enconding, (err) => {
            if(err){
               reject(err);
               return;
            }
            resolve(true);
        }); 
    };
    return new Promise(promiseCallback);
};

const JSONRead = (filePath, encoding = 'utf-8') => {
    const promiseCallback = (resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if(err){
                reject(err);
                return;
            }
            try{
                const object = JSON.parse(data);
                resolve(object);
            }catch(e){
                reject(e);
            }
        });
    };
    return new Promise(promiseCallback);
};

const JSONUpdate = (filePath, newData, encoding = 'utf-8') =>{
    const promiseCallback = async (resolve, reject) =>{
        try{
            const data = await JSONRead(filePath, encoding);
            const result = {...data, ...newData};
            await JSONWrite(filePath, result, encoding);
            resolve(result);
        }catch(e){
            reject(e);
        }
    };
    return new Promise(promiseCallback);
};

const JSONDelete = (filePath) => {
    const promiseCallback = (resolve, reject)=>{
        fs.unlink(filePath, (err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(true);
        });
    };
    return new Promise(promiseCallback);
}

//JSONWrite('./test.json', {name: 'Daniel'}).then(console.log).catch(console.error);
//JSONRead('./test.json',).then(console.log).catch(console.error);
//JSONUpdate('./test.json', {age: 18}).then(console.log).catch(console.error);
//JSONDelete('./user.json').then(console.log).catch(console.error);