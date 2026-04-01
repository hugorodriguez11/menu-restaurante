const platillos = [
  { id:1, nombre:"Guacamole artesanal", cat:"entradas", precio:120, emoji:"🥑", desc:"Aguacate Hass, jitomate, cebolla morada y chile serrano" },
  { id:2, nombre:"Sopa de lima", cat:"entradas", precio:95, emoji:"🍋", desc:"Caldo de pollo, lima yucateca y tostadas de maíz" },
  { id:3, nombre:"Tostadas de tinga", cat:"entradas", precio:110, emoji:"🌮", desc:"Tinga de pollo, crema, queso fresco y aguacate" },
  { id:4, nombre:"Mole negro oaxaqueño", cat:"principales", precio:220, emoji:"🍗", desc:"Pollo en mole negro con arroz rojo y frijoles de olla" },
  { id:5, nombre:"Filete al chipotle", cat:"principales", precio:280, emoji:"🥩", desc:"Filete de res con salsa de chipotle y papas cambray" },
  { id:6, nombre:"Enchiladas verdes", cat:"principales", precio:175, emoji:"🫔", desc:"Pollo, salsa verde, crema y queso Oaxaca" },
  { id:7, nombre:"Chiles en nogada", cat:"principales", precio:250, emoji:"🫑", desc:"Chile poblano, picadillo de temporada y nogada" },
  { id:8, nombre:"Pastel de tres leches", cat:"postres", precio:85, emoji:"🎂", desc:"Bizcocho esponjoso bañado en tres tipos de leche" },
  { id:9, nombre:"Churros con cajeta", cat:"postres", precio:75, emoji:"🍩", desc:"Churros crujientes con cajeta y chocolate caliente" },
  { id:10, nombre:"Agua de Jamaica", cat:"bebidas", precio:45, emoji:"🌺", desc:"Infusión de flor de jamaica con hierbabuena fresca" },
  { id:11, nombre:"Margarita clásica", cat:"bebidas", precio:120, emoji:"🍹", desc:"Tequila reposado, triple sec y limón, con sal" },
  { id:12, nombre:"Mezcal artesanal", cat:"bebidas", precio:140, emoji:"🥃", desc:"Mezcal de Oaxaca con naranja y sal de gusano" },
];

let categoriaActiva = "todos";

function renderMenu(cat) {
  const grid = document.getElementById("menu-grid");
  const filtrados = cat === "todos" ? platillos : platillos.filter(p => p.cat === cat);
  grid.innerHTML = filtrados.map(p => `
    <div class="card">
      <div class="card-emoji">${p.emoji}</div>
      <div class="card-body">
        <div class="card-top">
          <h3>${p.nombre}</h3>
          <span class="precio">$${p.precio}</span>
        </div>
        <p class="card-desc">${p.desc}</p>
        <span class="badge">${p.cat}</span>
      </div>
    </div>
  `).join("");
}

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderMenu(btn.dataset.cat);
  });
});

document.getElementById("form-reserva").addEventListener("submit", e => {
  e.preventDefault();
  const campos = e.target.querySelectorAll("input, select");
  const nombre = campos[0].value;
  const fecha = campos[2].value;
  const personas = campos[3].value;
  const msg = `Hola! Quiero reservar una mesa.\nNombre: ${nombre}\nFecha: ${fecha}\nPersonas: ${personas}`;
  window.open(`https://wa.me/5215512345678?text=${encodeURIComponent(msg)}`);
});

renderMenu("todos");