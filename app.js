const formulario = document.querySelector("#formulario");
const mensaje = document.querySelector("#mensaje");

const lista = document.querySelector("#lista-propuestas");
const contadorTotal = document.querySelector("#contador-total");

let propuestas = [];
let siguienteId = 1;

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

function validarEstado() {
    const estado = document.querySelector("#estado").value;
    const estados = ["Nuevo", "Como Nuevo", "Buen Estado", "Con Desgaste"];

    if (!estado) {
        return "Error: Seleccione el estado del videojuego.";
    }
    if (!estados.includes(estado)) {
        return "Error: Seleccione un estado válido.";
    }
    return "";
}

function validarEmail() {
    const correo = document.querySelector("#email").value.trim();
    const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correo) {
        return "Error: Ingrese su correo electrónico.";
    }
    if (correo.length > 254 || !formato.test(correo)) {
        return "Error: Ingrese un correo electrónico válido.";
    }
    return "";
}

function mostrarPropuestas() {
    lista.replaceChildren();

    contadorTotal.textContent =
        `Total de propuestas: ${propuestas.length}`;

    propuestas.forEach(propuesta => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-propuesta";

        const titulo = document.createElement("h3");
        titulo.textContent =
            `${propuesta.nombre} (#${propuesta.id})`;

        tarjeta.append(titulo);

        const datos = [
            ["Género", propuesta.tipo],
            ["Estado del videojuego", propuesta.estadoVideojuego],
            ["Descripción", propuesta.descripcion],
            ["Correo", propuesta.correo],
            ["Estado de propuesta", propuesta.estadoSolicitud]
        ];

        datos.forEach(([etiqueta, valor]) => {
            const parrafo = document.createElement("p");
            const negrita = document.createElement("strong");

            negrita.textContent = `${etiqueta}: `;

            parrafo.append(
                negrita,
                document.createTextNode(valor)
            );

            tarjeta.append(parrafo);
        });

        lista.append(tarjeta);
    });
}

function mostrarAviso(evento) {
    evento.preventDefault();

    const validaciones = [
        validarNombre,
        validarTipo,
        validarEstado,
        validarDescripcion,
        validarEmail
    ];

    for (const validar of validaciones) {
        const error = validar();

        if (error) {
            mensaje.className = "error";
            mensaje.textContent = error;
            return;
        }
    }

    mensaje.className = "exito";
    mensaje.textContent =
        "Tu propuesta de intercambio está lista para ser publicada";
}

function limpiarMensaje() {
    mensaje.textContent = "";
    mensaje.className = "";
}

formulario.addEventListener("submit", mostrarAviso);
formulario.addEventListener("input", limpiarMensaje);
formulario.addEventListener("change", limpiarMensaje);
