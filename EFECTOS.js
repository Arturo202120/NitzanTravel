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
