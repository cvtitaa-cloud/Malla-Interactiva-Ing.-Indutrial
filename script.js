const ramos = [
  { id: "CALC0", nombre: "Introducción al Cálculo", semestre: 1, area: "matematicas", prerequisitos: [] },
  { id: "ALG", nombre: "Álgebra", semestre: 1, area: "matematicas", prerequisitos: [] },
  { id: "PROG1", nombre: "Programación I", semestre: 1, area: "programacion", prerequisitos: [] },
  { id: "INTROING", nombre: "Introducción a la Ingeniería", semestre: 1, area: "gestion", prerequisitos: [] },
  { id: "COM1", nombre: "Comunicación Efectiva", semestre: 1, area: "humanidades", prerequisitos: [] },

  { id: "CALC1", nombre: "Cálculo I", semestre: 2, area: "matematicas", prerequisitos: ["CALC0"] },
  { id: "FIS1", nombre: "Física I", semestre: 2, area: "fisica", prerequisitos: ["CALC0"] },
  { id: "PROG2", nombre: "Programación II", semestre: 2, area: "programacion", prerequisitos: ["PROG1"] },
  { id: "ETICA", nombre: "Ética Profesional", semestre: 2, area: "humanidades", prerequisitos: [] },

  { id: "CALC2", nombre: "Cálculo II", semestre: 3, area: "matematicas", prerequisitos: ["CALC1"] },
  { id: "FIS2", nombre: "Física II", semestre: 3, area: "fisica", prerequisitos: ["FIS1"] },
  { id: "EST1", nombre: "Probabilidad y Estadística", semestre: 3, area: "matematicas", prerequisitos: ["CALC1"] },
  { id: "CONT", nombre: "Contabilidad", semestre: 3, area: "economia", prerequisitos: [] },

  { id: "EDO", nombre: "Ecuaciones Diferenciales", semestre: 4, area: "matematicas", prerequisitos: ["CALC2"] },
  { id: "EST2", nombre: "Estadística Inferencial", semestre: 4, area: "matematicas", prerequisitos: ["EST1"] },
  { id: "MICRO", nombre: "Microeconomía", semestre: 4, area: "economia", prerequisitos: [] },
  { id: "ORG", nombre: "Comportamiento Organizacional", semestre: 4, area: "gestion", prerequisitos: [] },

  { id: "MACRO", nombre: "Macroeconomía", semestre: 5, area: "economia", prerequisitos: ["MICRO"] },
  { id: "IO", nombre: "Investigación de Operaciones I", semestre: 5, area: "gestion", prerequisitos: ["CALC2"] },
  { id: "FIN1", nombre: "Finanzas I", semestre: 5, area: "economia", prerequisitos: ["CONT"] },

  { id: "IO2", nombre: "Investigación de Operaciones II", semestre: 6, area: "gestion", prerequisitos: ["IO"] },
  { id: "FIN2", nombre: "Finanzas II", semestre: 6, area: "economia", prerequisitos: ["FIN1"] },
  { id: "LOG", nombre: "Logística", semestre: 6, area: "gestion", prerequisitos: [] },

  { id: "PROD", nombre: "Gestión de Operaciones", semestre: 7, area: "gestion", prerequisitos: ["LOG"] },
  { id: "RRHH", nombre: "Gestión de Personas", semestre: 7, area: "gestion", prerequisitos: [] },
  { id: "MARK", nombre: "Marketing", semestre: 7, area: "economia", prerequisitos: [] },

  { id: "PROY", nombre: "Evaluación de Proyectos", semestre: 8, area: "gestion", prerequisitos: ["FIN2"] },
  { id: "CALIDAD", nombre: "Gestión de Calidad", semestre: 8, area: "gestion", prerequisitos: [] },

  { id: "PROY1", nombre: "Proyecto de Ingeniería I", semestre: 9, area: "gestion", prerequisitos: ["PROY"] },
  { id: "OPT1", nombre: "Optativo Profesional I", semestre: 9, area: "humanidades", prerequisitos: [] },

  { id: "PROY2", nombre: "Proyecto de Ingeniería II", semestre: 10, area: "gestion", prerequisitos: ["PROY1"] },
  { id: "OPT2", nombre: "Optativo Profesional II", semestre: 10, area: "humanidades", prerequisitos: [] }
];

const malla = document.getElementById("malla");
const progreso = document.getElementById("progreso");
const toggleVista = document.getElementById("toggleVista");

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};
const notas = JSON.parse(localStorage.getItem("notas")) || {};

toggleVista.onclick = () => {
  malla.classList.toggle("horizontal");
  malla.classList.toggle("vertical");
};

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
      { duration: dur * 1000 }
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
      div.className = `ramo area-${ramo.area}`;

      const aprobado = estadoRamos[ramo.id];
      const desbloqueado = ramo.prerequisitos.every(p => estadoRamos[p]);

      if (aprobado) div.classList.add("aprobado");
      if (!desbloqueado && !aprobado) div.classList.add("bloqueado");

      div.innerHTML = `
        <strong>${ramo.nombre}</strong>
        ${notas[ramo.id] ? `<div class="nota">Nota: ${notas[ramo.id]}</div>` : ""}
      `;

      div.onclick = () => {
        if (!desbloqueado && !aprobado) return;
        if (!estadoRamos[ramo.id]) {
          const nota = prompt("¿Con qué nota aprobaste?");
          if (!nota) return;
          estadoRamos[ramo.id] = true;
          notas[ramo.id] = nota;
          lanzarConfetti();
        } else {
          delete estadoRamos[ramo.id];
          delete notas[ramo.id];
        }
        localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
        localStorage.setItem("notas", JSON.stringify(notas));
        crearMalla();
      };

      col.appendChild(div);
    });

    malla.appendChild(col);
  }

  progreso.textContent = `Progreso: ${Object.keys(estadoRamos).length} / ${ramos.length} ramos aprobados`;
}

crearMalla();
