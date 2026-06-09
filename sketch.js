function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// Variáveis do Jogo
let jogadorX;
let jogadorY;
let jogadorLargura = 80;
let jogadorAltura = 20;
let jogadorVelocidade = 7;

let gotaX, gotaY;
let gotaVelocidade = 4;
let gotaTamanho = 15;

let lagartaX, lagartaY;
let lagartaVelocidade = 5;
let lagartaTamanho = 20;

let pontos = 0;
let vidas = 3;
let jogoAcabou = false;

function setup() {
  createCanvas(600, 400);
  resetarGota();
  resetarLagarta();
  
  // Posição inicial do jogador (na parte inferior da tela)
  jogadorX = width / 2 - jogadorLargura / 2;
  jogadorY = height - 40;
}

function draw() {
  // Fundo verde lembrando o campo/agricultura
  background(135, 206, 235); // Céu azul
  
  // Gramado/Solo
  fill(34, 139, 34);
  rect(0, height - 30, width, 30);

  if (!jogoAcabou) {
    jogar();
  } else {
    telaGameOver();
  }
}

function jogar() {
  // --- MOVIMENTAÇÃO DO JOGADOR ---
  if (keyIsDown(LEFT_ARROW) && jogadorX > 0) {
    jogadorX -= jogadorVelocidade;
  }
  if (keyIsDown(RIGHT_ARROW) && jogadorX < width - jogadorLargura) {
    jogadorX += jogadorVelocidade;
  }

  // --- DESENHAR JOGADOR (Cesta/Balde de Água) ---
  fill(139, 69, 19); // Marrom
  rect(jogadorX, jogadorY, jogadorLargura, jogadorAltura, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  text("ÁGUA", jogadorX + jogadorLargura/2, jogadorY + jogadorAltura/2);

  // --- MOVIMENTAÇÃO E DESENHO DA GOTA (Objetivo Positivo) ---
  gotaY += gotaVelocidade;
  fill(0, 191, 255); // Azul gota
  ellipse(gotaX, gotaY, gotaTamanho, gotaTamanho + 5);

  // --- MOVIMENTAÇÃO E DESENHO DA LAGARTA (Obstáculo) ---
  lagartaY += lagartaVelocidade;
  fill(50, 205, 50); // Verde lagarta
  ellipse(lagartaX, lagartaY, lagartaTamanho, lagartaTamanho);
  // Detalhe da lagarta
  fill(0);
  ellipse(lagartaX + 4, lagartaY - 2, 3, 3); 

  // --- DETECÇÃO DE COLISÃO: GOTA ---
  if (gotaY + gotaTamanho/2 >= jogadorY && 
      gotaX >= jogadorX && 
      gotaX <= jogadorX + jogadorLargura) {
    pontos += 10;
    gotaVelocidade += 0.2; // Aumenta a dificuldade levemente
    resetarGota();
  }

  // --- DETECÇÃO DE COLISÃO: LAGARTA ---
  if (lagartaY + lagartaTamanho/2 >= jogadorY && 
      lagartaX >= jogadorX && 
      lagartaX <= jogadorX + jogadorLargura) {
    vidas -= 1;
    resetarLagarta();
    if (vidas <= 0) {
      jogoAcabou = true;
    }
  }

  // --- VERIFICAR SE PERDEU A GOTA OU A LAGARTA PASSOU ---
  if (gotaY > height) {
    resetarGota();
  }
  if (lagartaY > height) {
    resetarLagarta();
  }

  // --- INTERFACE (PONTOS E VIDAS) ---
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text("Pontos: " + pontos, 20, 30);
  textAlign(RIGHT);
  text("Vidas: " + vidas, width - 20, 30);
}

function resetarGota() {
  gotaX = random(20, width - 20);
  gotaY = random(-100, -10);
}

function resetarLagarta() {
  lagartaX = random(20, width - 20);
  lagartaY = random(-200, -50); // Vem um pouco mais de cima para não coincidir sempre com a gota
}

function telaGameOver() {
  background(0, 0, 0, 150); // Fundo escurecido
  
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("FIM DE JOGO", width / 2, height / 2 - 40);
  
  textSize(20);
  text("Você ajudou a proteger a plantação!", width / 2, height / 2);
  text("Pontuação Final: " + pontos, width / 2, height / 2 + 30);
  
  textSize(14);
  text("Pressione ESPAÇO para reiniciar", width / 2, height / 2 + 80);
}

function keyPressed() {
  // Reiniciar o jogo se estiver na tela de Game Over e pressionar Espaço
  if (jogoAcabou && keyCode === 32) {
    pontos = 0;
    vidas = 3;
    gotaVelocidade = 4;
    jogoAcabou = false;
    resetarGota();
    resetarLagarta();
  }
}
