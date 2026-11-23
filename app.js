const formulario = document.querySelector("#formulario");
const mensaje = document.querySelector("#mensaje");

const lista = document.querySelector("#lista-propuestas");
const contadorTotal = document.querySelector("#contador-total");

const buscar = document.querySelector("#buscar");
const contadorVisibles = document.querySelector("#contador-visibles");

const CLAVE = "gamestop-propuestas-v1";

const texto = localStorage.getItem(CLAVE);

let propuestas = [];

try {
    propuestas = texto === null ? [] : JSON.parse(texto);
} catch (error) {
    propuestas = [];
}

if (!Array.isArray(propuestas)) {
    propuestas = [];
}

let siguienteId = propuestas.reduce(
    (maximo, propuesta) => Math.max(maximo, propuesta.id), 0
) + 1;

function guardarPropuestas() {
    localStorage.setItem(
        CLAVE,
        JSON.stringify(propuestas)
    );
}

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

    const consulta = buscar.value.trim().toLocaleLowerCase("es");

    const visibles = propuestas.filter(propuesta =>
        propuesta.nombre.toLocaleLowerCase("es").includes(consulta) ||
        propuesta.descripcion.toLocaleLowerCase("es").includes(consulta)
    );

    contadorVisibles.textContent =
    `Resultados visibles: ${visibles.length}`;

    if (visibles.length === 0) {
        const vacio = document.createElement("p");

        vacio.textContent = propuestas.length === 0
            ? "Aún no hay propuestas registradas."
            : "No hay propuestas que coincidan con la búsqueda.";

        lista.append(vacio);
        return;
    }

    visibles.forEach(propuesta => {
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
        const acciones = document.createElement("div");
        acciones.className = "acciones-propuesta";
        const etiquetaEstado = document.createElement("span");
        etiquetaEstado.className = "etiqueta-estado";
        etiquetaEstado.textContent = propuesta.estadoSolicitud;

        if (propuesta.estadoSolicitud === "Completada") {
            etiquetaEstado.classList.add("completada");
        }
        const botonEstado = document.createElement("button");
        botonEstado.type = "button";
        botonEstado.textContent = propuesta.estadoSolicitud === "Pendiente"
            ? "Marcar como completada" : "Marcar como pendiente";
        botonEstado.addEventListener("click", () => cambiarEstado(propuesta.id));
        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "boton-eliminar";
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => eliminarPropuesta(propuesta.id));
        acciones.append(etiquetaEstado, botonEstado, botonEliminar);
        tarjeta.append(acciones);

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

    const propuesta = {
        id: siguienteId++,
        nombre: document.querySelector("#nombre").value.trim(),
        tipo: document.querySelector("#tipo").value,
        estadoVideojuego: document.querySelector("#estado").value,
        descripcion: document.querySelector("#descripcion").value.trim(),
        correo: document.querySelector("#email").value.trim(),
        estadoSolicitud: "Pendiente"
    };

    propuestas.push(propuesta);

    guardarPropuestas();

    formulario.reset();

    mostrarPropuestas();

    mensaje.className = "exito";
    mensaje.textContent =
        "Tu propuesta de intercambio se registró correctamente.";
}


function cambiarEstado(id) {
    const propuesta = propuestas.find(item => item.id === id);

    if (!propuesta) return;

    propuesta.estadoSolicitud = propuesta.estadoSolicitud === "Pendiente"
        ? "Completada" : "Pendiente";

    guardarPropuestas();

    mostrarPropuestas();
}

function eliminarPropuesta(id) {
    const propuesta = propuestas.find(item => item.id === id);

    if (!propuesta) return;

    if (!confirm(`¿Eliminar la propuesta #${id}?`)) return;

    propuestas = propuestas.filter(item => item.id !== id);

    guardarPropuestas();

    mostrarPropuestas();
}


function limpiarMensaje() {
    mensaje.textContent = "";
    mensaje.className = "";
}

formulario.addEventListener("submit", mostrarAviso);
formulario.addEventListener("input", limpiarMensaje);
formulario.addEventListener("change", limpiarMensaje);
buscar.addEventListener("input", mostrarPropuestas);
mostrarPropuestas();