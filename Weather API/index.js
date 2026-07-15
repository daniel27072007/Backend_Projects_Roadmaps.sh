import express from 'express'
import { createClient } from 'redis';

const app = new express();
const redisClient = createClient({
    url: 'redis://default:bUWP2cUvevNEQv7TiFzJufiS4RqFoRAs@verdant-cast-rippling-22899.db.redis.io:17371'
});

redisClient.on('error', (error)=>{console.log(`error detected when lisining to the redisClient ${error}`)});
await redisClient.connect();
// console.log('connect the code with the redis cloud server with success');

app.get('/weather', async (req, res)=>{
    const city = req.query.city;
    const apiKey = 'c852fa6fca5f68a083663ae1feb685d7';
    const finalUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    try{
        const cacheData = await redisClient.get(city);
        if(cacheData !== null){
            console.log('cache hit');
            const cacheDataObject = JSON.parse(cacheData);
            return res.json(cacheDataObject);
        }
        console.log('cache miss');
        const validRead = await fetch(finalUrl);
        if (!validRead.ok){
            const apiError = await validRead.json()
            console.log(apiError)
            return res.status(validRead.status).json({
                error: "City not found or issue in the API"
            });
        }
        const fullData = await validRead.json();
        const filteredData = {
            "city": fullData.name,
            "lon": fullData.coord.lon,
            "lat": fullData.coord.lat,
            "temperature": fullData.main.temp,
            "humidity": fullData.main.humidity
        }
        const filteredDataString = JSON.stringify(filteredData)
        await redisClient.set(city, filteredDataString, { EX: 600});
        res.json(filteredData);
    }catch(error){
        console.error(error);
        res.status(500).json({ erro: "a error happend when seeing or formating the weather data" });
    }
});

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Server Running on http://localhost:${PORT}`)
    console.log('option to put for test http://localhost:3000/weather?city=Itu')
});