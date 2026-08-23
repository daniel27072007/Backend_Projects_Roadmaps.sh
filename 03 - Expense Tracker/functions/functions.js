import fs from 'fs';

export const JSONAdd=(filePath, expenseName, expenseAmount, expenseCategory, encoding = 'utf-8')=>{
    let oldDataString = "[]"
    if(fs.existsSync(filePath)){
        oldDataString = fs.readFileSync(filePath, encoding);
    }
    const oldDataArray = JSON.parse(oldDataString);
    const createdTime = new Date
    const newDataArray = {
        "id": oldDataArray.length+1,
        "expense-category": expenseCategory,
        "expense-name": expenseName,
        "amount": expenseAmount,
        "createdAt": createdTime
    }
    oldDataArray.push(newDataArray);
    fs.writeFileSync(filePath, JSON.stringify(oldDataArray, null, 2), encoding);
    return oldDataArray.length;
};

export const JSONBugget = (filePath, maxBugget, buggetMonth, encoding = 'utf-8') => {
  let oldDataString = "[]";
  if (fs.existsSync(filePath)) {
    oldDataString = fs.readFileSync(filePath, encoding);
  }
  const dataArray = JSON.parse(oldDataString);
  const existingElement = dataArray.find(element => Number(element.month) === Number(buggetMonth));
  if (existingElement) {
    existingElement['max-bugget'] = Number(maxBugget);
  } else {
    dataArray.push({
      "max-bugget": Number(maxBugget),
      "month": buggetMonth
    });
  }
  fs.writeFileSync(filePath, JSON.stringify(dataArray, null, 2), encoding);
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

export const JSONToCSV = (filePath, encoding = 'utf-8')=>{
    let DataString = "[]";
  if (fs.existsSync(filePath)) {
    DataString = fs.readFileSync(filePath, encoding);
  }
  const dataArray = JSON.parse(DataString);
  if(dataArray.length === 0){
    console.error('# [ERROR] - the expense data is empty, cant convert into a CSV file');
    return 1;
  }

  const header = Object.keys(dataArray[0]);
  const headerLine = header.join(',');
  const lineOfData = dataArray.map(obj => {
    return header.map(key => JSON.stringify(obj[key])).join(',');
  });
  const csvFinal = [headerLine, ...lineOfData].join('\n');
  fs.writeFileSync('./data.csv', csvFinal, encoding);
}