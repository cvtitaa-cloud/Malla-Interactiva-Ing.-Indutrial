const ramos = [
  { id: "CALC1", nombre: "Introducción al Cálculo", semestre: 1, area: "matematicas", prerequisitos: [] },
  { id: "ALG", nombre: "Álgebra", semestre: 1, area: "matematicas", prerequisitos: [] },
  { id: "PROG1", nombre: "Taller de Programación I", semestre: 1, area: "programacion", prerequisitos: [] },

  { id: "CALC2", nombre: "Cálculo I", semestre: 2, area: "matematicas", prerequisitos: ["CALC1"] },
  { id: "FIS1", nombre: "Física I", semestre: 2, area: "fisica", prerequisitos: ["CALC1"] },

  { id: "CALC3", nombre: "Cálculo II", semestre: 3, area: "matematicas", prerequisitos: ["CALC2"] }
];

const malla = document.getElementById("malla");
const progreso = document.getElementById("progreso");

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};
const notas = JSON.parse(localStorage.getItem("notas")) || {};

/* ================= CONFETTI ================= */

function lanzarConfetti() {
  const colores = ["#f4a7b9", "#cdb4db", "#a2d2ff", "#bde0fe", "#ffc8dd"];

  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    document.body.appendChild(confetti);

    const size = Math.random() * 8 + 6;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";
    confetti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "-10px";
    confetti.style.opacity = Math.random();

    const duration = Math.random() * 2 + 2;

    confetti.animate([
      { transform: "translateY(0) rotate(0deg)" },
      { transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)` }
    ], {
      duration: duration * 1000,
      easing: "eas
