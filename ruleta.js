let container = document.querySelector(".container");
let btn = document.getElementById("spin");

// Crear mensaje flotante
const mensaje = document.createElement("div");
mensaje.id = "mensaje-premio";
document.body.appendChild(mensaje);

// Cargar sonidos
const spinSound = document.getElementById("spin-sound");
const endSound = document.getElementById("end-sound");

// Lista de premios
let premios = [
  {
    titulo: "🎶 DJ Nitzan",
    descripcion: "Tú eliges la playlist del viaje."
  },
  {
    titulo: "✨ Especial",
    descripcion: "¡Gracias por visitarnos!"
  },
  {
    titulo: "😅 Nada",
    descripcion: "¡Gracias por participar!"
  },
  {
    titulo: "🎁 Cupón Sorpresa",
    descripcion: `Código: ${generarCodigo()} — ¡Captura y envía al WhatsApp para descubrir tu descuento!`
  },
  {
    titulo: "🎶 DJ Nitzan",
    descripcion: "Tú eliges la playlist del viaje."
  },
  {
    titulo: "😅 Nada",
    descripcion: "¡Gracias por participar!"
  }
];

// Verificar si ya jugó hoy
const hoy = new Date().toLocaleDateString();
const ultimaFecha = localStorage.getItem("giroRuleta");

if (ultimaFecha === hoy) {
  btn.disabled = true;
  btn.innerText = "Ya jugaste hoy 😊";
}

btn.onclick = function () {
  // Verifica de nuevo por seguridad
  const fechaGuardada = localStorage.getItem("giroRuleta");
  if (fechaGuardada === hoy) return;

  // ▶️ Reproducir sonido de giro
  spinSound.currentTime = 0;
  spinSound.play();

  let random = Math.floor(Math.random() * 3600 + 360);
  container.style.transition = "3s all";
  container.style.transform = `rotate(${random}deg)`;

  setTimeout(() => {
    spinSound.pause();
    endSound.currentTime = 0;
    endSound.play();

    const deg = random % 360;
    const index = Math.floor(((360 - deg + 30) % 360) / 60);
    const premio = premios[index];

    mensaje.innerHTML = `<strong>${premio.titulo}</strong><br><small>${premio.descripcion}</small>`;
    mensaje.style.opacity = "1";

    setTimeout(() => {
      mensaje.style.opacity = "0";
    }, 7000);

    // Guardar la fecha actual
    localStorage.setItem("giroRuleta", hoy);
    btn.disabled = true;
    btn.innerText = "Ya jugaste hoy";

  }, 3000);
};

function generarCodigo() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
