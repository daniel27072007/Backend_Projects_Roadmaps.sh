import express from 'express';
import ejs from 'ejs';
import fs from 'fs';
import { JSONRead, JSONAddBlog } from './functions/jsonFunctions.js';

const app = express();
app.set('view engine', "ejs");
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());


app.get('/admin', (req, res)=>{
    const blogData = JSONRead('./data/blogData.json');
    res.render('admin', { blogData });
});

app.get('/home', (req, res)=>{
    res.render('home');
});

app.get('/article', (req, res)=>{
    res.render('article');
});

app.get('/edit/:id', (req, res)=>{
    const searchId = req.params.id
    const blogDataFull = JSONRead('./data/blogData.json');
    const blogData = blogDataFull.find((element) => element.id === Number(searchId));
    res.render('edit', { blogData });
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
    console.log(`Servidor rodando em http://localhost:${PORT}/admin`);
});