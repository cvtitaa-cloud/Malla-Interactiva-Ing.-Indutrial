const ramos = [
  // ===== SEMESTRE 1 =====
  { id: "MAT1", nombre: "Matemática I", semestre: 1, prerequisitos: [] },
  { id: "ALG", nombre: "Álgebra", semestre: 1, prerequisitos: [] },
  { id: "PROG1", nombre: "Programación I", semestre: 1, prerequisitos: [] },
  { id: "COM", nombre: "Comunicación Oral y Escrita", semestre: 1, prerequisitos: [] },

  // ===== SEMESTRE 2 =====
  { id: "MAT2", nombre: "Matemática II", semestre: 2, prerequisitos: ["MAT1"] },
  { id: "FIS1", nombre: "Física I", semestre: 2, prerequisitos: ["MAT1"] },
  { id: "PROG2", nombre: "Programación II", semestre: 2, prerequisitos: ["PROG1"] },
  { id: "ETI", nombre: "Ética", semestre: 2, prerequisitos: [] },

  // ===== SEMESTRE 3 =====
  { id: "MAT3", nombre: "Matemática III", semestre: 3, prerequisitos: ["MAT2"] },
  { id: "FIS2", nombre: "Física II", semestre: 3, prerequisitos: ["FIS1", "MAT2"] },
  { id: "EST", nombre: "Estadística", semestre: 3, prerequisitos: ["MAT2"] },
  { id: "ECO", nombre: "Economía", semestre: 3, prerequisitos: [] },

  // ===== SEMESTRE 4 =====
  { id: "MAT4", nombre: "Matemática IV", semestre: 4, prerequisitos: ["MAT3"] },
  { id: "PROB", nombre: "Probabilidad", semestre: 4, prerequisitos: ["EST"] },
  { id: "MICRO", nombre: "Microeconomía", semestre: 4, prerequisitos: ["ECO"] },
  { id: "CONT", nombre: "Contabilidad", semestre: 4, prerequisitos: [] },

  // ===== SEMESTRE 5 =====
  { id: "IO1", nombre: "Investigación de Operaciones I", semestre: 5, prerequisitos: ["PROB"] },
  { id: "MACRO", nombre: "Macroeconomía", semestre: 5, prerequisitos: ["MICRO"] },
  { id: "FIN1", nombre: "Finanzas I", semestre: 5, prerequisitos: ["CONT"] },
  { id: "ORG", nombre: "Comportamiento Organizacional", semestre: 5, prerequisitos: [] },

  // ===== SEMESTRE 6 =====
  { id: "IO2", nombre: "Investigación de Operaciones II", semestre: 6, prerequisitos: ["IO1"] },
  { id: "GEST", nombre: "Gestión de Operaciones", semestre: 6, prerequisitos: ["IO1"] },
  { id: "FIN2", nombre: "Finanzas II", semestre: 6, prerequisitos: ["FIN1"] },
  { id: "DER", nombre: "Derecho para la Empresa", semestre: 6, prerequisitos: [] },

  // ===== SEMESTRE 7 =====
  { id: "LOG", nombre: "Logística", semestre: 7, prerequisitos: ["GEST"] },
  { id: "CAL", nombre: "Gestión de Calidad", semestre: 7, prerequisitos: ["GEST"] },
  { id: "RRHH", nombre: "Gestión de Personas", semestre: 7, prerequisitos: ["ORG"] },
  { id: "EVAL", nombre: "Evaluación de Proyectos", semestre: 7, prerequisitos: ["FIN2", "MACRO"] },

  // ===== SEMESTRE 8 =====
  { id: "ESTR", nombre: "Gestión Estratégica", semestre: 8, prerequisitos: ["LOG", "CAL"] },
  { id: "SIM", nombre: "Simulación de Sistemas", semestre: 8, prerequisitos: ["IO2"] },
  { id: "INNOV", nombre: "Innovación y Emprendimiento", semestre: 8, prerequisitos: [] },

  // ===== SEMESTRE 9 =====
  { id: "PROY1", nombre: "Proyecto de Ingeniería I", semestre: 9, prerequisitos: ["ESTR", "EVAL"] },
  { id: "ELECT1", nombre: "Electivo Profesional I", semestre: 9, prerequisitos: [] },

  // ===== SEMESTRE 10 =====
  { id: "PROY2", nombre: "Proyecto de Ingeniería II", semestre: 10, prerequisitos: ["PROY1"] },
  { id: "ELECT2", nombre: "Electivo Profesional II", semestre: 10, prerequisitos: [] },
];

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};

function puedeTomar(ramo) {
  return ramo.prerequisitos.every(req => estadoRamos[req]);
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

    ramos
      .filter(r => r.semestre === semestre)
      .forEach(ramo => {
        const div = document.createElement("div");
        div.className = "ramo";
        div.textContent = ramo.nombre;

        if (estadoRamos[ramo.id]) {
          div.classList.add("aprobado");
        } else if (!puedeTomar(ramo)) {
          div.classList.add("bloqueado");
        }

        div.onclick = () => {
          if (div.classList.contains("bloqueado")) return;
          estadoRamos[ramo.id] = !estadoRamos[ramo.id];
          localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
          renderMalla();
        };

        col.appendChild(div);
      });

    contenedor.appendChild(col);
  });
}

renderMalla();
