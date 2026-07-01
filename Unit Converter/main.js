// import http from 'http';
// import fs from 'fs'; 
const lengthForm = document.querySelector(`.lengthForm`);
const endButton = document.querySelector(`#endButton`);

const paramters = new URLSearchParams(window.location.search);
const unitDigits = Number(paramters.get('unitDigits'));
const unitConvertFrom = paramters.get('unitConvertFrom');
const unitConvertTo = paramters.get('unitConvertTo');
let result = unitDigits; 

endButton.onclick = ()=>{
    event.preventDefault();
    lengthForm.classList.add("close");
};

const lengthConverter = (unitDigits, unitConvertFrom, unitConvertTo)=>{
    if(!unitDigits || !unitConvertFrom || !unitConvertTo){
        return;   
    }

    if(unitConvertFrom === "Centimetros" && unitConvertTo === "Metros"){
        result = unitDigits / 100;
    }
    else if(unitConvertFrom === "Metros" && unitConvertTo === "Centimetros"){
        result = unitDigits * 100;
    }

    console.log(`Result of your calculation`)
    console.log(`${unitDigits} ${unitConvertFrom} => ${result} ${unitConvertTo}`)
};

lengthConverter(unitDigits, unitConvertFrom, unitConvertTo);