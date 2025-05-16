const koncertLista = document.getElementById('koncertLista');
const kosarLista = document.getElementById('kosarLista');
const vegosszegElem = document.getElementById('vegosszeg');

let kosar = [];
let vegosszeg = 0;

async function koncertekBetoltese() {
  const res = await fetch('http://localhost:3000/api/koncertek');
  const koncertek = await res.json();

  koncertek.forEach(koncert => {
    const koncertDiv = document.createElement('div');
    koncertDiv.className = 'koncertElem';
    koncertDiv.innerHTML = `
      <h3>${koncert.eloado}</h3>
      <p>${koncert.datum} – ${koncert.helyszin}</p>
      <p>Jegyár: ${koncert.ar} Ft</p>
      <button onclick="kosarbaRak(${koncert.id}, '${koncert.eloado}', ${koncert.ar})">Kosárba 🛒</button>
    `;
    koncertLista.appendChild(koncertDiv);
  });
}

function kosarbaRak(id, eloado, ar) {
  kosar.push({ id, eloado, ar });
  frissitKosar();
}

function frissitKosar() {
  kosarLista.innerHTML = '';
  vegosszeg = 0;
  kosar.forEach(tetel => {
    const li = document.createElement('li');
    li.textContent = `${tetel.eloado} – ${tetel.ar} Ft`;
    kosarLista.appendChild(li);
    vegosszeg += tetel.ar;
  });

  vegosszegElem.textContent = vegosszeg;
}

window.onload = koncertekBetoltese;