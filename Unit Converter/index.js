import express from 'express'
import ejs from 'ejs'

const app = express();

app.get('/convert-length', (req, res)=>{
    const { unitDigits, unitConvertFrom, unitConverTo } = req.query
    console.log(`Dados Recebidos: ${unitDigits} ${unitConvertFrom} ${unitConverTo}`);
    res.send(`O servidor recebeu ${unitDigits}`);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});