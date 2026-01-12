const ramos = [
  { id: "CALC1", nombre: "Introducción al Cálculo", semestre: 1, prerequisitos: [] },
  { id: "ALG", nombre: "Álgebra", semestre: 1, prerequisitos: [] },
  { id: "PROG1", nombre: "Taller de Programación I", semestre: 1, prerequisitos: [] },

  { id: "CALC2", nombre: "Cálculo Diferencial e Integral", semestre: 2, prerequisitos: ["CALC1"] },
  { id: "ALG_LIN", nombre: "Álgebra Lineal", semestre: 2, prerequisitos: ["ALG"] },
  { id: "PROG2", nombre: "Taller de Programación II", semestre: 2, prerequisitos: ["PROG1"] }
];

// Cargar progreso
let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

const malla = document.getElementById("malla");

function puedeDesbloquear(ramo) {
  return ramo.prerequisitos.every(p => aprobados.includes(p));
}

function toggleRamo(id) {
  if (aprobados.includes(id)) {
    aprobados = aprobados.filter(r => r !== id);
  } else {
    aprobados.push(id);
  }
  localStorage.setItem("aprobados", JSON.stringify(aprobados));
  renderMalla();
}

function renderMalla() {
  malla.innerHTML = "";

  const semestres = [...new Set(ramos.map(r => r.semestre))];

  semestres.forEach(sem => {
    const cont = document.createElement("div");
    cont.className = "semestre";

    cont.innerHTML = `<h2>Semestre ${sem}</h2>`;
    const grid = document.createElement("div");
    grid.className = "grid";

    ramos.filter(r => r.semestre === sem).forEach(ramo => {
      const div = document.createElement("div");
      div.classList.add("ramo");

      if (aprobados.includes(ramo.id)) {
        div.classList.add("aprobado");
        div.onclick = () => toggleRamo(ramo.id);
      } else if (!puedeDesbloquear(ramo)) {
        div.classList.add("bloqueado");
      } else {
        div.classList.add("no-aprobado");
        div.onclick = () => toggleRamo(ramo.id);
      }

      div.textContent = ramo.nombre;
      grid.appendChild(div);
    });

    cont.appendChild(grid);
    malla.appendChild(cont);
  });
}

renderMalla();
