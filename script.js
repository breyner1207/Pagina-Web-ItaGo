// ====== CHATBOT Y MASCOTA ITAGO ======
const mascota = document.getElementById("mascota");
const chatbot = document.getElementById("chatbot");
const chatOutput = document.getElementById("chatOutput");
const userInput = document.getElementById("userInput");
const mensaje = document.getElementById("mensajeContacto");

let abierto = false;

// Mostrar / ocultar chatbot
mascota.addEventListener("click", () => {
  abierto = !abierto;
  chatbot.style.display = abierto ? "flex" : "none";
  mensaje.classList.toggle("show");

  if (mensaje.classList.contains("show")) {
    setTimeout(() => mensaje.classList.remove("show"), 4000);
  }
});

// Detectar tecla Enter y enviar mensaje
userInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const texto = userInput.value.trim();
    if (texto === "") return;

    agregarMensaje("Tú", texto);
    userInput.value = "";

    // Llamar al servidor para obtener respuesta real de la IA
    const respuesta = await obtenerRespuestaIA(texto);
    agregarMensaje("ItagoBot", respuesta);
  }
});

function agregarMensaje(remitente, texto) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${remitente}:</strong> ${texto}`;
  chatOutput.appendChild(div);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Aquí llamamos al backend, no a OpenAI directamente
async function obtenerRespuestaIA(pregunta) {
  const response = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: pregunta })
  });
  const data = await response.json();
  return data.reply;
}
