// ==================================================
// 📅 CALENDARIO DE EVENTOS + CHATBOT LOCAL ITAGO - SECCIÓN EVENTOS
// ==================================================

// ===============================
// 🗓️ CALENDARIO DE EVENTOS
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const calendario = document.getElementById("calendar");
  const mesAnio = document.getElementById("monthYear");
  const prev = document.getElementById("prevMonth");
  const next = document.getElementById("nextMonth");

  const modal = document.getElementById("eventModal");
  const closeModal = document.getElementById("closeModal");
  const eventTitle = document.getElementById("eventTitle");
  const eventDescription = document.getElementById("eventDescription");

  // ==================================================
// 📅 EVENTOS ITAGO — AUTOMÁTICO POR AÑOS
// ==================================================

// ==================================================
// 📅 EVENTOS BASE ITAGO — COMPLETO Y VARIADO
// ==================================================
const eventosBase = [
  // === ENERO ===
  { mes: 1, dia: 6, titulo: "👑 Día de Reyes", descripcion: "Celebración tradicional con actividades familiares, presentaciones artísticas y dulces para los niños." },
  { mes: 1, dia: 20, titulo: "🎺 Festival de Verano Itagüí", descripcion: "Shows al aire libre, deportes acuáticos y conciertos para disfrutar del inicio del año." },

  // === FEBRERO ===
  { mes: 2, dia: 2, titulo: "🎭 Carnaval de la Alegría", descripcion: "Desfile colorido con comparsas, música y trajes típicos por las calles principales." },
  { mes: 2, dia: 14, titulo: "💖 Festival del Amor y la Amistad", descripcion: "Actividades artísticas, ferias y presentaciones en vivo para celebrar el amor en todas sus formas." },

  // === MARZO ===
  { mes: 3, dia: 8, titulo: "🌸 Día de la Mujer Itagüí", descripcion: "Conciertos, charlas y exposiciones en honor a las mujeres itagüiseñas." },
  { mes: 3, dia: 19, titulo: "👨‍👧 Día de San José", descripcion: "Eventos familiares y misas especiales en honor a los padres y trabajadores de la ciudad." },
  { mes: 3, dia: 30, titulo: "🪴 Feria Ambiental Itagüí Verde", descripcion: "Exposiciones ecológicas, talleres de reciclaje y jornadas de reforestación." },

  // === ABRIL ===
  { mes: 4, dia: 12, titulo: "🚴 Ruta Ecológica Itagüí en Bici", descripcion: "Un recorrido ambiental por las principales zonas verdes del municipio. ¡Pedalea por la sostenibilidad!" },
  { mes: 4, dia: 27, titulo: "📚 Semana del Libro y la Cultura", descripcion: "Lecturas públicas, ferias editoriales y cuentería para todas las edades." },

  // === MAYO ===
  { mes: 5, dia: 1, titulo: "👷‍♀️ Feria del Trabajo y Emprendimiento", descripcion: "Empresas locales ofrecen vacantes y asesorías para emprendedores y nuevos proyectos." },
  { mes: 5, dia: 12, titulo: "👩‍👧 Día de la Madre Itagüí", descripcion: "Conciertos, ferias y homenajes para todas las madres del municipio." },
  { mes: 5, dia: 25, titulo: "🐾 Jornada de Adopción Animal", descripcion: "Campaña de adopción responsable, vacunación gratuita y educación animal." },

  // === JUNIO ===
  { mes: 6, dia: 15, titulo: "🎨 Festival Itagüí Vive el Arte", descripcion: "Celebración del talento local con exposiciones, música y danza en toda la ciudad." },
  { mes: 6, dia: 24, titulo: "🔥 Fiesta de San Juan", descripcion: "Tradición cultural con bailes, fogatas y música típica andina." },

  // === JULIO ===
  { mes: 7, dia: 7, titulo: "⚽ Torneo Deportivo Itagüí Activa", descripcion: "Campeonatos interbarrios en fútbol, baloncesto y voleibol. ¡Participa y gana premios!" },
  { mes: 7, dia: 20, titulo: "🇨🇴 Fiesta de la Independencia", descripcion: "Desfile cultural, comparsas, música típica y gastronomía para conmemorar la independencia de Colombia." },

  // === AGOSTO ===
  { mes: 8, dia: 5, titulo: "🌺 Feria de las Flores Itagüí", descripcion: "Desfile de silleteros locales, conciertos y exposición floral inspirada en Medellín." },
  { mes: 8, dia: 10, titulo: "🍲 Feria Gastronómica", descripcion: "Degusta los mejores sabores tradicionales y fusiones gourmet de Itagüí." },
  { mes: 8, dia: 30, titulo: "🎤 Noche de Talentos Juveniles", descripcion: "Presentaciones de música, baile y arte por jóvenes artistas del municipio." },

  // === SEPTIEMBRE ===
  { mes: 9, dia: 10, titulo: "📸 ExpoTurismo y Fotografía", descripcion: "Muestra de destinos turísticos locales y exposición de fotografía cultural." },
  { mes: 9, dia: 15, titulo: "🎭 Semana Cultural de Itagüí", descripcion: "Teatro, cine, literatura y danza llenan los parques y plazas de arte durante una semana completa." },

  // === OCTUBRE ===
  { mes: 10, dia: 12, titulo: "🌎 Día de la Diversidad Cultural", descripcion: "Celebración de las raíces y tradiciones que enriquecen la identidad itagüiseña." },
  { mes: 10, dia: 31, titulo: "🎃 Noche de Halloween Familiar", descripcion: "Desfiles de disfraces, concursos, dulces y shows para toda la familia en el parque principal." },

  // === NOVIEMBRE ===
  { mes: 11, dia: 1, titulo: "🕯️ Día de Todos los Santos", descripcion: "Veladas y actividades religiosas en honor a las tradiciones del municipio." },
  { mes: 11, dia: 12, titulo: "🎶 Festival de Música Urbana", descripcion: "Conciertos gratuitos con artistas locales y emergentes. Ritmos urbanos, freestyle y talento joven." },
  { mes: 11, dia: 30, titulo: "🎨 ExpoArte Juvenil", descripcion: "Exposición de obras de jóvenes artistas, muralismo y fotografía local." },

  // === DICIEMBRE ===
  { mes: 12, dia: 1, titulo: "🎄 Festival de Luces y Navidad", descripcion: "Desfiles, luces y música que llenan de magia las calles de Itagüí." },
  { mes: 12, dia: 7, titulo: "🕯️ Noche de las Velitas", descripcion: "Encendido simbólico de luces, música navideña y actividades familiares en los parques." },
  { mes: 12, dia: 16, titulo: "🎶 Novenas de Aguinaldos", descripcion: "Cantos, villancicos y actividades comunitarias en los barrios de Itagüí." },
  { mes: 12, dia: 31, titulo: "🎆 Fiesta de Fin de Año", descripcion: "Cierre del año con shows pirotécnicos, música en vivo y actividades en el parque principal." }
];

// Generar automáticamente eventos para este año y los próximos
const eventos = {};
const añoActual = new Date().getFullYear();
const añosFuturos = [añoActual, añoActual + 1, añoActual + 2]; // Puedes agregar más si quieres

añosFuturos.forEach(año => {
  eventosBase.forEach(e => {
    const fecha = `${año}-${String(e.mes).padStart(2, "0")}-${String(e.dia).padStart(2, "0")}`;
    eventos[fecha] = {
      titulo: e.titulo,
      descripcion: e.descripcion
    };
  });
});

  let fechaActual = new Date();

  function renderCalendar() {
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth();
    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);

    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    mesAnio.textContent = `${meses[month]} ${year}`;
    calendario.innerHTML = "";

    const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    diasSemana.forEach(dia => {
      const nombre = document.createElement("div");
      nombre.classList.add("day-name");
      nombre.textContent = dia;
      calendario.appendChild(nombre);
    });

    for (let i = 0; i < primerDia.getDay(); i++) {
      const espacio = document.createElement("div");
      espacio.classList.add("empty");
      calendario.appendChild(espacio);
    }

    // 🔹 Variable para eliminar burbujas anteriores
    let activeBubble = null;

    for (let d = 1; d <= ultimoDia.getDate(); d++) {
      const fecha = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const celda = document.createElement("div");
      celda.textContent = d;
      celda.classList.add("day");

      if (eventos[fecha]) {
        celda.classList.add("evento-dia");
        celda.title = ""; // evita el tooltip del navegador

        celda.addEventListener("click", e => {
          // Si ya hay una burbuja abierta, la quitamos
          if (activeBubble) {
            activeBubble.remove();
            activeBubble = null;
          }

          // Crear burbuja flotante
          const bubble = document.createElement("div");
          bubble.classList.add("event-bubble");
          bubble.innerHTML = `
            <strong>${eventos[fecha].titulo}</strong><br>
            <span>${eventos[fecha].descripcion}</span>
          `;

          document.body.appendChild(bubble);

          // Posicionar la burbuja justo encima del día
          const rect = e.target.getBoundingClientRect();
          bubble.style.left = `${rect.left + rect.width / 2}px`;
          bubble.style.top = `${rect.top - 10}px`;

          // Mostrar con animación suave
          requestAnimationFrame(() => bubble.classList.add("visible"));

          activeBubble = bubble;

          // Cerrar al hacer clic fuera
          document.addEventListener("click", function cerrar(event) {
            if (!bubble.contains(event.target) && event.target !== celda) {
              bubble.remove();
              activeBubble = null;
              document.removeEventListener("click", cerrar);
            }
          });
        });
      }

      calendario.appendChild(celda);
    }
  }

  // Navegación entre meses
  prev.addEventListener("click", () => {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    renderCalendar();
  });

  next.addEventListener("click", () => {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    renderCalendar();
  });

  // Render inicial del calendario
  renderCalendar();
});


// ==================================================
// 🤖 CHATBOT LOCAL ITAGO - SECCIÓN EVENTOS
// ==================================================

// --- ELEMENTOS DEL DOM ---
const mascota = document.getElementById("mascota");
const chatbot = document.getElementById("chatbot");
const chatOutput = document.getElementById("chatOutput");
const userInput = document.getElementById("userInput");
const mensaje = document.getElementById("mensajeContacto");

let abierto = false;

// ===============================
// 🎭 DICCIONARIO DE RESPUESTAS — EVENTOS
// ===============================
const respuestas = {
  "hola": {
    mensaje: "¡Hola! Soy ItagoBot 🎉 Tu guía de eventos en Itagüí. ¿Sobre qué quieres saber hoy?",
    botones: ["Información", "Eventos", "Soporte", "Contacto"]
  },

  // ====== SECCIÓN INFORMACIÓN ======
  "información": {
    mensaje: "Itago te conecta con los mejores planes culturales, gastronómicos y festivos de Itagüí. 🌆",
    botones: ["Eventos destacados", "Calendario", "Regresar"]
  },

  "eventos destacados": {
    mensaje: "🎭 Próximos eventos:\n\n• Festival Itagüí Vive el Arte – Junio 2025\n• Feria Gastronómica – Agosto 2025\n• Festival de Luces – Diciembre 2025",
    botones: ["Calendario", "Regresar"]
  },

  "calendario": {
    mensaje: "📅 Puedes explorar el calendario interactivo más abajo para ver los eventos por fecha.",
    botones: ["Eventos destacados", "Regresar"]
  },

  // ====== SECCIÓN EVENTOS ======
  "eventos": {
    mensaje: "Tenemos eventos de arte, gastronomía, cultura y tradición durante todo el año. ¿Qué te gustaría conocer?",
    botones: ["Arte y Cultura", "Gastronomía", "Navidad", "Regresar"]
  },

  "arte y cultura": {
    mensaje: "🎨 El Festival 'Itagüí Vive el Arte' reúne artistas locales con presentaciones de música, pintura y danza.",
    botones: ["Gastronomía", "Navidad", "Regresar"]
  },

  "gastronomía": {
    mensaje: "🍴 La Feria Gastronómica ofrece platos típicos, cocina internacional y food trucks para todos los gustos.",
    botones: ["Arte y Cultura", "Navidad", "Regresar"]
  },

  "navidad": {
    mensaje: "🎄 El Festival de Luces ilumina la ciudad con desfiles, música y coloridas decoraciones navideñas.",
    botones: ["Arte y Cultura", "Gastronomía", "Regresar"]
  },

  // ====== SECCIÓN SOPORTE ======
  "soporte": {
    mensaje: "¿Tienes dudas sobre el sitio o los eventos? Estoy aquí para ayudarte 💬",
    botones: ["Contacto", "Regresar"]
  },

  // ====== SECCIÓN CONTACTO ======
  "contacto": {
    mensaje: "📩 Escríbenos a **eventos@itago.com** o al WhatsApp **+57 304 552 3816**.",
    botones: ["Regresar"]
  },

  // ====== FRASES GENÉRICAS ======
  "gracias": {
    mensaje: "¡Con gusto! 🎊 Que disfrutes los eventos de Itagüí.",
    botones: ["Información", "Eventos", "Soporte", "Contacto"]
  },

  "regresar": {
    mensaje: "¿Qué deseas hacer ahora?",
    botones: ["Información", "Eventos", "Soporte", "Contacto"]
  },

  "adiós": {
    mensaje: "👋 ¡Hasta pronto! Nos vemos en el próximo evento.",
    botones: []
  }
};

// ==================================================
// ⚙️ FUNCIONALIDAD PRINCIPAL DEL CHATBOT
// ==================================================
window.addEventListener("load", () => {
  abierto = true;
  chatbot.style.display = "none";
  mostrarRespuestaBot(obtenerRespuestaLocal("hola"));
});

mascota.addEventListener("mouseenter", () => mensaje.classList.add("show"));
mascota.addEventListener("mouseleave", () => mensaje.classList.remove("show"));
mascota.addEventListener("click", () => {
  abierto = !abierto;
  chatbot.style.display = abierto ? "flex" : "none";
});

userInput.addEventListener("keypress", e => {
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
    mensaje: "No entendí eso 🤔. Puedes preguntar por eventos, calendario o contacto.",
    botones: ["Eventos", "Calendario", "Contacto"]
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
