const ramos = [
  // ===== SEMESTRE 1 =====
  { id: "MAT1", nombre: "Matemática I", semestre: 1, area: "matematicas", prerequisitos: [] },
  { id: "ALG", nombre: "Álgebra", semestre: 1, area: "matematicas", prerequisitos: [] },
  { id: "PROG1", nombre: "Programación I", semestre: 1, area: "programacion", prerequisitos: [] },
  { id: "COM", nombre: "Comunicación Oral", semestre: 1, area: "humanidades", prerequisitos: [] },

  // ===== SEMESTRE 2 =====
  { id: "MAT2", nombre: "Matemática II", semestre: 2, area: "matematicas", prerequisitos: ["MAT1"] },
  { id: "FIS1", nombre: "Física I", semestre: 2, area: "fisica", prerequisitos: ["MAT1"] },
  { id: "PROG2", nombre: "Programación II", semestre: 2, area: "programacion", prerequisitos: ["PROG1"] },
  { id: "ETI", nombre: "Ética", semestre: 2, area: "humanidades", prerequisitos: [] },

  // ===== SEMESTRE 3 =====
  { id: "MAT3", nombre: "Matemática III", semestre: 3, area: "matematicas", prerequisitos: ["MAT2"] },
  { id: "FIS2", nombre: "Física II", semestre: 3, area: "fisica", prerequisitos: ["FIS1"] },
  { id: "EST", nombre: "Estadística", semestre: 3, area: "matematicas", prerequisitos: ["MAT2"] },
  { id: "ECO", nombre: "Economía", semestre: 3, area: "economia", prerequisitos: [] },

  // ===== SEMESTRE 4 =====
  { id: "MAT4", nombre: "Matemática IV", semestre: 4, area: "matematicas", prerequisitos: ["MAT3"] },
  { id: "MICRO", nombre: "Microeconomía", semestre: 4, area: "economia", prerequisitos: ["ECO"] },
  { id: "CONT", nombre: "Contabilidad", semestre: 4, area: "gestion", prerequisitos: [] },
  { id: "PROB", nombre: "Probabilidad", semestre: 4, area: "matematicas", prerequisitos: ["EST"] },

  // ===== SEMESTRE 5 =====
  { id: "IO1", nombre: "Investigación de Operaciones I", semestre: 5, area: "gestion", prerequisitos: ["PROB"] },
  { id: "MACRO", nombre: "Macroeconomía", semestre: 5, area: "economia", prerequisitos: ["MICRO"] },
  { id: "FIN1", nombre: "Finanzas I", semestre: 5, area: "economia", prerequisitos: ["CONT"] },
  { id: "ORG", nombre: "Comportamiento Organizacional", semestre: 5, area: "gestion", prerequisitos: [] },

  // ===== SEMESTRE 6 =====
  { id: "IO2", nombre: "Investigación de Operaciones II", semestre: 6, area: "gestion", prerequisitos: ["IO1"] },
  { id: "GEST", nombre: "Gestión de Operaciones", semestre: 6, area: "gestion", prerequisitos: ["IO1"] },
  { id: "FIN2", nombre: "Finanzas II", semestre: 6, area: "economia", prerequisitos: ["FIN1"] },
  { id: "DER", nombre: "Derecho para la Empresa", semestre: 6, area: "humanidades", prerequisitos: [] },

  // ===== SEMESTRE 7 =====
  { id: "LOG", nombre: "Logística", semestre: 7, area: "gestion", prerequisitos: ["GEST"] },
  { id: "CAL", nombre: "Gestión de Calidad", semestre: 7, area: "gestion", prerequisitos: ["GEST"] },
  { id: "RRHH", nombre: "Gestión de Personas", semestre: 7, area: "gestion", prerequisitos: ["ORG"] },
  { id: "EVAL", nombre: "Evaluación de Proyectos", semestre: 7, area: "gestion", prerequisitos: ["FIN2", "MACRO"] },

  // ===== SEMESTRE 8 =====
  { id: "ESTR", nombre: "Gestión Estratégica", semestre: 8, area: "gestion", prerequisitos: ["LOG", "CAL"] },
  { id: "SIM", nombre: "Simulación de Sistemas", semestre: 8, area: "gestion", prerequisitos: ["IO2"] },
  { id: "INNOV", nombre: "Innovación y Emprendimiento", semestre: 8, area: "gestion", prerequisitos: [] },

  // ===== SEMESTRE 9 =====
  { id: "PROY1", nombre: "Proyecto de Ingeniería I", semestre: 9, area: "gestion", prerequisitos: ["ESTR", "EVAL"] },
  { id: "ELECT1", nombre: "Electivo Profesional I", semestre: 9, area: "gestion", prerequisitos: [] },

  // ===== SEMESTRE 10 =====
  { id: "PROY2", nombre: "Proyecto de Ingeniería II", semestre: 10, area: "gestion", prerequisitos: ["PROY1"] },
  { id: "ELECT2", nombre: "Electivo Profesional II", semestre: 10, area: "gestion", prerequisitos: [] }
];

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};
const notasRamos = JSON.parse(localStorage.getItem("notasRamos")) || {};

function puedeTomar(ramo) {
  return ramo.prerequisitos.every(req => estadoRamos[req]);
}

function resaltarDependientes(id) {
  ramos.filter(r => r.prerequisitos.includes(id))
    .forEach(r => {
      const el = document.querySelector(`[data-id="${r.id}"]`);
      if (el) el.classList.add("destacado");
    });
}

function limpiarResaltado() {
  document.querySelectorAll(".destacado")
    .forEach(e => e.classList.remove("destacado"));
}

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  const semestres = [...new Set(ramos.map(r => r.semestre))];

  semestres.forEach(s => {
    const col = document.createElement("div");
    col.className = "semestre";

    const h = document.createElement("h2");
    h.textContent = `Semestre ${s}`;
    col.appendChild(h);

    ramos.filter(r => r.semestre === s).forEach(ramo => {
      const div = document.createElement("div");
      div.className = `ramo area-${ramo.area}`;
      div.dataset.id = ramo.id;

      const nombre = document.createElement("div");
      nombre.textContent = ramo.nombre;
      div.appendChild(nombre);

      if (estado
