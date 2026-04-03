const platillos = [
  { id:1,  nombre:"Guacamole artesanal",     cat:"Entradas",    precio:120, emoji:"🥑", desc:"Aguacate Hass de Michoacán, jitomate asado, cebolla morada, chile serrano y cilantro fresco. Servido con totopos de maíz azul.", badge:"Popular" },
  { id:2,  nombre:"Sopa de lima yucateca",   cat:"Entradas",    precio:95,  emoji:"🍋", desc:"Caldo de pollo de rancho, lima yucateca, tiras de tortilla, aguacate y chile habanero al gusto.", badge:null },
  { id:3,  nombre:"Tostadas de tinga",       cat:"Entradas",    precio:110, emoji:"🌮", desc:"Tinga de pollo con jitomate y chipotle, sobre tostada de maíz criollo, crema de rancho y queso fresco.", badge:null },
  { id:4,  nombre:"Ceviche de atún",         cat:"Entradas",    precio:165, emoji:"🐟", desc:"Atún fresco marinado en limón, con mango, pepino, chile serrano y salsa de soya.", badge:"Chef recomienda" },
  { id:5,  nombre:"Mole negro oaxaqueño",    cat:"Principales", precio:220, emoji:"🍗", desc:"Pollo de rancho en mole negro elaborado con 32 ingredientes, arroz rojo y frijoles de olla con epazote.", badge:"Firma del chef" },
  { id:6,  nombre:"Filete al chipotle",      cat:"Principales", precio:280, emoji:"🥩", desc:"Filete de res angus en salsa de chipotle tatemado, papas cambray con mantequilla y ensalada de temporada.", badge:null },
  { id:7,  nombre:"Enchiladas verdes",       cat:"Principales", precio:175, emoji:"🫔", desc:"Pollo deshebrado en salsa de tomatillo verde, crema de rancho, queso Oaxaca y cebolla morada.", badge:null },
  { id:8,  nombre:"Chiles en nogada",        cat:"Principales", precio:250, emoji:"🫑", desc:"Chile poblano relleno de picadillo de temporada, nogada de nuez de Castilla, granada y perejil fresco.", badge:"Temporada" },
  { id:9,  nombre:"Tres leches artesanal",   cat:"Postres",     precio:85,  emoji:"🎂", desc:"Bizcocho esponjoso bañado en tres tipos de leche, crema batida natural y canela de Ceilán.", badge:"Popular" },
  { id:10, nombre:"Churros con cajeta",      cat:"Postres",     precio:75,  emoji:"🍩", desc:"Churros crujientes de masa choux con cajeta de Celaya y chocolate caliente artesanal.", badge:null },
  { id:11, nombre:"Agua de Jamaica",         cat:"Bebidas",     precio:45,  emoji:"🌺", desc:"Infusión fría de flor de Jamaica de Guerrero con hierbabuena fresca y poca azúcar.", badge:null },
  { id:12, nombre:"Margarita clásica",       cat:"Bebidas",     precio:120, emoji:"🍹", desc:"Tequila reposado 100% agave, triple sec, jugo de limón recién exprimido y sal de Colima.", badge:"Popular" },
  { id:13, nombre:"Mezcal artesanal",        cat:"Bebidas",     precio:140, emoji:"🥃", desc:"Mezcal espadín de Oaxaca, naranja fresca y sal de gusano. Producción artesanal en palenque familiar.", badge:null },
];

let catActiva = "Todos";

function getCats() {
  return ["Todos", ...new Set(platillos.map(p => p.cat))];
}

function renderCats() {
  const el = document.getElementById("categorias");
  el.innerHTML = getCats().map(c => `
    <button class="cat-btn ${c === catActiva ? 'active' : ''}" data-cat="${c}">${c}</button>
  `).join("");
  el.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      catActiva = btn.dataset.cat;
      renderCats();
      renderMenu();
    });
  });
}

function renderMenu() {
  const grid = document.getElementById("menu-grid");
  const lista = catActiva === "Todos" ? platillos : platillos.filter(p => p.cat === catActiva);
  grid.innerHTML = lista.map((p, i) => `
    <div class="platillo-card" style="animation-delay:${i * 0.05}s" onclick="abrirModal(${p.id})">
      ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ""}
      <div class="card-emoji">${p.emoji}</div>
      <div class="card-body">
        <div class="card-top">
          <h3>${p.nombre}</h3>
          <span class="card-precio">$${p.precio}</span>
        </div>
        <p class="card-desc">${p.desc.substring(0, 80)}...</p>
        <span class="card-mas">Ver más →</span>
      </div>
    </div>
  `).join("");
}

function abrirModal(id) {
  const p = platillos.find(x => x.id === id);
  document.getElementById("modal-emoji").textContent = p.emoji;
  document.getElementById("modal-cat").textContent = p.cat;
  document.getElementById("modal-nombre").textContent = p.nombre;
  document.getElementById("modal-desc").textContent = p.desc;
  document.getElementById("modal-precio").textContent = `$${p.precio}`;
  document.getElementById("modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  document.getElementById("modal").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("modal-close").addEventListener("click", cerrarModal);
document.getElementById("modal-overlay").addEventListener("click", cerrarModal);
document.getElementById("btn-modal-reservar").addEventListener("click", cerrarModal);

document.getElementById("form-reserva").addEventListener("submit", e => {
  e.preventDefault();
  const inputs = e.target.querySelectorAll("input, select");
  const nombre = inputs[0].value;
  const fecha = inputs[2].value;
  const personas = inputs[3].value;
  const ocasion = inputs[4].value;
  let msg = `Hola! Quiero reservar una mesa en La Terraza.\n\nNombre: ${nombre}\nFecha: ${fecha}\nPersonas: ${personas}`;
  if (ocasion) msg += `\nOcasión: ${ocasion}`;
  window.open(`https://wa.me/5215512345678?text=${encodeURIComponent(msg)}`);
});

window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  nav.classList.toggle("scrolled", window.scrollY > 60);
});

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1800);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.1 });
document.querySelectorAll("section").forEach(s => observer.observe(s));

renderCats();
renderMenu();