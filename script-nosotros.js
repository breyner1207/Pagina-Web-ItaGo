// ==================================================
// 💬 CHATBOT LOCAL ITAGO - SECCIÓN NOSOTROS
// ==================================================

// --- ELEMENTOS DEL DOM ---
const mascota = document.getElementById("mascota");
const chatbot = document.getElementById("chatbot");
const chatOutput = document.getElementById("chatOutput");
const userInput = document.getElementById("userInput");
const mensaje = document.getElementById("mensajeContacto");

let abierto = false;

// ===============================
// 🧭 DICCIONARIO DE RESPUESTAS — NOSOTROS
// ===============================
const respuestas = {
  "hola": {
    mensaje: "👋 ¡Hola! Soy ItagoBot, tu asistente de información y contacto. Estoy aquí para contarte más sobre Itago Turismo y cómo comunicarte con nosotros.",
    botones: ["Información", "Opiniones", "Contacto", "Soporte"]
  },

  // ====== INFORMACIÓN ======
  "información": {
    mensaje: "🌎 **Itago Turismo** es una iniciativa local de Itagüí dedicada a promover el turismo, la movilidad y las experiencias culturales de nuestra ciudad.",
    botones: ["Misión y visión", "Equipo", "Opiniones", "Regresar"]
  },

  "misión y visión": {
    mensaje: "🎯 **Misión:** Fomentar el turismo sostenible y la movilidad consciente en Itagüí.\n\n🚀 **Visión:** Ser el principal referente turístico local, conectando personas con lugares y experiencias únicas.",
    botones: ["Equipo", "Opiniones", "Regresar"]
  },

  "equipo": {
    mensaje: "👥 Nuestro equipo está conformado por profesionales apasionados por el diseño, la comunicación y la cultura local. Creemos en el turismo responsable y la conexión humana.",
    botones: ["Opiniones", "Contacto", "Regresar"]
  },

  // ====== OPINIONES ======
  "opiniones": {
    mensaje: "💬 ¡Queremos saber de ti! Puedes dejar tu comentario en la sección de **Opiniones y Comentarios** justo aquí en la página, o enviarnos tu experiencia directamente por correo o WhatsApp.",
    botones: ["Dejar opinión", "Contacto", "Regresar"]
  },

  "dejar opinión": {
    mensaje: "📝 Para dejar tu opinión, baja un poco hasta la sección de comentarios y comparte tu experiencia. ¡Tu voz es muy valiosa para nosotros!",
    botones: ["Contacto", "Regresar"]
  },

  // ====== CONTACTO ======
  "contacto": {
    mensaje: "📩 Puedes contactarnos a través de:\n\n- Email: contacto@itago.com\n- WhatsApp: +57 312 456 7890\n- Dirección: Calle 50 #45-30, Itagüí, Antioquia\n\n¡Te responderemos pronto!",
    botones: ["Opiniones", "Soporte", "Regresar"]
  },

  // ====== SOPORTE ======
  "soporte": {
    mensaje: "⚙️ Si tienes dudas sobre el sitio web, problemas técnicos o sugerencias, escríbenos. ¡Queremos mejorar contigo!",
    botones: ["Contacto", "Regresar"]
  },

  // ====== FRASES GENÉRICAS ======
  "gracias": {
    mensaje: "🙏 ¡Gracias a ti! Tu opinión nos ayuda a crecer y mejorar nuestros servicios.",
    botones: ["Información", "Opiniones", "Contacto"]
  },

  "regresar": {
    mensaje: "¿Qué deseas hacer ahora?",
    botones: ["Información", "Opiniones", "Contacto", "Soporte"]
  },

  "adiós": {
    mensaje: "👋 ¡Hasta pronto! Gracias por visitar Itago Turismo.",
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
    mensaje: "🤔 No entendí eso. Puedes preguntarme por **información**, **opiniones**, o **contacto**.",
    botones: ["Información", "Opiniones", "Contacto"]
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

// ==================================================
// 💬 SISTEMA DE COMENTARIOS INTERACTIVO (FUNCIONAL)
// ==================================================
const formComentario = document.getElementById("formComentario"); // <-- corregido
const listaComentarios = document.getElementById("listaComentarios"); // <-- corregido

// ✅ Cargar comentarios almacenados al iniciar
document.addEventListener("DOMContentLoaded", cargarComentarios);

function cargarComentarios() {
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  listaComentarios.innerHTML = ""; // limpiar antes de cargar
  comentarios.forEach(mostrarComentario);
}

// ✅ Guardar nuevo comentario
function guardarComentario(comentario) {
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  comentarios.push(comentario);
  localStorage.setItem("comentarios", JSON.stringify(comentarios));
}

// ✅ Mostrar comentario en la lista
function mostrarComentario({ nombre, mensaje, fecha }) {
  const div = document.createElement("div");
  div.classList.add("comentario-item");
  div.innerHTML = `
    <h4>${nombre}</h4>
    <p>${mensaje}</p>
    <span>${fecha}</span>
  `;
  div.style.opacity = 0;
  listaComentarios.appendChild(div);
  setTimeout(() => (div.style.opacity = 1), 100);
}

// ✅ Enviar formulario de comentario
if (formComentario) {
  formComentario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !mensaje) {
      alert("Por favor completa todos los campos antes de enviar.");
      return;
    }

    const comentario = {
      nombre,
      mensaje,
      fecha: new Date().toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };

    guardarComentario(comentario);
    mostrarComentario(comentario);
    formComentario.reset();
  });
}
