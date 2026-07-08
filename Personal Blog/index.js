import express from 'express';
import ejs from 'ejs';

const app = express();
app.set('view engine', "ejs");
app.use(express.static('public'));

app.get('/admin', (req, res)=>{
    res.render('admin');
});

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}/admin`);
});