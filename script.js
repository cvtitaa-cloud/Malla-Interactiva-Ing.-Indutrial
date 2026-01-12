const ramos = [
  { id: "MAT1", nombre: "Matemática I", semestre: 1, prerequisitos: [] },
  { id: "ALG", nombre: "Álgebra", semestre: 1, prerequisitos: [] },
  { id: "PROG1", nombre: "Programación I", semestre: 1, prerequisitos: [] },
  { id: "COM", nombre: "Comunicación Oral y Escrita", semestre: 1, prerequisitos: [] },

  { id: "MAT2", nombre: "Matemática II", semestre: 2, prerequisitos: ["MAT1"] },
  { id: "FIS1", nombre: "Física I", semestre: 2, prerequisitos: ["MAT1"] },
  { id: "PROG2", nombre: "Programación II", semestre: 2, prerequisitos: ["PROG1"] },
  { id: "ETI", nombre: "Ética", semestre: 2, prerequisitos: [] },

  { id: "MAT3", nombre: "Matemática III", semestre: 3, prerequisitos: ["MAT2"] },
  { id: "FIS2", nombre: "Física II", semestre: 3, prerequisitos: ["FIS1", "MAT2"] },
  { id: "EST", nombre: "Estadística", semestre: 3, prerequisitos: ["MAT2"] },
  { id: "ECO", nombre: "Economía", semestre: 3, prerequisitos: [] },

  { id: "MAT4", nombre: "Matemática IV", semestre: 4, prerequisitos: ["MAT3"] },
  { id: "PROB", nombre: "Probabilidad", semestre: 4, prerequisitos: ["EST"] },
  { id: "MICRO", nombre: "Microeconomía", semestre: 4, prerequisitos: ["ECO"] },
  { id: "CONT", nombre: "Contabilidad", semestre: 4, prerequisitos: [] },

  { id: "IO1", nombre: "Investigación de Operaciones I", semestre: 5, prerequisitos: ["PROB"] },
  { id: "MACRO", nombre: "Macroeconomía", semestre: 5, prerequisitos: ["MICRO"] },
  { id: "FIN1", nombre: "Finanzas I", semestre: 5, prerequisitos: ["CONT"] },
  { id: "ORG", nombre: "Comportamiento Organizacional", semestre: 5, prerequisitos: [] },

  { id: "IO2", nombre: "Investigación de Operaciones II", semestre: 6, prerequisitos: ["IO1"] },
  { id: "GEST", nombre: "Gestión de Operaciones", semestre: 6, prerequisitos: ["IO1"] },
  { id: "FIN2", nombre: "Finanzas II", semestre: 6, prerequisitos: ["FIN1"] },
  { id: "DER", nombre: "Derecho para la Empresa", semestre: 6, prerequisitos: [] },

  { id: "LOG", nombre: "Logística", semestre: 7, prerequisitos: ["GEST"] },
  { id: "CAL", nombre: "Gestión de Calidad", semestre: 7, prerequisitos: ["GEST"] },
  { id: "RRHH", nombre: "Gestión de Personas", semestre: 7, prerequisitos: ["ORG"] },
  { id: "EVAL", nombre: "Evaluación de Proyectos", semestre: 7, prerequisitos: ["FIN2", "MACRO"] },

  { id: "ESTR", nombre: "Gestión Estratégica", semestre: 8, prerequisitos: ["LOG", "CAL"] },
  { id: "SIM", nombre: "Simulación de Sistemas", semestre: 8, prerequisitos: ["IO2"] },
  { id: "INNOV", nombre: "Innovación y Emprendimiento", semestre: 8, prerequisitos: [] },

  { id: "PROY1", nombre: "Proyecto de Ingeniería I", semestre: 9, prerequisitos: ["ESTR", "EVAL"] },
  { id: "ELECT1", nombre: "Electivo Profesional I", semestre: 9, prerequisitos: [] },

  { id: "PROY2", nombre: "Proyecto de Ingeniería II", semestre: 10, prerequisitos: ["PROY1"] },
  { id: "ELECT2", nombre: "Electivo Profesional II", semestre: 10, prerequisitos: [] },
];

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};

function puedeTomar(ramo) {
  return ramo.prerequisitos.every(req => estadoRamos[req]);
}

function actualizarProgreso() {
  const total = ramos.length;
  const aprobados = Object.values(estadoRamos).filter(v => v).length;
  const porcentaje = Math.round((aprobados / total) * 100);
  document.getElementById("progreso").textContent =
    `Avance: ${aprobados} / ${total} ramos (${porcentaje}%)`;
}

function resaltarDependientes(id) {
  ramos
    .filter(r => r.prerequisitos.includes(id))
    .forEach(r => {
      const el = document.querySelector(`[data-id="${r.id}"]`);
      if (el) el.classList.add("destacado");
    });
}

function limpiarResaltado() {
  document.querySelectorAll(".ramo.destacado")
    .forEach(el => el.classList.remove("destacado"));
}

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  const semestres = [...new Set(ramos.map(r => r.semestre))];

  semestres.forEach(semestre => {
    const col = document.createElement("div");
    col.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${semestre}`;
    col.appendChild(titulo);

    ramos.filter(r => r.semestre === semestre).forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = ramo.nombre;
      div.dataset.id = ramo.id;

      if (estadoRamos[ramo.id]) {
        div.classList.add("aprobado");
      } else if (!puedeTomar(ramo)) {
        div.classList.add("bloqueado");
      }

      div.onmouseenter = () => resaltarDependientes(ramo.id);
      div.onmouseleave = limpiarResaltado;

      div.onclick = () => {
        if (div.classList.contains("bloqueado")) return;
        estadoRamos[ramo.id] = !estadoRamos[ramo.id];
        localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
        renderMalla();
        actualizarProgreso();
      };

      col.appendChild(div);
    });

    contenedor.appendChild(col);
  });
}

document.getElementById("reset").onclick = () => {
  if (confirm("¿Seguro que deseas reiniciar la malla?")) {
    localStorage.removeItem("estadoRamos");
    location.reload();
  }
};

renderMalla();
actualizarProgreso();
