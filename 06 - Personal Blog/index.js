import express from 'express';
import ejs from 'ejs';
import fs from 'fs';
import { JSONRead, JSONAddBlog, JSONUpdate, JSONDelete } from './functions/jsonFunctions.js';

const app = express();
app.set('view engine', "ejs");
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());

const basicAutentication = (req, res, next) => {
    const autenticationHeader = req.headers.authorization; 
    if(!autenticationHeader){
        res.setHeader('WWW-Authenticate', 'Basic realm="Paginas Admin"');
        return res.status(401).send('Autentication Necessary.')
    }
    const parts = autenticationHeader.split(' ');
    const base64String = parts[1]; 
    const credentialsText = Buffer.from(base64String, 'base64').toString('ascii');
    const [username, password] = credentialsText.split(':');

    if(username === 'admin' && password === '123'){
        next();
    }
    else{
        res.setHeader('WWW-Authenticate', 'Basic realm="Paginas Admin"');
        return res.status(401).send('Username or Password Invalid.')
    }
}

const formatDate = (dateString) => {
    const date = new Date(dateString + "T00:00:00Z")
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    }).format(date);
};

app.get('/admin/:id', (req, res)=>{
    const blogId = req.params.id
    JSONDelete('./data/blogData.json', blogId);;
    res.redirect('/admin');
});

app.get('/admin', basicAutentication, (req, res)=>{
    const blogData = JSONRead('./data/blogData.json');
    res.render('admin', { blogData });
});

app.get('/home', (req, res)=>{
    const blogData = JSONRead('./data/blogData.json');
    res.render('home', { blogData, formatDate });
});

app.get('/article/:id', (req, res)=>{
    const articleId = req.params.id
    const blogData = JSONRead('./data/blogData.json');
    const articleSearched = blogData.find((element)=> element.id === Number(articleId));
    res.render('article', { articleSearched, formatDate });
});

app.get('/edit/:id', (req, res)=>{
    const searchId = req.params.id
    const blogDataFull = JSONRead('./data/blogData.json');
    const blogData = blogDataFull.find((element) => element.id === Number(searchId));
    res.render('edit', { blogData });
});

app.post('/edit/:id', (req, res)=>{
    const changedBlogId = req.params.id
    const { articleTitle, publishingDate, content } = req.body
    const blogUpdated = {
        "id": Number(changedBlogId),
        "article-title": articleTitle,
        "publishing-date": publishingDate,
        "content": content
    }
    JSONUpdate('./data/blogData.json', blogUpdated, blogUpdated.id);
    res.redirect('/admin');
});

app.get('/add', (req, res)=>{
    res.render('add');
});

app.post('/add', (req, res)=>{
    const { articleTitle, publishingDate, content} = req.body
    if(JSONAddBlog('./data/blogData.json', articleTitle, publishingDate, content)){
        res.redirect('/admin');
    }
});

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}/home`);
});