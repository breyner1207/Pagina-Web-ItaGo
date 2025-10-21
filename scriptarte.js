// ===============================
// 🧠 CHATBOT LOCAL ITAGO (Versión Arte)
// ===============================

// --- Elementos del DOM ---
const mascota = document.getElementById("mascota");
const chatbot = document.getElementById("chatbot");
const chatOutput = document.getElementById("chatOutput");
const userInput = document.getElementById("userInput");
const mensaje = document.getElementById("mensajeContacto");

let abierto = false;

// ===============================
// 📚 DICCIONARIO DE RESPUESTAS
// ===============================
const respuestas = {
  "hola": {
    mensaje: "¡Hola! Soy ItagoBot 🤖 ¿En qué puedo ayudarte hoy?",
    botones: ["Información", "Arte y Cultura", "Soporte", "Contacto"]
  },

  "información": {
    mensaje: "Itago es tu guía de turismo para descubrir lugares, experiencias y servicios en Itagüí.",
    botones: ["Servicios", "Regresar"]
  },

  "servicios": {
    mensaje: "Puedes explorar nuestras principales secciones: Arte, Transporte, Hospedaje, Gastronomía, Lugares y Eventos.",
    botones: ["Arte y Cultura", "Transporte", "Hospedaje", "Gastronomía", "Lugares", "Eventos", "Regresar"]
  },

  // ====== SECCIÓN: ARTE Y CULTURA ======
  "arte y cultura": {
    mensaje: "Itagüí vibra con arte y cultura 🎨. ¿Qué te gustaría explorar?",
    botones: ["Murales", "Galerías", "Artistas locales", "Eventos culturales", "Regresar"]
  },

  "murales": {
    mensaje: "Los murales de Itagüí reflejan identidad y color. Puedes encontrarlos en zonas como San Pío y el Parque Obrero.",
    botones: ["Galerías", "Eventos culturales", "Regresar"]
  },

  "galerías": {
    mensaje: "Algunas galerías recomendadas son: Casa de la Cultura, Centro de Arte Itagüí y exposiciones itinerantes en espacios públicos.",
    botones: ["Artistas locales", "Eventos culturales", "Regresar"]
  },

  "artistas locales": {
    mensaje: "En Itagüí destacan artistas visuales, muralistas y músicos que dan vida a la ciudad. ¿Quieres conocer algunos?",
    botones: ["Sí, muéstrame ejemplos", "Eventos culturales", "Regresar"]
  },

  "sí, muéstrame ejemplos": {
    mensaje: "🎭 Algunos artistas locales son: Carlos Roldán (muralismo), Ana Gutiérrez (pintura urbana) y Colectivo ArteVivo (arte comunitario).",
    botones: ["Galerías", "Regresar"]
  },

  "eventos culturales": {
    mensaje: "Cada año se celebra el Festival *Itagüí Vive el Arte*, junto a ferias de artesanía, danza y música. ¡Una gran experiencia cultural!",
    botones: ["Murales", "Galerías", "Regresar"]
  },

  // ====== OTRAS SECCIONES ======
  "arte": {
    mensaje: "Explora la oferta cultural y artística de Itagüí con nuestra sección de Arte.",
    botones: ["Servicios", "Regresar"]
  },

  "transporte": {
    mensaje: "Encuentra información sobre movilidad y transporte en la ciudad.",
    botones: ["Servicios", "Regresar"]
  },

  "hospedaje": {
    mensaje: "Descubre opciones de alojamiento para tu estadía en Itagüí.",
    botones: ["Servicios", "Regresar"]
  },

  "gastronomía": {
    mensaje: "Conoce la gastronomía local y los mejores lugares para comer.",
    botones: ["Servicios", "Regresar"]
  },

  "lugares": {
    mensaje: "Descubre los sitios turísticos y lugares emblemáticos de Itagüí.",
    botones: ["Servicios", "Regresar"]
  },

  "eventos": {
    mensaje: "Infórmate sobre eventos culturales, recreativos y festivales.",
    botones: ["Servicios", "Regresar"]
  },

  // ====== SOPORTE Y CONTACTO ======
  "soporte": {
    mensaje: "Si necesitas ayuda, puedes contactarnos mediante nuestro WhatsApp o correo electrónico.",
    botones: ["Contacto", "Regresar"]
  },

  "contacto": {
    mensaje: "📩 Escríbenos a Turismo@itago.com o al +57 304 552 3816.",
    botones: ["Regresar"]
  },

  // ====== FRASES GENÉRICAS ======
  "gracias": {
    mensaje: "¡De nada! Estoy aquí para ayudarte.",
    botones: ["Información", "Arte y Cultura", "Soporte", "Contacto"]
  },

  "regresar": {
    mensaje: "¿Qué deseas hacer ahora?",
    botones: ["Información", "Arte y Cultura", "Soporte", "Contacto"]
  },

  "adiós": {
    mensaje: "¡Hasta luego! Que tengas un excelente día.",
    botones: []
  }
};

// ===============================
// ⚙️ FUNCIONALIDAD DEL CHATBOT
// ===============================

// Saludo automático al cargar
window.addEventListener("load", () => {
  abierto = true;
  chatbot.style.display = "flex";
  mostrarRespuestaBot(obtenerRespuestaLocal("hola"));
});

// Mostrar mensaje flotante al pasar el mouse
mascota.addEventListener("mouseenter", () => mensaje.classList.add("show"));
mascota.addEventListener("mouseleave", () => mensaje.classList.remove("show"));

// Abrir / cerrar chat al hacer clic
mascota.addEventListener("click", () => {
  abierto = !abierto;
  chatbot.style.display = abierto ? "flex" : "none";
});

// Enviar mensaje con Enter
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const texto = userInput.value.trim();
    if (texto === "") return;
    agregarMensaje("Tú", texto);
    userInput.value = "";
    mostrarRespuestaBot(obtenerRespuestaLocal(texto));
  }
});

// ===============================
// 🧩 FUNCIONES
// ===============================

// Agrega mensajes al chat
function agregarMensaje(remitente, texto) {
  const div = document.createElement("div");
  div.innerHTML = `<strong class="remitente">${remitente}:</strong> <span class="mensaje">${texto}</span>`;
  chatOutput.appendChild(div);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Busca respuesta en el diccionario
function obtenerRespuestaLocal(texto) {
  const key = texto.toLowerCase();
  return respuestas[key] || {
    mensaje: "Lo siento, no entendí tu mensaje.",
    botones: ["Información", "Arte y Cultura", "Soporte", "Contacto"]
  };
}

// Muestra la respuesta del bot con sus botones
function mostrarRespuestaBot(respuesta) {
  agregarMensaje("ItagoBot", respuesta.mensaje);

  // Eliminar botones anteriores
  const botonesExistentes = chatOutput.querySelectorAll(".boton-opcion");
  botonesExistentes.forEach(b => b.remove());

  // Crear nuevos botones
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

// ===============================
// 🏁 FIN DEL CHATBOT LOCAL ITAGO
// ===============================
