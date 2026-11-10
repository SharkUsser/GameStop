const boton = document.querySelector("#boton"); 
const mensaje = document.querySelector("#mensaje"); 

function mostrarAviso() {  
    mensaje.textContent = "Tu propuesta de intercambio está lista para ser publicada"; 
} 

boton.addEventListener("click", mostrarAviso);
