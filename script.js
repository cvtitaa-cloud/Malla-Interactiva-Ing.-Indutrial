const ramos = [
  // ===== SEMESTRE 1 =====
  { id: "CALC0", nombre: "Introducción al Cálculo", semestre: 1, area: "matematicas", prerequisitos: [] },
  { id: "ALG", nombre: "Álgebra", semestre: 1, area: "matematicas", prerequisitos: [] },
  { id: "PROG1", nombre: "Programación I", semestre: 1, area: "programacion", prerequisitos: [] },
  { id: "INTROING", nombre: "Introducción a la Ingeniería", semestre: 1, area: "gestion", prerequisitos: [] },
  { id: "COM1", nombre: "Comunicación Efectiva", semestre: 1, area: "humanidades", prerequisitos: [] },

  // ===== SEMESTRE 2 =====
  { id: "CALC1", nombre: "Cálculo I", semestre: 2, area: "matematicas", prerequisitos: ["CALC0"] },
  { id: "FIS1", nombre: "Física I", semestre: 2, area: "fisica", prerequisitos: ["CALC0"] },
  { id: "PROG2", nombre: "Programación II", semestre: 2, area: "programacion", prerequisitos: ["PROG1"] },
  { id: "ETICA", nombre: "Ética Profesional", semestre: 2, area: "humanidades", prerequisitos: [] },

  // ===== SEMESTRE 3 =====
  { id: "CALC2", nombre: "Cálculo II", semestre: 3, area: "matematicas", prerequisitos: ["CALC1"] },
  { id: "FIS2", nombre: "Física II", semestre: 3, area: "fisica", prerequisitos: ["FIS1"] },
  { id: "EST1", nombre: "Probabilidad y Estadística", semestre: 3, area: "matematicas", prerequisitos: ["CALC1"] },
  { id: "CONT", nombre: "Contabilidad", semestre: 3, area: "economia", prerequisitos: [] },

  // ===== SEMESTRE 4 =====
  { id: "EDO", nombre: "Ecuaciones Diferenciales", semestre: 4, area: "matematicas", prerequisitos: ["CALC2"] },
  { id: "EST2", nombre: "Estadística Inferencial", semestre: 4, area: "matematicas", prerequisitos: ["EST1"] },
  { id: "MICRO", nombre: "Microeconomía", semestre: 4, area: "economia", prerequisitos: [] },
  { id: "ORG", nombre: "Comportamiento Organizacional", semestre: 4, area: "gestion", prerequisitos: [] },

  // ===== SEMESTRE 5 =====
  { id: "MACRO", nombre: "Macroeconomía", semestre: 5, area: "economia", prerequisitos: ["MICRO"] },
  { id: "IO", nombre: "Investigación de Operaciones I", semestre: 5, area: "gestion", prerequisitos: ["CALC2"] },
  { id: "FIN1", nombre: "Finanzas I", semestre: 5, area: "economia", prerequisitos: ["CONT"] },

  // ===== SEMESTRE 6 =====
  { id: "IO2", nombre: "Investigación de Operaciones II", semestre: 6, area: "gestion", prerequisitos: ["IO"] },
  { id: "FIN2", nombre: "Finanzas II", semestre: 6, area: "economia", prerequisitos: ["FIN1"] },
  { id: "LOG", nombre: "Logística", semestre: 6, area: "gestion", prerequisitos: [] },

  // ===== SEMESTRE 7 =====
  { id: "PROD", nombre: "Gestión de Operaciones", semestre: 7, area: "gestion", prerequisitos: ["LOG"] },
  { id: "RRHH", nombre: "Gestión de Personas", semestre: 7, area: "gestion", prerequisitos: [] },
  { id: "MARK", nombre: "Marketing", semestre: 7, area: "economia", prerequisitos: [] },

  // ===== SEMESTRE 8 =====
  { id: "PROY", nombre: "Evaluación de Proyectos", semestre: 8, area: "gestion", prerequisitos: ["FIN2"] },
  { id: "CALIDAD", nombre: "Gestión de Calidad", semestre: 8, area: "gestion", prerequisitos: [] },

  // ===== SEMESTRE 9 =====
  { id: "PROY1", nombre: "Proyecto de Ingeniería I", semestre: 9, area: "gestion", prerequisitos: ["PROY"] },
  { id: "OPT1", nombre: "Optativo Profesional I", semestre: 9, area: "humanidades", prerequisitos: [] },

  // ===== SEMESTRE 10 =====
  { id: "PROY2", nombre: "Proyecto de Ingeniería II", semestre: 10, area: "gestion", prerequisitos: ["PROY1"] },
  { id: "OPT2", nombre: "Optativo Profesional II", semestre: 10, area: "humanidades", prerequisitos: [] }
];

const malla = document.getElementById("malla");
const progreso = document.getElementById("progreso");

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};
const notas = JSON.parse(localStorage.getItem("notas")) || {};

/* Confetti */
function lanzarConfetti() {
  const colores = ["#f4a7b9", "#cdb4db", "#a2d2ff", "#bde0fe", "#ffc8dd"];
  for (let i = 0; i < 40; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    document.body.appendChild(c);

    const size = Math.random() * 8 + 6;
    c.style.width = size + "px";
    c.style.height = size + "px";
    c.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
    c.style.left = Math.random() * window.innerWidth + "px";
    c.style.top = "-10px";

    const dur = Math.random() * 2 + 2;
    c.animate(
      [{ transform: "translateY(0)" }, { transform: `translateY(${window.innerHeight + 100}px)` }],
      { duration: dur * 1000, easing: "ease-out" }
    );

    setTimeout(() => c.remove(), dur * 1000);
  }
}

/* Crear malla */
function crearMalla() {
  malla.innerHTML = "";
  const maxSemestre = Math.max(...ramos.map(r => r.semestre));

  for (let s = 1; s <= maxSemestre; s++) {
    const col = document.createElement("div");
    col.className = "semestre";
    col.innerHTML = `<h2>Semestre ${s}</h2>`;

    ramos.filter(r => r.semestre === s).forEach(ramo => {
      const div = document.createElement("div");
      div.className = `ramo area-${ramo.ar
