const lengthForm = document.querySelector(".lengthForm");
const unitDigits = document.querySelector("#unitDigits");
const unitConvertFrom = document.querySelector("#unitConvertFrom");
const unitConvertTo = document.querySelector("#unitConvertTo");
const btnForm = document.querySelector("#endButton");

const resultBox = document.querySelector(".resultBox");
const resultText = document.querySelector("#resultText");
const btnResult = document.querySelector("#resetButton");

lengthForm.classList.remove("close");
resultBox.classList.add("close");

const lengthConverter = (unitDigits, firstUnit, secondUnit) => {
    return unitDigits;
}

lengthForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formDigits = unitDigits.value;
    const formUnit1 = unitConvertFrom.value;
    const formUnit2 = unitConvertTo.value;
    const resultDigits = lengthConverter(formDigits, formUnit1, formUnit2);


    lengthForm.classList.add("close");
    resultBox.classList.remove("close");

    document.body.style.backgroundColor = "blue"; 
    resultText.innerText = `${formDigits} ${formUnit1} = ${resultDigits} ${formUnit2}`;
});

btnResult.addEventListener('click', (event) => {
    location.reload();
});
