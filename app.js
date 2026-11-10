const boton = document.querySelector("#boton"); 
const mensaje = document.querySelector("#mensaje"); 

function mostrarAviso() {  
    mensaje.textContent = "Tu propuesta de intercambio está lista para ser publicada"; 
} 

boton.addEventListener("click", mostrarAviso);

function validarTipo() {
    const tipo = document.querySelector("#tipo").value;
    const tipos = ["Acción", "Aventura", "Carreras", "Deportes", "Estrategia", "Plataformas", "Rol", "Simulación", "Terror"];

    if (!tipo) {
        return "Error: Seleccione un género de videojuego.";
    }
    if (!tipos.includes(tipo)) {
        return "Error: Seleccione un género válido.";
    }
    return "";
}
