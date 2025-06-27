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

//Variáveis HTML
let cartas = [];
let linhas = [];
let grade = document.getElementById("gradeCartas");
let venceu;
const reiniciar = document.getElementById("reiniciar");
const dif = document.getElementById("dificuldade");
const opt = document.getElementById("opcoes");
const facil = document.getElementById("facil");
const medio = document.getElementById("medio");
const dificil = document.getElementById("dificil");
let rodadas = document.getElementById("turnos");
let encontrados = document.getElementById("paresEncontrados");
let restantes = document.getElementById("paresRestantes");

//Outras váriaveis
let qtdLinhas = 4;
let qtdColunas = 6;
let cartasViradas = 0;
let primeiraCarta, segundaCarta;
let qtdTurnos = 0;
let qtdEncontrados = 0;
let qtdRestantes = 12;

//Seleções de cartas para cada tamanho
let selecaoCartas12 = ["air-force-1-supreme-flax-1.jpg", "air-force-1-supreme-flax-1.jpg",
   "air-jordan-4-thunder-1.png", "air-jordan-4-thunder-1.png",
   "adidas-campus-00s-better-scarlet-1.jpg", "adidas-campus-00s-better-scarlet-1.jpg",
   "adidas-handball-spezial-lucid-blue-pink-1.jpg", "adidas-handball-spezial-lucid-blue-pink-1.jpg",
   "new-balance-530-white-palm-leaf-1.jpg", "new-balance-530-white-palm-leaf-1.jpg",
   "air-jordan-4-travis-scott-azul-1.jpg", "air-jordan-4-travis-scott-azul-1.jpg",
];
let selecaoCartas24 = ["air-force-1-supreme-flax-1.jpg", "air-force-1-supreme-flax-1.jpg",
   "air-jordan-4-thunder-1.png", "air-jordan-4-thunder-1.png",
   "air-jordan-4-red-cement-vermelho-1.jpg", "air-jordan-4-red-cement-vermelho-1.jpg",
   "adidas-handball-spezial-navy-gum-1.jpg", "adidas-handball-spezial-navy-gum-1.jpg",
   "adidas-campus-00s-better-scarlet-1.jpg", "adidas-campus-00s-better-scarlet-1.jpg",
   "adidas-handball-spezial-lucid-blue-pink-1.jpg", "adidas-handball-spezial-lucid-blue-pink-1.jpg",
   "new-balance-530-white-silver-navy-1.jpg", "new-balance-530-white-silver-navy-1.jpg",
   "new-balance-550-aime-leon-dore-brown-1.jpg", "new-balance-550-aime-leon-dore-brown-1.jpg",
   "new-balance-530-white-palm-leaf-1.jpg", "new-balance-530-white-palm-leaf-1.jpg",
   "adidas-yeezy-boost-350-onyx-1.jpg", "adidas-yeezy-boost-350-onyx-1.jpg",
   "tenis-adidas-yeezy-boost-350-zebra-1.jpg", "tenis-adidas-yeezy-boost-350-zebra-1.jpg",
   "air-jordan-4-travis-scott-azul-1.jpg", "air-jordan-4-travis-scott-azul-1.jpg",
];
let selecaoCartas40 = ["air-force-1-supreme-flax-1.jpg", "air-force-1-supreme-flax-1.jpg",
   "air-jordan-4-thunder-1.png", "air-jordan-4-thunder-1.png",
   "air-jordan-4-red-cement-vermelho-1.jpg", "air-jordan-4-red-cement-vermelho-1.jpg",
   "adidas-handball-spezial-navy-gum-1.jpg", "adidas-handball-spezial-navy-gum-1.jpg",
   "adidas-campus-00s-better-scarlet-1.jpg", "adidas-campus-00s-better-scarlet-1.jpg",
   "adidas-handball-spezial-lucid-blue-pink-1.jpg", "adidas-handball-spezial-lucid-blue-pink-1.jpg",
   "new-balance-530-white-silver-navy-1.jpg", "new-balance-530-white-silver-navy-1.jpg",
   "new-balance-550-aime-leon-dore-brown-1.jpg", "new-balance-550-aime-leon-dore-brown-1.jpg",
   "new-balance-530-white-palm-leaf-1.jpg", "new-balance-530-white-palm-leaf-1.jpg",
   "adidas-yeezy-boost-350-onyx-1.jpg", "adidas-yeezy-boost-350-onyx-1.jpg",
   "tenis-adidas-yeezy-boost-350-zebra-1.jpg", "tenis-adidas-yeezy-boost-350-zebra-1.jpg",
   "air-jordan-4-travis-scott-azul-1.jpg", "air-jordan-4-travis-scott-azul-1.jpg",
   "adidas-samba-og-silver-dawn-1.jpg", "adidas-samba-og-silver-dawn-1.jpg",
   "adidas-sambarose-valentine-1.jpg", "adidas-sambarose-valentine-1.jpg",
   "air-force-1-shadow-cashmere-1.jpg", "air-force-1-shadow-cashmere-1.jpg",
   "air-jordan-4-off-white-sail-1.jpg", "air-jordan-4-off-white-sail-1.jpg",
   "air-jordan-4-shimmer-1.jpg", "air-jordan-4-shimmer-1.jpg",
   "air-jordan-4-zen-master-1.jpg", "air-jordan-4-zen-master-1.jpg",
   "nike-air-jordan-4-wet-cement-1.png", "nike-air-jordan-4-wet-cement-1.png",
   "new-balance-550-white-dusk-blue-1.jpg", "new-balance-550-white-dusk-blue-1.jpg",
];

inicializar();

function inicializar() {

   //Define os tamanhos
   qtdColunas = localStorage.getItem("colunas");
   qtdLinhas = localStorage.getItem("linhas");
   if(!qtdColunas) {
      qtdColunas = 6;
      qtdLinhas = 4;
      localStorage.setItem("colunas", 6);
      localStorage.setItem("linhas", 4);
      localStorage.setItem("dificuldade", "Médio");
   }
   embaralhar();
   
   //Alterações HTML
   dif.innerHTML = localStorage.getItem("dificuldade") + '<i class="ri-arrow-down-s-line"></i>';
   grade.innerHTML = "";
   gerarGrade();

   //Event listeners das cartas
   cartas.forEach(carta => carta.addEventListener('click', viraCarta));
   
   //Inicializa as váriaveis de contagem
   qtdTurnos = 0;
   qtdEncontrados = 0;
   qtdRestantes = qtdColunas*qtdLinhas/2;
   cartasViradas = 0;

   //Termina alterações HTML
   rodadas.innerHTML = `Turnos: ${qtdTurnos}`;
   encontrados.innerHTML = `Pares encontrados: ${qtdEncontrados}`;
   restantes.innerHTML = `Pares restantes: ${qtdRestantes}`;
   linhas.forEach(linha => linha.classList.remove('borrado'));
}

function embaralhar() {
   if(qtdColunas == 4) {
      for (let i = 11; i > 0; i--) { 
         let j = Math.floor(Math.random() * 12); 
         [selecaoCartas12[i], selecaoCartas12[j]] = [selecaoCartas12[j], selecaoCartas12[i]]; 
      }
   }
   else if(qtdColunas == 6) {
      for (let i = 23; i > 0; i--) { 
         let j = Math.floor(Math.random() * 24); 
         [selecaoCartas24[i], selecaoCartas24[j]] = [selecaoCartas24[j], selecaoCartas24[i]]; 
      }
   }
   else {
      for (let i = 39; i > 0; i--) { 
         let j = Math.floor(Math.random() * 40); 
         [selecaoCartas40[i], selecaoCartas40[j]] = [selecaoCartas40[j], selecaoCartas40[i]]; 
      }
   }
}; 

function gerarGrade() {
   //Cria linha de cartas
   for(let i=0; i<qtdLinhas; i++) {
      const linhaCriada = document.createElement("div");
      grade.appendChild(linhaCriada);
      if(qtdColunas == 4) {
         linhaCriada.classList.add("linhaCartas12");
      }
      else if(qtdColunas == 6) {
         linhaCriada.classList.add("linhaCartas24");
      }
      else {
         linhaCriada.classList.add("linhaCartas40");
      }
      linhas.push(linhaCriada); //Adiciona a linha no vetor de linhas

      //Cria carta
      for(let j=0; j<qtdColunas; j++) {
         const cartaCriada = document.createElement("div");
         const imagemCarta = document.createElement("img");
         cartaCriada.innerHTML = '<i class="ri-planet-fill verso">';
         linhaCriada.appendChild(cartaCriada);
         cartaCriada.appendChild(imagemCarta);
         imagemCarta.classList.add("frente");

         //Adiciona imagem e a classe do tamanho
         if(qtdColunas == 4) {
            cartaCriada.classList.add("carta12");
            imagemCarta.src = "assets/imgs/products-imgs/" + selecaoCartas12[i*4+j];
         }
         else if(qtdColunas == 6) {
            cartaCriada.classList.add("carta24");
            imagemCarta.src = "assets/imgs/products-imgs/" + selecaoCartas24[i*6+j];
         }
         else {
            cartaCriada.classList.add("carta40");
            imagemCarta.src = "assets/imgs/products-imgs/" + selecaoCartas40[i*8+j];
         }
         cartas.push(cartaCriada); //Adiciona a carta no vetor de cartas
      }
   }
   //Cria e oculta a vitória
   venceu = document.createElement("div");
   venceu.innerHTML = "Você ganhou!";
   grade.appendChild(venceu);
   venceu.classList.add("vitoria");
   venceu.classList.add("invisivel");
}

function viraCarta() {
   if (cartasViradas < 2) {
      if(qtdColunas == 4) {
         this.classList.add('virado12');
         this.classList.remove("carta12");
      }
      else if(qtdColunas == 6) {
         this.classList.add('virado24');
         this.classList.remove('carta24');
      }
      else {
         this.classList.add('virado40');
         this.classList.remove("carta40");
      }
      if (cartasViradas === 0) {
         cartasViradas++;
         primeiraCarta = this;
         primeiraCarta.removeEventListener('click', viraCarta); //Impossibilita duplo click
      }
      else {
         segundaCarta = this;
         cartasViradas = 2;
         //Pega as imagens das cartas viradas e vê se são as mesmas
         const img1 = primeiraCarta.querySelector('.frente').src;
         const img2 = segundaCarta.querySelector('.frente').src;
         if(img1 === img2) { formouPar(); }
         else { desviraCartas(); }
         qtdTurnos++;
         segundaCarta.removeEventListener('click', viraCarta); //Impossibilita duplo click
         //Atualiza as informações exibidas
         rodadas.innerHTML = `Turnos: ${qtdTurnos}`;
         encontrados.innerHTML = `Pares encontrados: ${qtdEncontrados}`;
         restantes.innerHTML = `Pares restantes: ${qtdRestantes}`;
      }
   }
}

function formouPar() {
   qtdEncontrados++;
   qtdRestantes--;
   setTimeout((cartasViradas = 0), 500); //Da um intervalo
   if(qtdRestantes === 0) {
      setTimeout(exibirVitoria(), 500);
   }
}

function desviraCartas() {
   setTimeout(() => {
      if(qtdColunas == 4) {
         primeiraCarta.classList.add("carta12");
         segundaCarta.classList.add("carta12");
         primeiraCarta.classList.remove('virado12');
         segundaCarta.classList.remove('virado12');
      }
      else if(qtdColunas == 6) {
         primeiraCarta.classList.add('carta24');
         segundaCarta.classList.add('carta24');
         primeiraCarta.classList.remove('virado24');
         segundaCarta.classList.remove('virado24');
      }
      else {
         primeiraCarta.classList.add("carta40");
         segundaCarta.classList.add("carta40");
         primeiraCarta.classList.remove('virado40');
         segundaCarta.classList.remove('virado40');
      }
      primeiraCarta.addEventListener('click', viraCarta);
      segundaCarta.addEventListener('click', viraCarta);
      setTimeout((cartasViradas = 0), 500); //Dá tempo para as cartas virarem
   }, 700); //Dá um tempo para ver as cartas
}

function exibirVitoria () {
   venceu.classList.remove('invisivel');
   linhas.forEach(linha => linha.classList.add('borrado'));
}

function reinicia () {
   
}

reiniciar.addEventListener('click', () => {
   
   //Fecha o dropdown das dificuldades caso esteja aberto
   dif.classList.remove('virado2');
   opt.classList.add('invisivel');

   if(qtdRestantes == 0) {
      //Esconde o texto de vitória, caso esteja exibido, antes de reiniciar
      venceu.classList.add('invisivel'); 
      linhas.forEach(linha => linha.classList.remove('borrado'));

      setTimeout(inicializar, 500); //Dá um tempo para desborrar as cartas
   }
   else {
      inicializar();
   }
});

function mudancaTamanho () {
   //Remove as predefinições anteriores do localstorage
   localStorage.removeItem("colunas");
   localStorage.removeItem("linhas");
   localStorage.removeItem("dificuldade");

   //Fecha o dropdown
   dif.classList.remove('virado2');
   opt.classList.add('invisivel');
}

dif.addEventListener('click', () => {
   //Abre ou fecha o dropdown
   dif.classList.contains("virado2") ? dif.classList.remove('virado2') : dif.classList.add('virado2');
   opt.classList.contains("invisivel") ? opt.classList.remove('invisivel') : opt.classList.add('invisivel');
});
facil.addEventListener('click', () => {
   mudancaTamanho();

   //guarda no localstorage para mudar a grade
   localStorage.setItem("colunas", 4);
   localStorage.setItem("linhas", 3);
   localStorage.setItem("dificuldade", "Fácil");

   //mesmo esquema de reiniciar
   if(qtdRestantes == 0) {
      venceu.classList.add('invisivel');
      linhas.forEach(linha => linha.classList.remove('borrado'));
      setTimeout(inicializar, 500);
   }
   else {
      inicializar();
   }
});
medio.addEventListener('click', () => {
   mudancaTamanho();
   localStorage.setItem("colunas", 6);
   localStorage.setItem("linhas", 4);
   localStorage.setItem("dificuldade", "Médio");
   if(qtdRestantes == 0) {
      venceu.classList.add('invisivel');
      linhas.forEach(linha => linha.classList.remove('borrado'));
      setTimeout(inicializar, 500);
   }
   else {
      inicializar();
   }
});
dificil.addEventListener('click', () => {
   mudancaTamanho();
   localStorage.setItem("colunas", 8);
   localStorage.setItem("linhas", 5);
   localStorage.setItem("dificuldade", "Difícil");
   if(qtdRestantes == 0) {
      venceu.classList.add('invisivel');
      linhas.forEach(linha => linha.classList.remove('borrado'));
      setTimeout(inicializar, 500);
   }
   else {
      inicializar();
   }
});