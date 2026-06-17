import fs from 'fs';

export const loadFile = (path)=>{
    return fs.readFileSync(path, 'utf-8');
};