const ramos = [
  { id: "CALC1", nombre: "Introducción al Cálculo", semestre: 1, prerequisitos: [] },
  { id: "ALG", nombre: "Álgebra", semestre: 1, prerequisitos: [] },
  { id: "PROG1", nombre: "Taller de Programación I", semestre: 1, prerequisitos: [] },

  { id: "CALC2", nombre: "Cálculo I", semestre: 2, prerequisitos: ["CALC1"] },
  { id: "PROG2", nombre: "Taller de Programación II", semestre: 2, prerequisitos: ["PROG1"] },

  { id: "CALC3", nombre: "Cálculo II", semestre: 3, prerequisitos: ["CALC2"] },
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
