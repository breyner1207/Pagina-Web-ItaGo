// ==================================================
// 🗺️ MAPA INTERACTIVO - ALOJAMIENTOS ITAGO
// ==================================================

// Inicializar mapa centrado en Itagüí
const mapa = L.map("mapa").setView([6.172, -75.614], 14);

// Cargar tiles de OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
}).addTo(mapa);

// ==================================================
// 📍 LISTA DE HOTELES CON RANKING
// ==================================================
const hoteles = [
  {
    nombre: "Hotel Central Park",
    lat: 6.171,
    lng: -75.611,
    url: "https://hotelcentralparkitagui.com",
    descripcion: "Ubicado frente al parque principal, ideal para turistas y viajeros de negocios.",
    estrellas: 4.8
  },
  {
    nombre: "Hotel Ditaires Plaza",
    lat: 6.175,
    lng: -75.605,
    url: "https://hotelditairesplaza.com",
    descripcion: "Moderno, acogedor y cerca del estadio Ditaires. Perfecto para eventos deportivos.",
    estrellas: 4.7
  },
  {
    nombre: "Hotel Golden House",
    lat: 6.168,
    lng: -75.619,
    url: "https://hotelgoldenhouseitagui.com",
    descripcion: "Confort, elegancia y excelente servicio. A pocos minutos de la estación Itagüí.",
    estrellas: 4.6
  },
  {
    nombre: "Hostal Senda Verde",
    lat: 6.178,
    lng: -75.602,
    url: "https://hostalsendaverde.com",
    descripcion: "Una experiencia natural y tranquila. Ideal para viajeros ecológicos y mochileros.",
    estrellas: 4.5
  },
  {
    nombre: "Hotel Platinum Plaza",
    lat: 6.170,
    lng: -75.609,
    url: "https://hotelplatinumplaza.com",
    descripcion: "Hotel moderno con restaurante, terraza panorámica y excelente ubicación céntrica.",
    estrellas: 4.4
  },
  {
    nombre: "Hotel Alcaraván",
    lat: 6.162,
    lng: -75.611,
    url: "https://hotelalcaravan.com",
    descripcion: "Hotel tradicional con amplias habitaciones, piscina y zonas verdes. Ideal para familias.",
    estrellas: 4.6
  },
  {
    nombre: "Hotel Portón de San Joaquín",
    lat: 6.162,
    lng: -75.604,
    url: "https://hotelportonsanjoaquin.com",
    descripcion: "Elegante, con restaurante gourmet y atención personalizada en un entorno tranquilo.",
    estrellas: 4.7
  },
  {
    nombre: "Hotel Ayenda Palermo Suites",
    lat: 6.174,
    lng: -75.610,
    url: "https://ayenda.co/hotel/palermo-suites",
    descripcion: "Económico y confortable. Perfecto para estancias cortas o viajeros de paso.",
    estrellas: 4.3
  },
  {
    nombre: "Hotel Prado Verde",
    lat: 6.169,
    lng: -75.617,
    url: "https://hotelpradoverde.com",
    descripcion: "Ambiente campestre con jardines, restaurante y piscina. Ideal para descanso y eventos.",
    estrellas: 4.5
  },
  {
    nombre: "Hotel Maderos Inn",
    lat: 6.166,
    lng: -75.613,
    url: "https://hotelmaderosinn.com",
    descripcion: "Ambiente cálido, moderno y con decoración minimalista. Excelente servicio al cliente.",
    estrellas: 4.6
  },
  {
    nombre: "Hotel Portal del Sur",
    lat: 6.179,
    lng: -75.599,
    url: "https://hotelportaldelsur.com",
    descripcion: "Cerca de la estación Metro Itagüí. Cómodo, limpio y con buena relación calidad-precio.",
    estrellas: 4.4
  },
  {
    nombre: "Hostal La 80",
    lat: 6.177,
    lng: -75.601,
    url: "https://hostalla80.com",
    descripcion: "Alojamiento moderno tipo boutique, ideal para parejas o viajeros digitales.",
    estrellas: 4.5
  },
  {
    nombre: "Hotel Park Sur",
    lat: 6.172,
    lng: -75.607,
    url: "https://hotelparksur.com",
    descripcion: "Hotel pequeño y acogedor, con desayuno incluido y excelente ubicación central.",
    estrellas: 4.4
  },
  {
    nombre: "Hotel Primavera Suites",
    lat: 6.164,
    lng: -75.608,
    url: "https://hotelprimaverasuites.com",
    descripcion: "Diseño contemporáneo, habitaciones amplias y servicio amable. Ideal para negocios.",
    estrellas: 4.5
  },
  {
    nombre: "Hotel Naranjos del Sur",
    lat: 6.176,
    lng: -75.610,
    url: "https://hotelnaranjosdelsur.com",
    descripcion: "Moderno, elegante y con spa incluido. Perfecto para escapadas románticas.",
    estrellas: 4.8
  }
];

// ==================================================
// ⭐ AGREGAR MARCADORES AL MAPA
// ==================================================
const marcadores = [];

hoteles.forEach((hotel, index) => {
  // Crear ícono personalizado con número
  const iconoPersonalizado = L.divIcon({
    className: "custom-icon",
    html: `
      <div style="
        background: linear-gradient(135deg, #a46eff, #ffd500);
        color: #000;
        font-weight: bold;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      ">${index + 1}</div>
    `,
    iconSize: [28, 28]
  });

  // Crear marcador
  const marker = L.marker([hotel.lat, hotel.lng], { icon: iconoPersonalizado })
    .addTo(mapa)
    .bindPopup(`
      <div style="text-align:center; padding:5px 8px;">
        <h3 style="margin:4px 0; color:#2c2466;">${hotel.nombre}</h3>
        <p style="margin:2px 0; font-size:0.9rem;">${hotel.descripcion}</p>
        <p style="color:#ffd500; font-weight:600;">⭐ ${hotel.estrellas}</p>
        <a href="${hotel.url}" target="_blank" style="color:#a46eff; font-weight:600;">Ver sitio web</a>
      </div>
    `);

  marcadores.push(marker);
});

// ==================================================
// 💫 INTERACCIÓN CON LA LISTA DE HOTELES
// ==================================================
const listaHoteles = document.querySelectorAll(".lista-hoteles li");

listaHoteles.forEach((item, index) => {
  // Agregar número de ranking visual (#1, #2, etc.)
  const ranking = document.createElement("div");
  ranking.classList.add("ranking");
  ranking.textContent = `#${index + 1}`;
  item.appendChild(ranking);

  // Mostrar estrellas si existen en el objeto
  const info = item.querySelector("div");
  if (info) {
    const hotel = hoteles[index];
    const estrellas = document.createElement("div");
    estrellas.classList.add("estrellas");
    estrellas.textContent = `⭐ ${hotel.estrellas}`;
    info.appendChild(estrellas);
  }

  // Evento: al hacer clic en la lista
  item.addEventListener("click", () => {
    const hotel = hoteles[index];
    mapa.setView([hotel.lat, hotel.lng], 16, { animate: true });
    marcadores[index].openPopup();

    // Animación visual al seleccionar
    listaHoteles.forEach(h => h.classList.remove("activo"));
    item.classList.add("activo");
  });
});

// ==================================================
// 🎨 EFECTO VISUAL PARA HOTEL SELECCIONADO
// ==================================================
const style = document.createElement("style");
style.textContent = `
  .lista-hoteles li.activo {
    background: linear-gradient(145deg, #2e2960, #1a163f);
    transform: scale(1.02);
    box-shadow: 0 0 25px rgba(164,110,255,0.3);
  }
`;
document.head.appendChild(style);

// ==================================================
// 🤖 CHATBOT LOCAL ITAGO - SECCIÓN ALOJAMIENTO
// ==================================================

// --- ELEMENTOS DEL DOM ---
const mascota = document.getElementById("mascota");
const chatbot = document.getElementById("chatbot");
const chatOutput = document.getElementById("chatOutput");
const userInput = document.getElementById("userInput");
const mensaje = document.getElementById("mensajeContacto");

let abierto = false;

// ===============================
// 🏨 DICCIONARIO DE RESPUESTAS — ALOJAMIENTO
// ===============================
const respuestas = {
  "hola": {
    mensaje: "👋 ¡Bienvenido a la sección de alojamiento! Soy ItagoBot 🏨 Tu guía para encontrar los mejores lugares donde hospedarte en Itagüí.",
    botones: ["Hoteles", "Zonas recomendadas", "Reservas", "Soporte", "Contacto"]
  },

  // ====== SECCIÓN HOTELES ======
  "hoteles": {
    mensaje: "Estos son algunos de los mejores hoteles en Itagüí según ubicación y valoración:",
    botones: ["Hotel Central Park", "Hotel Ditaires Plaza", "Hotel Golden House", "Hostal Senda Verde", "Zonas recomendadas", "Regresar"]
  },

  "hotel central park": {
    mensaje: "🏨 *Hotel Central Park*: Ubicado frente al parque principal. Confort, WiFi gratuito y desayuno incluido. [Visitar web](https://hotelcentralparkitagui.com)",
    botones: ["Hotel Ditaires Plaza", "Hotel Golden House", "Regresar"]
  },

  "hotel ditaires plaza": {
    mensaje: "🏟️ *Hotel Ditaires Plaza*: Moderno y acogedor, ideal para viajeros deportivos. Cerca del estadio y restaurantes. [Visitar web](https://hotelditairesplaza.com)",
    botones: ["Hotel Central Park", "Hostal Senda Verde", "Regresar"]
  },

  "hotel golden house": {
    mensaje: "✨ *Hotel Golden House*: Confort y elegancia con fácil acceso al Metro. Ideal para viajes de negocio. [Visitar web](https://hotelgoldenhouseitagui.com)",
    botones: ["Hotel Central Park", "Hostal Senda Verde", "Regresar"]
  },

  "hostal senda verde": {
    mensaje: "🌿 *Hostal Senda Verde*: Opción ecológica y económica. Rodeado de vegetación, ideal para mochileros. [Visitar web](https://hostalsendaverde.com)",
    botones: ["Hotel Ditaires Plaza", "Hotel Golden House", "Regresar"]
  },

  // ====== SECCIÓN ZONAS ======
  "zonas recomendadas": {
    mensaje: "📍 Las zonas más recomendadas para hospedarte son:\n\n• *Centro de Itagüí*: cerca del parque principal y comercio.\n• *Ditaires*: tranquila y moderna, ideal para eventos y deporte.\n• *Estación Itagüí*: acceso fácil al Metro y conexión con Medellín.",
    botones: ["Hoteles", "Reservas", "Regresar"]
  },

  // ====== SECCIÓN RESERVAS ======
  "reservas": {
    mensaje: "📅 Puedes hacer reservas directamente desde las páginas de los hoteles o usando plataformas como Booking y Expedia. ¿Quieres que te recomiende una?",
    botones: ["Sí, recomiéndame", "No, gracias", "Regresar"]
  },

  "sí, recomiéndame": {
    mensaje: "✅ Te recomiendo usar *Booking.com* o *Despegar.com* para comparar precios y disponibilidad en tiempo real.",
    botones: ["Hoteles", "Regresar"]
  },

  "no, gracias": {
    mensaje: "👌 Perfecto. Si lo prefieres, puedes contactar directamente al hotel desde los enlaces del mapa.",
    botones: ["Hoteles", "Regresar"]
  },

  // ====== SECCIÓN SOPORTE ======
  "soporte": {
    mensaje: "💬 ¿Tienes algún problema con el mapa o los enlaces? Estoy aquí para ayudarte.",
    botones: ["Contacto", "Regresar"]
  },

  // ====== SECCIÓN CONTACTO ======
  "contacto": {
    mensaje: "📩 Escríbenos a **alojamiento@itago.com** o por WhatsApp al **+57 304 552 3816**.",
    botones: ["Regresar"]
  },

  // ====== FRASES GENÉRICAS ======
  "gracias": {
    mensaje: "😊 ¡Con gusto! Espero que encuentres el alojamiento perfecto.",
    botones: ["Hoteles", "Zonas recomendadas", "Reservas", "Contacto"]
  },

  "regresar": {
    mensaje: "¿Qué deseas hacer ahora?",
    botones: ["Hoteles", "Zonas recomendadas", "Reservas", "Soporte", "Contacto"]
  },

  "adiós": {
    mensaje: "👋 ¡Hasta pronto! Que tengas una excelente estadía en Itagüí.",
    botones: []
  }
};

// ==================================================
// ⚙️ FUNCIONALIDAD PRINCIPAL DEL CHATBOT
// ==================================================
window.addEventListener("load", () => {
  abierto = true;
  chatbot.style.display = "flex";
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
