import fs from 'fs';

export const JSONRead = (filePath, encoding = 'utf-8') => {
  let jsonStringData = "[]"; 
  if (fs.existsSync(filePath)) {
    const conteudo = fs.readFileSync(filePath, encoding); 
    if (conteudo.trim() !== "") {
      jsonStringData = conteudo;
    }
  }
  const jsonArrayData = JSON.parse(jsonStringData); 
  return jsonArrayData;
};

export const JSONAdd = (filePath, taskName, state, encoding = 'utf-8')=>{
    const jsonArrayData = JSONRead(filePath);
    const createdDate = new Date().toISOString();
    const lastUpdate = new Date().toISOString();
    const newData = {
        "id": jsonArrayData.length+1,
        "description": taskName,
        "status": state,
        "createdAt": createdDate,
        "updatedAt": lastUpdate
    }
    jsonArrayData.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(jsonArrayData, null, 2));
    return newData.id
};

export const JSONRemove = (filePath, taskID, encoding = 'utf-8') => {
    const jsonArrayData = JSONRead(filePath);
    const jsonArrayDataUpdated = jsonArrayData.filter(task => task.id !== taskID);
    fs.writeFileSync(filePath, JSON.stringify(jsonArrayDataUpdated,null,2), encoding);
};

export const JSONUpdateName = (filePath, taskID, newName, encoding = 'utf-8') => {
    const jsonArrayData = JSONRead(filePath);
    const lastUpdate = new Date().toISOString();
    const jsonArrayDataUpdated = jsonArrayData.map(task=>{
        if(task.id === taskID){
            return {...task, description: newName, updatedAt: lastUpdate}
        }
        return task;
    });
    fs.writeFileSync(filePath, JSON.stringify(jsonArrayDataUpdated, null, 2), encoding);
};

export const JSONUpdateState = (filePath, taskID, state, encoding = 'utf-8') => {
    const jsonArrayData = JSONRead(filePath);
    const lastUpdate = new Date().toISOString();
    const jsonArrayDataUpdated = jsonArrayData.map(task => {
        if(task.id === taskID){
            return {...task, status: state, updatedAt: lastUpdate}
        }
        return task
    });
    fs.writeFileSync(filePath, JSON.stringify(jsonArrayDataUpdated, null, 2), encoding);
};