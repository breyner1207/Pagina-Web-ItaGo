// ==================================================
// 🤖 CHATBOT LOCAL ITAGO - SECCIÓN MOVILIDAD
// ==================================================

// --- ELEMENTOS DEL DOM ---
const mascota = document.getElementById("mascota");
const chatbot = document.getElementById("chatbot");
const chatOutput = document.getElementById("chatOutput");
const userInput = document.getElementById("userInput");
const mensaje = document.getElementById("mensajeContacto");

let abierto = false;

// ===============================
// 🚐 DICCIONARIO DE RESPUESTAS — TRANSPORTE
// ===============================
const respuestas = {
  "hola": {
    mensaje: "¡Hola! Soy ItagoBot 🚐 Tu asistente de movilidad en Itagüí. ¿En qué puedo ayudarte hoy?",
    botones: ["Información", "Transporte", "Soporte", "Contacto"]
  },

  // ====== SECCIÓN INFORMACIÓN ======
  "información": {
    mensaje: "Itago es tu guía de turismo y movilidad en Itagüí. Descubre cómo moverte fácil y seguro por la ciudad.",
    botones: ["Servicios", "Regresar"]
  },

  "servicios": {
    mensaje: "Puedes explorar nuestras principales secciones: Transporte, Rutas, Tarifas, Consejos y Conexiones con el Metro.",
    botones: ["Transporte", "Rutas", "Tarifas", "Consejos", "Regresar"]
  },

  // ====== SECCIÓN TRANSPORTE ======
  "transporte": {
    mensaje: "En Itagüí puedes moverte usando diferentes medios de transporte 🚍. ¿Sobre qué deseas saber más?",
    botones: ["Medios de transporte", "Rutas", "Tarifas", "Consejos", "Regresar"]
  },

  "medios de transporte": {
    mensaje: "🚇 **Medios disponibles:**\n\n- Metro de Medellín: Estaciones Itagüí y Sabaneta.\n- Metroplús: Conecta varios sectores con el metro.\n- Buses urbanos: Operan entre barrios y hacia Medellín.\n- Encicla: Bicicletas públicas gratuitas en puntos clave.\n- Taxis: Servicio disponible 24/7.",
    botones: ["Rutas", "Tarifas", "Consejos", "Regresar"]
  },

  // ====== SECCIÓN RUTAS ======
  "rutas": {
    mensaje: "🚏 Las rutas más importantes comunican Santa María, Ditaires, San Gabriel, El Rosario y el Centro. También hay rutas integradas al Metro y Metroplús.",
    botones: ["Medios de transporte", "Tarifas", "Consejos", "Regresar"]
  },

  // ====== SECCIÓN TARIFAS ======
  "tarifas": {
    mensaje: "💳 **Tarifas promedio:**\n\n- Metro / Metroplús: $3.280\n- Buses urbanos: $2.800 - $3.000\n- Taxi (mínima): $6.000\n\nUsa la tarjeta **Cívica** para acceder fácilmente a los medios integrados.",
    botones: ["Rutas", "Medios de transporte", "Consejos", "Regresar"]
  },

  // ====== SECCIÓN CONSEJOS ======
  "consejos": {
    mensaje: "✅ Consejos de movilidad segura:\n\n- Usa siempre paraderos autorizados.\n- Respeta las señales de tránsito.\n- Evita viajar sin saldo en tu Cívica.\n- En bicicleta, usa casco y reflectivos.\n\n¡Muévete seguro y responsable! 🚴‍♂️",
    botones: ["Rutas", "Tarifas", "Regresar"]
  },

  // ====== SECCIÓN SOPORTE ======
  "soporte": {
    mensaje: "¿Tienes dudas sobre el funcionamiento del sitio o el bot? Estoy aquí para ayudarte 💡",
    botones: ["Contacto", "Regresar"]
  },

  // ====== SECCIÓN CONTACTO ======
  "contacto": {
    mensaje: "📩 Escríbenos a **Turismo@itago.com** o al WhatsApp **+57 304 552 3816**. ¡Te responderemos pronto!",
    botones: ["Regresar"]
  },

  // ====== FRASES GENÉRICAS ======
  "gracias": {
    mensaje: "¡Con gusto! 🚐 Que tengas un excelente viaje por Itagüí.",
    botones: ["Información", "Transporte", "Soporte", "Contacto"]
  },

  "regresar": {
    mensaje: "¿Qué deseas hacer ahora?",
    botones: ["Información", "Transporte", "Soporte", "Contacto"]
  },

  "adiós": {
    mensaje: "👋 ¡Hasta luego! Gracias por usar ItagoBot.",
    botones: []
  }
};

// ==================================================
// ⚙️ FUNCIONALIDAD PRINCIPAL
// ==================================================

// Mostrar mensaje de saludo al cargar
window.addEventListener("load", () => {
  abierto = true;
  chatbot.style.display = "none";
  mostrarRespuestaBot(obtenerRespuestaLocal("hola"));
});

// Mostrar mensaje flotante al pasar el mouse
mascota.addEventListener("mouseenter", () => mensaje.classList.add("show"));
mascota.addEventListener("mouseleave", () => mensaje.classList.remove("show"));

// Abrir o cerrar el chat al hacer clic en la mascota
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

// ==================================================
// 🔧 FUNCIONES DEL CHATBOT
// ==================================================
function agregarMensaje(remitente, texto) {
  const div = document.createElement("div");
  div.innerHTML = `<strong class="remitente">${remitente}:</strong> <span class="mensaje">${texto}</span>`;
  chatOutput.appendChild(div);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function obtenerRespuestaLocal(texto) {
  const key = texto.toLowerCase();
  return respuestas[key] || {
    mensaje: "No entendí eso 🚏. Puedes preguntar por rutas, medios de transporte o tarifas.",
    botones: ["Rutas", "Medios de transporte", "Tarifas", "Contacto"]
  };
}

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
