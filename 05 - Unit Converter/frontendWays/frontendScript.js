const lengthForm = document.querySelector(".lengthForm");
const weightForm = document.querySelector(".weightForm");
const temperatureForm = document.querySelector(".temperatureForm");
const unitDigits = document.querySelector("#unitDigits");
const unitConvertFrom = document.querySelector("#unitConvertFrom");
const unitConvertTo = document.querySelector("#unitConvertTo");
const btnForm = document.querySelector("#endButton");
const resultBox = document.querySelector(".resultBox");
const resultText = document.querySelector("#resultText");
const btnResult = document.querySelector("#resetButton");

if(resultBox){
    resultBox.classList.add("close");
}

const formatarResultado = (valor) => {
    // Se o valor for muito pequeno (ex: 0.000469), usa algarismos reais importantes
    if (valor > 0 && valor < 0.01) {
        let stringPrecision = valor.toPrecision(2);
        // Se o toPrecision gerou notação científica (ex: 4.7e-4), converte para decimal por extenso
        if (stringPrecision.includes('e')) {
            return Number(stringPrecision).toFixed(Math.abs(Math.log10(valor)) + 1);
        }
        return stringPrecision;
    }
    // Para números normais ou grandes (ex: 296.15), mostra sempre 2 casas decimais normais
    return valor.toFixed(2);
};

const lengthConverter = (unitDigits, firstUnit, secondUnit) => {
    const unitToMeters = {
        "mm": 0.001, "cm": 0.01, "m": 1, "km": 1000,
        "in": 0.0254, "ft": 0.3048, "yd": 0.9144, "mi": 1609.344
    }
    const valorFinal = unitDigits * (unitToMeters[firstUnit] / unitToMeters[secondUnit]);
    return formatarResultado(valorFinal);
}

const weightConverter = (unitDigits, firstUnit, secondUnit) => {
    const unitToGrams = {
        "mg": 0.001, "g": 1, "kg": 1000, "oz": 28.35, "lb": 453.59
    }
    const valorFinal = unitDigits * (unitToGrams[firstUnit] / unitToGrams[secondUnit]);
    return formatarResultado(valorFinal);
}

const temperatureConverter = (unitDigits, firstUnit, secondUnit) => {
    let numDigits = Number(unitDigits); 
    let resultDigits = numDigits;

    if(firstUnit === "°C" && secondUnit === "°F"){
       resultDigits = (numDigits * 9/5) + 32;
    }
    if(firstUnit === "°C" && secondUnit === "°K"){
        resultDigits = (numDigits + 273.15);
    }
    if(firstUnit === "°F" && secondUnit === "°K"){
        resultDigits = (numDigits - 32) * 5/9 + 273.15;
    }
    if(firstUnit === "°F" && secondUnit === "°C"){
        resultDigits = (numDigits - 32) * 5/9;
    }
    return formatarResultado(resultDigits);
}

if(lengthForm){
    lengthForm.addEventListener('submit', (event) => {
    lengthForm.classList.remove("close");
    event.preventDefault();

    const formDigits = unitDigits.value;
    const formUnit1 = unitConvertFrom.value;
    const formUnit2 = unitConvertTo.value;
    const resultDigits = lengthConverter(formDigits, formUnit1, formUnit2);

    if (!formDigits || !formUnit1 || !formUnit2){
        return;
    }
    else{
        lengthForm.classList.add("close");
        resultBox.classList.remove("close");
        resultText.innerText = `${formDigits} ${formUnit1} = ${resultDigits} ${formUnit2}`;
    }
    });
}

if(weightForm){
    weightForm.addEventListener('submit', (event) => {
    weightForm.classList.remove("close");
    event.preventDefault();

    const formDigits = unitDigits.value;
    const formUnit1 = unitConvertFrom.value;
    const formUnit2 = unitConvertTo.value;
    const resultDigits = weightConverter(formDigits, formUnit1, formUnit2);
    
    if (!formDigits || !formUnit1 || !formUnit2){
        return;
    }
    else{
        weightForm.classList.add("close");
        resultBox.classList.remove("close");
        resultText.innerText = `${formDigits} ${formUnit1} = ${resultDigits} ${formUnit2}`;
    }
    });
}

if(temperatureForm){
    temperatureForm.addEventListener('submit', (event) => {
    temperatureForm.classList.remove("close");
    event.preventDefault();

    const formDigits = unitDigits.value;
    const formUnit1 = unitConvertFrom.value;
    const formUnit2 = unitConvertTo.value;
    const resultDigits = temperatureConverter(formDigits, formUnit1, formUnit2);
    
    if (!formDigits || !formUnit1 || !formUnit2){
        return;
    }
    else{
        temperatureForm.classList.add("close");
        resultBox.classList.remove("close");
        resultText.innerText = `${formDigits} ${formUnit1} = ${resultDigits} ${formUnit2}`;
    }
    });
}

btnResult.addEventListener('click', (event) => {
    location.reload();
});