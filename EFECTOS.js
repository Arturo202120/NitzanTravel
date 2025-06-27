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




const container = document.getElementById("carousel-container");
const track = document.getElementById("carousel-track");
const slides = document.querySelectorAll(".carousel-slide");
const dotsContainer = document.getElementById("carousel-dots");

let index = 0;

// Crear los puntitos
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
  container.scrollTo({ left: i * slideWidth, behavior: 'smooth' });
  updateDots();
}

function nextSlide() {
  index = (index + 1) % slides.length;
  goToSlide(index);
}

updateDots();
setInterval(nextSlide, 5000);

// Detectar scroll manual y actualizar puntos
container.addEventListener("scroll", () => {
  const slideWidth = container.offsetWidth;
  const scrollLeft = container.scrollLeft;
  const newIndex = Math.round(scrollLeft / slideWidth);
  if (newIndex !== index) {
    index = newIndex;
    updateDots();
  }
});



// fotos tio y jusrto arriba banners  //

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
