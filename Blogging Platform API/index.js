import express from 'express'
import { rateLimit } from 'express-rate-limit'

const app = new express();
const limiter = rateLimit({
    windowMs: 1000,
    limit: 2,
    message: {error: 'You reach the limit of request. You can only do 2 per second'}
});

app.use(express.json());
app.use(limiter);

app.post('/post', async (req, res)=>{
    console.log('post rechead');
    const postData = req.body
    console.log('postData recived!');
    res.json(postData);
});

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Server runnig on: http://localhost:${PORT}`)
});