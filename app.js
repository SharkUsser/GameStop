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

function validarDescripcion() {    
    const descripcion = document.querySelector("#descripcion").value.trim();     
    if (!descripcion) {        
        return "Error: Escriba una descripción.";    
    }    
    if (descripcion.length < 10 || descripcion.length > 500) {        
        return "Error: La descripción debe tener entre 10 y 500 caracteres.";    
    }    
    return ""; 
}

function validarNombre() {
    const nombre = document.querySelector("#nombre").value.trim();
 
    if (!nombre) {
        return "Error: Ingrese el nombre del videojuego.";
    }
    if (nombre.length < 3 || nombre.length > 80) {
        return "Error: El nombre debe tener entre 3 y 80 caracteres.";
    }
    return "";
}