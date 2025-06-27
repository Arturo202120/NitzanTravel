document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".container section");

  const mostrarAlScroll = () => {
    secciones.forEach((seccion) => {
      const rect = seccion.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.85) {
        seccion.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", mostrarAlScroll);
  mostrarAlScroll();
});



// empieza // 

const container = document.getElementById("carousel-container");
const track = document.getElementById("carousel-track");
const slides = document.querySelectorAll(".carousel-slide");
const dotsContainer = document.getElementById("carousel-dots");

let index = 0;

// Crear puntos
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll("button");

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function goToSlide(i) {
  index = i;
  const slideWidth = container.offsetWidth;
  container.scrollTo({ left: i * slideWidth, behavior: "smooth" });
  updateDots();
}

function nextSlide() {
  index = (index + 1) % slides.length;
  goToSlide(index);
}

// Inicia
updateDots();
let autoScroll = setInterval(nextSlide, 5000);

// Desactivar scroll si el usuario toca
let scrollTimeout;
container.addEventListener("scroll", () => {
  const slideWidth = container.offsetWidth;
  const newIndex = Math.round(container.scrollLeft / slideWidth);

  if (newIndex !== index) {
    index = newIndex;
    updateDots();
  }

  clearTimeout(scrollTimeout);
  clearInterval(autoScroll);

  scrollTimeout = setTimeout(() => {
    autoScroll = setInterval(nextSlide, 5000);
  }, 1500);
});



// fotos tio y justo arriba banners  //

// Carrusel TIO automático
const tioContainer = document.querySelector(".tio-container");

if (tioContainer) {
  let velocidad = 2; // Velocidad suave
  let scrollTio = 0;

  function deslizarSuavemente() {
    scrollTio += velocidad;
    if (scrollTio >= tioContainer.scrollWidth / 2) {
      scrollTio = 0;
    }

    tioContainer.scrollLeft = scrollTio;
    requestAnimationFrame(deslizarSuavemente);
  }

  requestAnimationFrame(deslizarSuavemente);
}



// efecto de iconos y todo al deslizar//

document.addEventListener("DOMContentLoaded", () => {
  const bloques = document.querySelectorAll(".feature-block");

  const mostrarAlScroll = () => {
    bloques.forEach((bloque) => {
      const rect = bloque.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0) {
        bloque.classList.add("visible");
      } else {
        bloque.classList.remove("visible"); // ← permite ocultar con efecto al subir
      }
    });
  };

  window.addEventListener("scroll", mostrarAlScroll);
  mostrarAlScroll(); // por si ya están visibles al cargar
});



// efecto header con mi nav //

document.addEventListener("DOMContentLoaded", () => {
  const headerContent = document.querySelector(".header-content");
  const logoContainer = document.querySelector(".logo-container");

  function mostrarHeader() {
    const headerTop = headerContent.getBoundingClientRect().top;

    if (headerTop <= window.innerHeight) {
      headerContent.classList.add("visible");
      logoContainer.classList.add("visible");
    }
  }

  function efectoParallax() {
    const header = document.querySelector("header");
    const scrollY = window.scrollY;
    header.style.backgroundPosition = `center ${scrollY * 0.5}px`;
  }

  window.addEventListener("scroll", () => {
    mostrarHeader();
    efectoParallax();
  });

  mostrarHeader(); // Llamado inicial
});


// efecto h4 ola //

document.addEventListener("DOMContentLoaded", () => {
  const estilo = document.createElement("style");
  estilo.textContent = `
    .wave-char {
      display: inline-block;
      animation: waveEffect 2s infinite ease-in-out;
    }

    @keyframes waveEffect {
      0% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0); }
    }
  `;
  document.head.appendChild(estilo);

  // Aplicar efecto ola a todos los h4
  document.querySelectorAll("h4").forEach((titulo) => {
    const letras = titulo.textContent.trim().split("");
    titulo.textContent = ""; // Vacía el h4
    letras.forEach((letra, i) => {
      const span = document.createElement("span");
      span.textContent = letra;
      span.className = "wave-char";
      span.style.animationDelay = `${i * 0.07}s`;
      titulo.appendChild(span);
    });
  });
});


// que somos y p //

document.addEventListener("scroll", () => {
  const elementos = document.querySelectorAll("h4, p.bloques");

  elementos.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calcula distancia del centro de la pantalla al centro del elemento
    const elementoCentro = rect.top + rect.height / 2;
    const distanciaCentro = Math.abs(windowHeight / 2 - elementoCentro);

    // Definir cuánto margen queremos permitir (cuanto mayor, más visibles los elementos a los lados)
    const maxDistanciaVisible = windowHeight * 0.6;

    // Calcular opacidad suavemente
    let opacidad = 1 - distanciaCentro / maxDistanciaVisible;
    opacidad = Math.max(opacidad, 0.2); // Nunca será menor a 0.2
    opacidad = Math.min(opacidad, 1);   // Nunca será mayor a 1

    el.style.opacity = opacidad;
    el.style.transition = "opacity 0.3s ease-out";
  });
});

