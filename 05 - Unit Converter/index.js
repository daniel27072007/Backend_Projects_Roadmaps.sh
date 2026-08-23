import express from 'express'
import ejs from 'ejs'

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

const resultFormat = (value)=>{
    if(value > 0 && value < 0.01){
        let valuePrecisonString = value.toPrecision(2);
        if(valuePrecisonString.includes('e')){
            return Number(valuePrecisonString).toFixed(Math.abs(Math.log10(value)) + 1);
        }
        return Number(valuePrecisonString)
    }
    return Number(value.toFixed(2));
};
const lengthConverter = (unitDigits, unitConvertFrom, unitConvertTo)=>{
    const unitToMeters = {
        "mm": 0.001, "cm": 0.01, "m": 1, "km": 1000,
        "in": 0.0254, "ft": 0.3048, "yd": 0.9144, "mi": 1609.344
    }
    const finalValue = unitDigits*(unitToMeters[unitConvertFrom]/unitToMeters[unitConvertTo])
    return resultFormat(finalValue)
};
const weightConverter = (unitDigits, unitConvertFrom, unitConvertTo)=>{
    const unitToGrams = {
        "mg": 0.001, "g": 1, "kg": 1000, "oz": 28.35, "lb": 453.59
    }
    const finalValue = unitDigits*(unitToGrams[unitConvertFrom]/unitToGrams[unitConvertTo]);
    return resultFormat(finalValue);
};
const temperatureConverter = (unitDigits, unitConvertFrom, unitConvertTo)=>{
    let finalvalue = unitDigits
    if(unitConvertFrom === "°C" && unitConvertTo === "°F"){
       finalvalue = (unitDigits * 9/5) + 32;
    }
    if(unitConvertFrom === "°C" && unitConvertTo === "°K"){
        finalvalue = (unitDigits + 273.15);
    }
    if(unitConvertFrom === "°F" && unitConvertTo === "°K"){
        finalvalue = (unitDigits - 32) * 5/9 + 273.15;
    }
    if(unitConvertFrom === "°F" && unitConvertTo === "°C"){
        finalvalue = (unitDigits - 32) * 5/9;
    }
    return resultFormat(finalvalue);
};

app.get('/length', (req, res)=>{
    res.render('length', {result: null})
})

app.get('/weight', (req, res)=>{
    res.render('weight', {result: null})
})

app.get('/temperature', (req, res)=>{
    res.render('temperature', {result: null})
})

app.get('/convert-length', (req, res)=>{
    const { unitDigits, unitConvertFrom, unitConvertTo } = req.query
    const unitDigitsNumber = Number(unitDigits);
    if(!unitDigits || !unitConvertFrom || !unitConvertTo){
        return res.render('length', { result: null});
    }
    const resultDigits = lengthConverter(unitDigitsNumber, unitConvertFrom, unitConvertTo);
    res.render('length', {result: {unitDigits: unitDigitsNumber, unitConvertFrom: unitConvertFrom, unitConvertTo: unitConvertTo, resultDigits: resultDigits}})
});

app.get('/convert-weight', (req, res)=>{
    const { unitDigits, unitConvertFrom, unitConvertTo} = req.query
    const unitDigitsNumber = Number(unitDigits)
    if(!unitDigits || !unitConvertFrom || !unitConvertTo){
        return res.render('weight', { result: null});
    }
    const resultDigits = weightConverter(unitDigitsNumber, unitConvertFrom, unitConvertTo);
    res.render('weight', {result: {unitDigits: unitDigitsNumber, unitConvertFrom: unitConvertFrom, unitConvertTo: unitConvertTo, resultDigits: resultDigits}})
});

app.get('/convert-temperature', (req, res)=>{
    const {unitDigits, unitConvertFrom, unitConvertTo} = req.query
    const unitDigitsNumber = Number(unitDigits)
    if(!unitDigits || !unitConvertFrom || !unitConvertTo){
        return res.render('temperature', { result: null});
    }
    const resultDigits = temperatureConverter(unitDigitsNumber, unitConvertFrom, unitConvertTo)
    res.render('temperature', {result: {unitDigits: unitDigitsNumber, unitConvertFrom: unitConvertFrom, unitConvertTo: unitConvertTo, resultDigits: resultDigits}})
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/length`);
});