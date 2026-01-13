const ramos = [
  { id: "CALC1", nombre: "Introducción al Cálculo", semestre: 1, area: "matematicas", prerequisitos: [] },
  { id: "ALG", nombre: "Álgebra", semestre: 1, area: "matematicas", prerequisitos: [] },
  { id: "PROG1", nombre: "Programación I", semestre: 1, area: "programacion", prerequisitos: [] },

  { id: "CALC2", nombre: "Cálculo I", semestre: 2, area: "matematicas", prerequisitos: ["CALC1"] },
  { id: "FIS1", nombre: "Física I", semestre: 2, area: "fisica", prerequisitos: ["CALC1"] },
  { id: "PROG2", nombre: "Programación II", semestre: 2, area: "programacion", prerequisitos: ["PROG1"] },

  { id: "CALC3", nombre: "Cálculo II", semestre: 3, area: "matematicas", prerequisitos: ["CALC2"] },
  { id: "FIS2", nombre: "Física II", semestre: 3, area: "fisica", prerequisitos: ["FIS1"] },

  { id: "EDO", nombre: "Ecuaciones Diferenciales", semestre: 4, area: "matematicas", prerequisitos: ["CALC3"] },

  { id: "ECO1", nombre: "Microeconomía", semestre: 5, area: "economia", prerequisitos: [] },
  { id: "ECO2", nombre: "Macroeconomía", semestre: 6, area: "economia", prerequisitos: ["ECO1"] },

  { id: "GEST1", nombre: "Gestión de Operaciones", semestre: 7, area: "gestion", prerequisitos: [] },
  { id: "FIN", nombre: "Finanzas", semestre: 8, area: "economia", prerequisitos: [] },

  { id: "PROY1", nombre: "Proyecto Industrial I", semestre: 9, area: "gestion", prerequisitos: [] },
  { id: "PROY2", nombre: "Proyecto Industrial II", semestre: 10, area: "gestion", prerequisitos: ["PROY1"] }
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
