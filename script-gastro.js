// ===============================
// 🤖 CHATBOT LOCAL ITAGO (Versión Gastronomía)
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
    mensaje: "¡Hola! Soy ItagoBot 🤖 ¿Tienes hambre? 🍴 Estoy aquí para guiarte por la gastronomía de Itagüí.",
    botones: ["Información", "Gastronomía", "Soporte", "Contacto"]
  },

  // ====== INFORMACIÓN ======
  "información": {
    mensaje: "Itago te conecta con lo mejor de Itagüí: arte, cultura, gastronomía y turismo local.",
    botones: ["Gastronomía", "Soporte", "Contacto", "Regresar"]
  },

  // ====== GASTRONOMÍA ======
  "gastronomía": {
    mensaje: "La gastronomía itagüiseña mezcla tradición antioqueña con sabores modernos. ¿Qué deseas conocer?",
    botones: ["Comidas típicas", "Postres locales", "Bebidas artesanales", "Restaurantes", "Zonas gastronómicas", "Regresar"]
  },

  "comidas típicas": {
    mensaje: "Los platos típicos de Itagüí incluyen:\n🥘 Bandeja paisa\n🍖 Chicharrón con arepa\n🥩 Fríjoles antioqueños\n🍌 Patacones con hogao",
    botones: ["Restaurantes", "Zonas gastronómicas", "Regresar"]
  },

  "postres locales": {
    mensaje: "Los postres más tradicionales son:\n🍮 Natilla antioqueña\n🍬 Dulce de guayaba\n🍰 Brevas con arequipe",
    botones: ["Bebidas artesanales", "Comidas típicas", "Regresar"]
  },

  "bebidas artesanales": {
    mensaje: "Itagüí también se destaca por:\n☕ Café artesanal local\n🍻 Cervezas de microcervecerías\n🍹 Jugos naturales tropicales",
    botones: ["Restaurantes", "Comidas típicas", "Regresar"]
  },

  "restaurantes": {
    mensaje: "Algunos restaurantes recomendados son:\n🍴 La Parrillita de la 85\n🍕 Pizza al Parque\n🍔 Itago Burgers\n🍣 Sushi Express Itagüí",
    botones: ["Zonas gastronómicas", "Comidas típicas", "Regresar"]
  },

  "zonas gastronómicas": {
    mensaje: "Las principales zonas para comer son:\n📍 Parque Principal\n📍 Zona de la 85\n📍 Sector Ditaires\n📍 CC Viva Envigado (a pocos minutos)",
    botones: ["Restaurantes", "Gastronomía", "Regresar"]
  },

  // ====== SOPORTE Y CONTACTO ======
  "soporte": {
    mensaje: "¿Tuviste algún problema o deseas hacer una sugerencia? Estoy para ayudarte.",
    botones: ["Contacto", "Regresar"]
  },

  "contacto": {
    mensaje: "📩 Escríbenos a Turismo@itago.com o al WhatsApp +57 304 552 3816.",
    botones: ["Regresar"]
  },

  // ====== FRASES GENÉRICAS ======
  "gracias": {
    mensaje: "¡De nada! Espero que disfrutes la gastronomía de Itagüí 🍽️.",
    botones: ["Información", "Gastronomía", "Soporte", "Contacto"]
  },

  "regresar": {
    mensaje: "¿Qué deseas hacer ahora?",
    botones: ["Información", "Gastronomía", "Soporte", "Contacto"]
  },

  "adiós": {
    mensaje: "¡Hasta luego! Que disfrutes los sabores de Itagüí 😋.",
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
function agregarMensaje(remitente, texto) {
  const div = document.createElement("div");
  div.innerHTML = `<strong class="remitente">${remitente}:</strong> <span class="mensaje">${texto}</span>`;
  chatOutput.appendChild(div);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function obtenerRespuestaLocal(texto) {
  const key = texto.toLowerCase();
  return respuestas[key] || {
    mensaje: "Lo siento, no entendí tu mensaje.",
    botones: ["Información", "Gastronomía", "Soporte", "Contacto"]
  };
}

function mostrarRespuestaBot(respuesta) {
  agregarMensaje("ItagoBot", respuesta.mensaje);

  const botonesExistentes = chatOutput.querySelectorAll(".boton-opcion");
  botonesExistentes.forEach(b => b.remove());

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

// ===== Carrusel de experiencias =====
const track = document.getElementById("carruselTrack");
const slides = Array.from(track.children);
const prevButton = document.querySelector(".btn-carrusel.prev");
const nextButton = document.querySelector(".btn-carrusel.next");
const indicadoresContainer = document.getElementById("indicadores");

let currentIndex = 0;

// Crear indicadores
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  indicadoresContainer.appendChild(dot);
});
const dots = Array.from(indicadoresContainer.children);

function actualizarCarrusel(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  actualizarCarrusel(currentIndex);
});

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  actualizarCarrusel(currentIndex);
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = i;
    actualizarCarrusel(currentIndex);
  });
});

// Movimiento automático cada 6 segundos
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  actualizarCarrusel(currentIndex);
}, 6000);
