// ====== CHATBOT LOCAL ITAGO ======
const mascota = document.getElementById("mascota");
const chatbot = document.getElementById("chatbot");
const chatOutput = document.getElementById("chatOutput");
const userInput = document.getElementById("userInput");
const mensaje = document.getElementById("mensajeContacto");

let abierto = false;

// Diccionario de respuestas predefinidas
const respuestas = {
  "hola": { mensaje: "¡Hola! Soy ItagoBot 🤖 ¿En qué puedo ayudarte hoy?", botones: ["Información","Soporte","Contacto"] },
  "información": { mensaje: "Itago es tu guía de turismo para descubrir lugares, experiencias y servicios en Itagüí.", botones: ["Servicios","Regresar"] },
  "servicios": { mensaje: "Puedes explorar nuestras principales secciones: Arte, Transporte, Hospedaje, Gastronomía, Lugares y Eventos.", botones: ["Arte","Transporte","Hospedaje","Gastronomía","Lugares","Eventos","Regresar"] },
  "arte": { mensaje: "Explora la oferta cultural y artística de Itagüí con nuestra sección de Arte.", botones: ["Servicios","Regresar"] },
  "transporte": { mensaje: "Encuentra información sobre movilidad y transporte en la ciudad.", botones: ["Servicios","Regresar"] },
  "hospedaje": { mensaje: "Descubre opciones de alojamiento para tu estadía en Itagüí.", botones: ["Servicios","Regresar"] },
  "gastronomía": { mensaje: "Conoce la gastronomía local y los mejores lugares para comer.", botones: ["Servicios","Regresar"] },
  "lugares": { mensaje: "Descubre los sitios turísticos y lugares emblemáticos de Itagüí.", botones: ["Servicios","Regresar"] },
  "eventos": { mensaje: "Infórmate sobre eventos culturales, recreativos y festivales.", botones: ["Servicios","Regresar"] },
  "soporte": { mensaje: "Si necesitas ayuda, puedes contactarnos mediante nuestro whatsapp o correo electrónico.", botones: ["Contacto","Regresar"] },
  "contacto": { mensaje: "Escríbenos a Turismo@itago.com o al +573045523816.", botones: ["Regresar"] },
  "gracias": { mensaje: "¡De nada! Estoy aquí para ayudarte.", botones: ["Información","Soporte","Contacto"] },
  "regresar": { mensaje: "¿Qué deseas hacer ahora?", botones: ["Información","Soporte","Contacto"] },
  "adiós": { mensaje: "¡Hasta luego! Que tengas un excelente día.", botones: [] }
};

// ====== SALUDO AUTOMÁTICO AL INICIAR ======
window.addEventListener("load", () => {
  abierto = true;
  chatbot.style.display = "flex";
  mostrarRespuestaBot(obtenerRespuestaLocal("hola"));
});

// ====== MENSAJE FLOTANTE AL PASAR EL MOUSE ======
mascota.addEventListener("mouseenter", () => {
  mensaje.classList.add("show");
});
mascota.addEventListener("mouseleave", () => {
  mensaje.classList.remove("show");
});

// ====== ABRIR/CERRAR CHAT CON CLICK ======
mascota.addEventListener("click", () => {
  abierto = !abierto;
  chatbot.style.display = abierto ? "flex" : "none";
});

// ====== MANEJO DEL INPUT ======
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const texto = userInput.value.trim();
    if (texto === "") return;
    agregarMensaje("Tú", texto);
    userInput.value = "";
    mostrarRespuestaBot(obtenerRespuestaLocal(texto));
  }
});

// ====== FUNCIONES ======
function agregarMensaje(remitente, texto) {
  const div = document.createElement("div");
  div.innerHTML = `<strong class="remitente">${remitente}:</strong> <span class="mensaje">${texto}</span>`;
  chatOutput.appendChild(div);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function obtenerRespuestaLocal(texto) {
  const key = texto.toLowerCase();
  return respuestas[key] || { mensaje: "Lo siento, no entendí tu mensaje.", botones: ["Información","Soporte","Contacto"] };
}

function mostrarRespuestaBot(respuesta) {
  agregarMensaje("ItagoBot", respuesta.mensaje);

  // Limpiar botones previos
  const botonesExistentes = chatOutput.querySelectorAll(".boton-opcion");
  botonesExistentes.forEach(b => b.remove());

  // Crear botones si existen
  respuesta.botones.forEach(textoBoton => {
    const boton = document.createElement("button");
    boton.textContent = textoBoton;
    boton.classList.add("boton-opcion");
    boton.addEventListener("click", () => {
      agregarMensaje("Tú", textoBoton);
      mostrarRespuestaBot(obtenerRespuestaLocal(textoBoton));
    });
    chatOutput.appendChild(boton);
  });

  chatOutput.scrollTop = chatOutput.scrollHeight;
}
// ====== FIN CHATBOT LOCAL ITAGO ======
