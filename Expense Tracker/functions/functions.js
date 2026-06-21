import fs from 'fs';

export const JSONAdd=(filePath, expenseName, expenseAmount, encoding = 'utf-8')=>{
    let oldDataString = "[]"
    if(fs.existsSync(filePath)){
        oldDataString = fs.readFileSync(filePath, encoding);
    }
    const oldDataArray = JSON.parse(oldDataString);
    const createdTime = new Date
    const newDataArray = {
        "id": oldDataArray.length+1,
        "expense-name": expenseName,
        "amount": expenseAmount,
        "createdAt": createdTime
    }
    oldDataArray.push(newDataArray);
    fs.writeFileSync(filePath, JSON.stringify(oldDataArray, null, 2), encoding);
    return oldDataArray.length;
};

export const JSONUpdate=(filePath, id, expenseRename, encoding = 'utf-8')=>{
    let oldDataString = "[]"
    if(fs.existsSync(filePath)){
        oldDataString = fs.readFileSync(filePath, encoding);
    }
    const oldDataArray = JSON.parse(oldDataString);
    const newDataArray = oldDataArray.map(element=>{
        if(element.id === id){
            element['expense-name'] = expenseRename;
        }
        return element
    });
    fs.writeFileSync(filePath, JSON.stringify(newDataArray, null, 2), encoding);
};

export const deleteData=(filePath, id, encoding = 'utf-8')=>{
    let oldDataString = "[]"
    if(fs.existsSync(filePath)){
        oldDataString = fs.readFileSync(filePath, encoding);
    }
    const oldDataArray = JSON.parse(oldDataString);
    const newDataArray = oldDataArray.filter(element => element.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(newDataArray, null, 2), encoding);
    if(oldDataArray.length === newDataArray.length){
        return false
    }
    else{
        return true
    }    
};