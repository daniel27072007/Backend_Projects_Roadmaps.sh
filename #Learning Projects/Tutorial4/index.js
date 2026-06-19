import fs from 'fs';
//imports para o video
import { loadFile } from './loadFile.js';
import { countChars } from './countChars.js';

//como eu fiz
/*const Read = (filePath, letterSelected, encoding = 'utf-8')=>{
    const data = fs.readFileSync(filePath, encoding);
    let count = 0;
    for(let i = 0; i < data.length; i++){
        if(letterSelected === data[i]){
            count += 1;
        }
    }
    console.log(count);
    count = 0;
}

Read('./text', "2");*/

//jeito do video
const [char, file] = process.argv.splice(2);
if(!char){
    console.error("You must provide a charater as an agument");
    process.exit(1);
}

const Read = async ()=>{
    const data =  await loadFile(file);
    const count =  await countChars(char, data);
    console.log(`There was ${count} "${char}" in the file`);
}

Read();