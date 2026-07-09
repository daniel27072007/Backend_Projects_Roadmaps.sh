import fs from 'fs'

export const JSONRead = (filePath, encoding = 'utf-8') => {
    if(!fs.existsSync(filePath)){
        return false;
    }
    try{
        const fileContentString = fs.readFileSync(filePath, encoding);
        if(fileContentString.trim() === ""){
            return false;
        }
        const fileContent = JSON.parse(fileContentString);
        return fileContent
    } catch (error) {
        return false
    }
}

export const JSONAddBlog = (filePath, articleTitle, publishingDate, content,encoding = 'utf-8') => {
    let blogContentJson = JSONRead(filePath, encoding);
    if(blogContentJson === false){
        blogContentJson = []
    }
    const maxId = blogContentJson.reduce((max, element)=> element.id > max ? element.id : max, 0);
    const addedBlog = {
        "id": maxId + 1,
        "article-title": articleTitle,
        "publishing-date": publishingDate,
        "content": content
    }
    blogContentJson.push(addedBlog);
    fs.writeFileSync(filePath, JSON.stringify(blogContentJson, null, 2));
    return true;
};