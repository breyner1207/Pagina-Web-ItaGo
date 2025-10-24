// ==================================================
// 🤖 CHATBOT LOCAL ITAGO - SECCIÓN NOSOTROS (Versión funcional)
// ==================================================

// --- ELEMENTOS DEL DOM ---
const mascota = document.getElementById("mascota");
const chatbot = document.getElementById("chatbot");
const chatOutput = document.getElementById("chatOutput");
const userInput = document.getElementById("userInput");
const mensaje = document.getElementById("mensajeContacto");

let abierto = false;

// ===============================
// 💜 DICCIONARIO DE RESPUESTAS — NOSOTROS
// ===============================
const respuestas = {
  "hola": {
    mensaje: "👋 ¡Hola! Soy ItagoBot 🤖 Bienvenido a la sección *Nosotros*. Aquí conocerás quiénes somos, qué hacemos y cómo puedes dejar tu opinión.",
    botones: ["¿Quiénes somos?", "Nuestra misión", "Nuestro equipo", "Comentarios", "Contacto"]
  },
  "¿quiénes somos?": {
    mensaje: "🌍 *Itago Turismo* es un proyecto dedicado a promover las maravillas culturales, gastronómicas y turísticas de Itagüí. Nuestro objetivo es conectar a las personas con experiencias únicas en la ciudad.",
    botones: ["Nuestra misión", "Nuestro equipo", "Comentarios", "Regresar"]
  },
  "nuestra misión": {
    mensaje: "🎯 Nuestra misión es impulsar el turismo sostenible y local, promoviendo la identidad cultural de Itagüí y generando oportunidades para emprendedores y artistas locales.",
    botones: ["Nuestros valores", "Nuestro equipo", "Comentarios", "Regresar"]
  },
  "nuestros valores": {
    mensaje: "💫 Nuestros valores son:\n\n• Compromiso con la comunidad\n• Transparencia y respeto\n• Innovación en experiencias\n• Sostenibilidad ambiental",
    botones: ["Nuestra misión", "Nuestro equipo", "Comentarios", "Regresar"]
  },
  "nuestro equipo": {
    mensaje: "👥 Nuestro equipo está conformado por profesionales apasionados del turismo, el arte y la comunicación visual. Juntos trabajamos para mostrar lo mejor de Itagüí al mundo. 🌎",
    botones: ["¿Quiénes somos?", "Comentarios", "Contacto", "Regresar"]
  },
  "comentarios": {
    mensaje: "🗨️ ¡Nos encantaría saber tu opinión! Puedes dejar tu comentario al final de esta página. Tus aportes nos ayudan a mejorar cada día 💜",
    botones: ["Contacto", "Regresar"]
  },
  "contacto": {
    mensaje: "📩 Puedes escribirnos a **contacto@itago.com** o por WhatsApp al **+57 304 552 3816**. ¡Estaremos felices de atenderte!",
    botones: ["¿Quiénes somos?", "Comentarios", "Regresar"]
  },
  "gracias": {
    mensaje: "😊 ¡Con gusto! Gracias por visitar nuestra sección. Tu opinión hace crecer este proyecto.",
    botones: ["Comentarios", "Contacto", "Regresar"]
  },
  "regresar": {
    mensaje: "¿Sobre qué te gustaría saber?",
    botones: ["¿Quiénes somos?", "Nuestra misión", "Nuestro equipo", "Comentarios", "Contacto"]
  },
  "adiós": {
    mensaje: "👋 ¡Hasta pronto! Gracias por conocer más sobre nosotros. 💜",
    botones: []
  }
};

// ==================================================
// ⚙️ FUNCIONALIDAD PRINCIPAL DEL CHATBOT
// ==================================================
window.addEventListener("DOMContentLoaded", () => {
  chatbot.style.display = "none"; // inicia oculto

  // Mostrar tooltip al pasar el mouse
  mascota.addEventListener("mouseenter", () => {
    mensaje.style.opacity = 1;
    mensaje.style.transform = "translateY(0)";
  });

  mascota.addEventListener("mouseleave", () => {
    mensaje.style.opacity = 0;
    mensaje.style.transform = "translateY(10px)";
  });

  // ✅ Abrir o cerrar el chat al hacer clic en la mascota
  mascota.addEventListener("click", (e) => {
    e.stopPropagation();
    abierto = !abierto;

    if (abierto) {
      chatbot.classList.add("activo");
      chatbot.style.display = "flex";

      // Si es la primera vez que se abre, inicia el saludo
      if (chatOutput.childElementCount === 0) {
        mostrarRespuestaBot(obtenerRespuestaLocal("hola"));
      }
    } else {
      chatbot.classList.remove("activo");
      chatbot.style.display = "none";
    }
  });

  // ✅ Cerrar el chatbot si se hace clic fuera
  document.addEventListener("click", (e) => {
    if (abierto && !chatbot.contains(e.target) && !mascota.contains(e.target)) {
      abierto = false;
      chatbot.classList.remove("activo");
      chatbot.style.display = "none";
    }
  });

  // Enviar mensaje con Enter
  if (userInput) {
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const texto = userInput.value.trim();
        if (texto === "") return;
        agregarMensaje("Tú", texto);
        userInput.value = "";
        mostrarRespuestaBot(obtenerRespuestaLocal(texto));
      }
    });
  }

  // Cargar comentarios al iniciar
  cargarComentarios();
});

// ==================================================
// 🔧 FUNCIONES DEL CHATBOT
// ==================================================
function agregarMensaje(remitente, texto) {
  const div = document.createElement("div");
  div.classList.add(remitente === "Tú" ? "user" : "bot");
  div.innerHTML = texto;
  chatOutput.appendChild(div);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function obtenerRespuestaLocal(texto) {
  const key = texto.toLowerCase();
  return respuestas[key] || {
    mensaje: "No entendí eso 🚏. Puedes preguntar por nuestra misión, equipo o contacto.",
    botones: ["¿Quiénes somos?", "Nuestra misión", "Nuestro equipo", "Comentarios", "Contacto"]
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
