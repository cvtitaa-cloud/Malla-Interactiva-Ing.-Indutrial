const ramos = [
  { id: "MAT1", nombre: "Matemática I", semestre: 1, area: "matematicas", prerequisitos: [] },
  { id: "ALG", nombre: "Álgebra", semestre: 1, area: "matematicas", prerequisitos: [] },
  { id: "PROG1", nombre: "Programación I", semestre: 1, area: "programacion", prerequisitos: [] },
  { id: "COM", nombre: "Comunicación Oral", semestre: 1, area: "humanidades", prerequisitos: [] },

  { id: "MAT2", nombre: "Matemática II", semestre: 2, area: "matematicas", prerequisitos: ["MAT1"] },
  { id: "FIS1", nombre: "Física I", semestre: 2, area: "fisica", prerequisitos: ["MAT1"] },
  { id: "PROG2", nombre: "Programación II", semestre: 2, area: "programacion", prerequisitos: ["PROG1"] },
  { id: "ETI", nombre: "Ética", semestre: 2, area: "humanidades", prerequisitos: [] },
];

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};
const notasRamos = JSON.parse(localStorage.getItem("notasRamos")) || {};

function puedeTomar(ramo) {
  return ramo.prerequisitos.every(req => estadoRamos[req]);
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

      if (estadoRamos[ramo.id]) {
        div.classList.add("aprobado");

        if (notasRamos[ramo.id]) {
          const nota = document.createElement("div");
          nota.className = "nota";
          nota.textContent = `Nota: ${notasRamos[ramo.id]}`;
          div.appendChild(nota);
        }
      } else if (!puedeTomar(ramo)) {
        div.classList.add("bloqueado");
      }

      div.onmouseenter = () => resaltarDependientes(ramo.id);
      div.onmouseleave = limpiarResaltado;

      div.onclick = () => {
        if (div.classList.contains("bloqueado")) return;

        if (!estadoRamos[ramo.id]) {
          let nota = prompt("Ingresa la nota con la que aprobaste (1.0 a 7.0):");

          if (nota === null) return;

          nota = nota.replace(",", ".");
          const valor = parseFloat(nota);

          if (isNaN(valor) || valor < 1 || valor > 7) {
            alert("Nota inválida. Intenta nuevamente.");
            return;
          }

          estadoRamos[ramo.id] = true;
          notasRamos[ramo.id] = valor.toFixed(1);
        } else {
          estadoRamos[ramo.id] = false;
          delete notasRamos[ramo.id];
        }

        localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
        localStorage.setItem("notasRamos", JSON.stringify(notasRamos));

        renderMalla();
      };

      col.appendChild(div);
    });

    contenedor.appendChild(col);
  });
}

renderMalla();
