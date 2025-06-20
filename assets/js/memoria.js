/* Dark mode / Light mode */

// Change theme and save current theme on click the theme button.
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
   // Change theme icon and theme on click theme button.
   themeBtn.classList.toggle("active-sun-icon");
   document.body.classList.toggle("light-theme");

   // Save theme icon and them on click theme button.
   const getCurrentIcon = () => themeBtn.classList.contains("active-sun-icon") ? "sun" : "moon";
   const getCurrentTheme = () => document.body.classList.contains("light-theme") ? "light" : "dark";

   localStorage.setItem("earth-saved-icon", getCurrentIcon());
   localStorage.setItem("earth-saved-theme", getCurrentTheme());
});

// Get saved theme icon and theme on document loaded.
const savedIcon = localStorage.getItem("earth-saved-icon");
const savedTheme = localStorage.getItem("earth-saved-theme");

document.addEventListener("DOMContentLoaded", () => {
   themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("active-sun-icon");
   document.body.classList[savedTheme === "light" ? "add" : "remove"]("light-theme");
});

// Jogo da Memória

const cartas = document.querySelectorAll('.carta24');
const imagens = document.querySelectorAll('.frente');
const reiniciar = document.getElementById

let temCartaVirada = false;
let primeiraCarta, segundaCarta;
let rodadas = document.getElementById("turnos");
let qtdTurnos = 0;
let encontrados = document.getElementById("paresEncontrados");
let qtdEncontrados = 0;
let restantes = document.getElementById("paresRestantes");
let qtdRestantes = 24;
let selecaoCartas = ["assets/imgs/products-imgs/air-force-1-supreme-flax-1.jpg",
   "assets/imgs/products-imgs/air-jordan-4-thunder-1.png",
   "assets/imgs/products-imgs/air-jordan-4-red-cement-vermelho-1.jpg",
   "assets/imgs/products-imgs/adidas-handball-spezial-navy-gum-1.jpg",
   "assets/imgs/products-imgs/adidas-campus-00s-better-scarlet-1.jpg",
   "assets/imgs/products-imgs/adidas-handball-spezial-lucid-blue-pink-1.jpg",
   "assets/imgs/products-imgs/new-balance-530-white-silver-navy-1.jpg",
   "assets/imgs/products-imgs/new-balance-550-aime-leon-dore-brown-1.jpg",
   "assets/imgs/products-imgs/new-balance-530-white-palm-leaf-1.jpg",
   "assets/imgs/products-imgs/adidas-yeezy-boost-350-onyx-1.jpg",
   "assets/imgs/products-imgs/tenis-adidas-yeezy-boost-350-zebra-1.jpg",
   "assets/imgs/products-imgs/air-jordan-4-travis-scott-azul-1.jpg",
   "assets/imgs/products-imgs/air-force-1-supreme-flax-1.jpg",
   "assets/imgs/products-imgs/air-jordan-4-thunder-1.png",
   "assets/imgs/products-imgs/air-jordan-4-red-cement-vermelho-1.jpg",
   "assets/imgs/products-imgs/adidas-handball-spezial-navy-gum-1.jpg",
   "assets/imgs/products-imgs/adidas-campus-00s-better-scarlet-1.jpg",
   "assets/imgs/products-imgs/adidas-handball-spezial-lucid-blue-pink-1.jpg",
   "assets/imgs/products-imgs/new-balance-530-white-silver-navy-1.jpg",
   "assets/imgs/products-imgs/new-balance-550-aime-leon-dore-brown-1.jpg",
   "assets/imgs/products-imgs/new-balance-530-white-palm-leaf-1.jpg",
   "assets/imgs/products-imgs/adidas-yeezy-boost-350-onyx-1.jpg",
   "assets/imgs/products-imgs/tenis-adidas-yeezy-boost-350-zebra-1.jpg",
   "assets/imgs/products-imgs/air-jordan-4-travis-scott-azul-1.jpg",
]
let ordemCartas = [];

inicializar();

function inicializar() {
   embaralhar();
   for(imagem in imagens) {
      imagens[imagem].src = `${selecaoCartas[imagem]}`
      ordemCartas.push(imagem%12);
   }
   
   qtdTurnos = 0;
   qtdEncontrados = 0;
   qtdRestantes = 0;

   rodadas.innerHTML = `Turnos: ${qtdTurnos}`;
   encontrados.innerHTML = `Pares encontrados: ${qtdEncontrados}`;
   restantes.innerHTML = `Pares restantes: ${qtdRestantes}`;
}

function embaralhar() {
   for (let i = selecaoCartas.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [selecaoCartas[i], selecaoCartas[j]] = [selecaoCartas[j], selecaoCartas[i]]; 
   } 
}; 


function viraCarta() {
   this.classList.add('virado');

   if (!temCartaVirada) {
      temCartaVirada = true;
      primeiraCarta = this;
      primeiraCarta.removeEventListener('click', viraCarta);
   }
   else {
      segundaCarta = this;
      temCartaVirada = false;
      let formaPar = firstCard.dataset.framework === secondCard.dataset.framework;
      formaPar ? formou() : desviraCartas();
      qtdTurnos++;
      segundaCarta.removeEventListener('click', viraCarta);
      rodadas.innerHTML = `Turnos: ${qtdTurnos}`;
      encontrados.innerHTML = `Pares encontrados: ${qtdEncontrados}`;
      restantes.innerHTML = `Pares restantes: ${qtdRestantes}`;
   }
}

function formou() {
   qtdEncontrados++;
   qtdRestantes--;
}

function desviraCartas() {
   setTimeout(() => {
     firstCard.classList.remove('virado');
     secondCard.classList.remove('virado');
     firstCard.addEventListener('click', viraCarta);
     secondCard.addEventListener('click', viraCarta);
   }, 1500);
}


cartas.forEach(carta => carta.addEventListener('click', viraCarta));