console.log("teste")
const lengthForm = document.querySelector(".lengthForm");
const btn = document.querySelector("#endButton");

btn.addEventListener('click', (event)=>{
    event.preventDefault();
    console.log("formulario recebido");
    document.body.style.backgroundColor = "red";
});