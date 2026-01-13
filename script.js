const ramos = [
  // SEMESTRE 1
  {id:"CALC1",nombre:"Introducción al Cálculo",semestre:1,area:"mate",pre:[]},
  {id:"ALG",nombre:"Álgebra",semestre:1,area:"mate",pre:[]},
  {id:"TALM",nombre:"Taller Aptitudes Lógicas",semestre:1,area:"mate",pre:[]},
  {id:"PROG1",nombre:"Taller Programación I",semestre:1,area:"programacion",pre:[]},
  {id:"INTRO",nombre:"Introducción Ing. Industrial",semestre:1,area:"gestion",pre:[]},

  // SEMESTRE 2
  {id:"CALC2",nombre:"Cálculo Dif. e Integral",semestre:2,area:"mate",pre:["CALC1"]},
  {id:"ALGLIN",nombre:"Álgebra Lineal",semestre:2,area:"mate",pre:["ALG"]},
  {id:"QUIM",nombre:"Química General",semestre:2,area:"fisica",pre:[]},
  {id:"PROG2",nombre:"Taller Programación II",semestre:2,area:"programacion",pre:["PROG1"]},
  {id:"ANTRO",nombre:"Antropología",semestre:2,area:"formacion",pre:[]},

  // SEMESTRE 3
  {id:"CALC3",nombre:"Cálculo Multivariable",semestre:3,area:"mate",pre:["CALC2"]},
  {id:"FIS1",nombre:"Física",semestre:3,area:"fisica",pre:["CALC2"]},
  {id:"BD",nombre:"Bases de Datos",semestre:3,area:"programacion",pre:["PROG2"]},
  {id:"TDIG",nombre:"Tecnologías Digitales",semestre:3,area:"programacion",pre:[]},
  {id:"ETICA",nombre:"Ética",semestre:3,area:"formacion",pre:[]},
  {id:"GESTP",nombre:"Gestión Personal",semestre:3,area:"formacion",pre:[]},

  // SEMESTRE 4
  {id:"ED",nombre:"Ecuaciones Diferenciales",semestre:4,area:"mate",pre:["CALC3"]},
  {id:"EYM",nombre:"Electricidad y Magnetismo",semestre:4,area:"fisica",pre:["FIS1"]},
  {id:"PROB",nombre:"Probabilidad y Estadística",semestre:4,area:"mate",pre:["ALGLIN"]},
  {id:"SUST",nombre:"Taller Sustentabilidad",semestre:4,area:"gestion",pre:[]},
  {id:"ECON",nombre:"Economía",semestre:4,area:"gestion",pre:[]},

  // SEMESTRE 5
  {id:"ESTADV",nombre:"Estadística Avanzada",semestre:5,area:"mate",pre:["PROB"]},
  {id:"FENT",nombre:"Fenómenos Transporte",semestre:5,area:"fisica",pre:["ED"]},
  {id:"INNOV",nombre:"Taller Innovación",semestre:5,area:"gestion",pre:[]},
  {id:"CONT",nombre:"Contabilidad y Costos",semestre:5,area:"gestion",pre:[]},
  {id:"OPT",nombre:"Optimización",semestre:5,area:"mate",pre:["ED"]},
  {id:"PYS",nombre:"Persona y Sociedad",semestre:5,area:"formacion",pre:[]},

  // SEMESTRES 6–10 (sin prerequisitos estrictos para simplificar)
  {id:"SIM",nombre:"Taller Simulación",semestre:7,area:"programacion",pre:["OPT"]},
  {id:"LOG",nombre:"Gestión Logística",semestre:9,area:"gestion",pre:[]},
  {id:"TIT",nombre:"Vía de Titulación",semestre:10,area:"gestion",pre:[]}
];

const estado = JSON.parse(localStorage.getItem("estado")) || {};
const malla = document.getElementById("malla");

function puedeCursar(ramo){
  return ramo.pre.every(p => estado[p]?.aprobado);
}

function render(){
  malla.innerHTML = "";
  for(let s=1;s<=10;s++){
    const col = document.createElement("div");
    col.className = "semestre";
    col.innerHTML = `<h2>Semestre ${s}</h2>`;

    ramos.filter(r=>r.semestre===s).forEach(r=>{
      const div = document.createElement("div");
      div.classList.add("ramo", r.area);

      if(estado[r.id]?.aprobado){
        div.classList.add("aprobado");
        div.textContent = `${r.nombre} (${estado[r.id].nota})`;
      } else if(puedeCursar(r)){
        div.classList.add("disponible");
        div.textContent = r.nombre;
        div.onclick = ()=>{
          const nota = prompt("Nota final:");
          if(nota){
            estado[r.id]={aprobado:true,nota};
            localStorage.setItem("estado",JSON.stringify(estado));
            lanzarConfetti();
            render();
          }
        };
      } else {
        div.classList.add("bloqueado");
        div.textContent = r.nombre;
      }
      col.appendChild(div);
    });
    malla.appendChild(col);
  }
}

function lanzarConfetti(){
  const c=document.getElementById("confetti");
  const ctx=c.getContext("2d");
  c.width=innerWidth;c.height=innerHeight;
  let p=[...Array(120)].map(()=>({
    x:Math.random()*c.width,
    y:Math.random()*c.height,
    r:Math.random()*6+4,
    d:Math.random()*5+2
  }));
  let t=0;
  (function anim(){
    ctx.clearRect(0,0,c.width,c.height);
    p.forEach(o=>{
      ctx.fillStyle=`hsl(${Math.random()*360},80%,70%)`;
      ctx.beginPath();
      ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
      ctx.fill();
      o.y+=o.d;
    });
    if(t++<60) requestAnimationFrame(anim);
  })();
}

render();
