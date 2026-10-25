#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

// =====================================================
// WIFI
// =====================================================

const char* ssid = "SmartLink";
const char* password = "khonekhan";

ESP8266WebServer server(80);


// =====================================================
// COMPLETE WEBSITE + GAMES
// =====================================================

const char WEBSITE[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover">

<title>Arcade Node</title>

<style>

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html {
  background: #07090c;
}

body {
  margin: 0;
  min-height: 100vh;

  background: #07090c;
  color: #f5f7fa;

  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Arial,
    sans-serif;
}

button,
a {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

.shell {
  width: min(1120px, calc(100% - 28px));
  margin: auto;
  padding: 22px 0 50px;
}


/* =====================================================
   TOP BAR
===================================================== */

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  padding: 14px 16px;

  border: 1px solid rgba(255,255,255,.10);
  background: rgba(18,22,28,.72);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  border-radius: 18px;
}

.brand {
  font-weight: 800;
  font-size: 14px;

  letter-spacing: 3px;

  color: rgba(255,255,255,.95);
}

.network {
  color: #9ba6b5;
  font-size: 12px;

  padding: 8px 11px;

  border-radius: 30px;

  border: 1px solid rgba(255,255,255,.09);

  background: rgba(255,255,255,.025);
}


/* =====================================================
   HERO
===================================================== */

.hero {
  padding: 64px 4px 36px;
}

.eyebrow {
  color: #8c98a8;

  font-size: 12px;
  font-weight: 700;

  letter-spacing: 2.5px;

  margin-bottom: 15px;
}

.hero h1 {
  margin: 0;

  max-width: 760px;

  font-size: clamp(42px, 7vw, 76px);
  line-height: .98;

  letter-spacing: -3px;

  color: rgba(255,255,255,.96);

  text-shadow:
    0 1px 0 rgba(255,255,255,.18),
    0 18px 40px rgba(0,0,0,.45);
}

.hero p {
  max-width: 650px;

  margin-top: 22px;

  color: #929dac;

  font-size: 16px;
  line-height: 1.75;
}


/* =====================================================
   GAME CARDS
===================================================== */

.games {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 16px;
}

.gameCard {
  min-height: 230px;

  padding: 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 22px;

  background: rgba(17,21,27,.76);

  border: 1px solid rgba(255,255,255,.10);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  transition:
    transform .2s ease,
    border-color .2s ease,
    background .2s ease;
}

.gameCard:hover {
  transform: translateY(-3px);

  border-color: rgba(255,255,255,.22);

  background: rgba(21,26,33,.82);
}

.gameNo {
  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  border-radius: 12px;

  border: 1px solid rgba(255,255,255,.12);

  color: #a9b2bf;

  font-size: 12px;
  font-weight: 800;
}

.gameCard h2 {
  margin: 28px 0 8px;

  font-size: 30px;

  letter-spacing: -1px;
}

.gameCard p {
  margin: 0;

  color: #8f9baa;

  line-height: 1.6;
}

.openGame {
  margin-top: 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: rgba(255,255,255,.90);

  font-size: 13px;
  font-weight: 700;

  letter-spacing: .7px;
}


/* =====================================================
   GAME SCREEN
===================================================== */

.gameHeader {
  padding: 38px 2px 22px;

  display: flex;
  justify-content: space-between;
  align-items: end;

  gap: 20px;
}

.gameHeader h1 {
  margin: 0;

  font-size: clamp(34px, 6vw, 60px);

  letter-spacing: -2px;
}

.gameHeader p {
  margin: 9px 0 0;

  color: #929dac;
}

.back {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-width: 90px;
  height: 44px;

  padding: 0 16px;

  border-radius: 13px;

  border: 1px solid rgba(255,255,255,.11);

  background: rgba(255,255,255,.035);

  color: #d9dee5;

  font-size: 13px;

  cursor: pointer;
}


/* =====================================================
   GAME PANEL
===================================================== */

.gamePanel {
  overflow: hidden;

  border-radius: 24px;

  border: 1px solid rgba(255,255,255,.11);

  background: rgba(14,18,23,.84);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.gameInfo {
  min-height: 56px;

  padding: 13px 17px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;

  border-bottom: 1px solid rgba(255,255,255,.08);

  color: #96a1af;

  font-size: 13px;
}

.gameInfo strong {
  color: white;
}

.canvasWrap {
  padding: 12px;
}

canvas {
  display: block;

  width: 100%;

  border-radius: 15px;

  background: #090c10;

  touch-action: none;
}


/* =====================================================
   BUTTONS
===================================================== */

.controls {
  display: flex;

  flex-wrap: wrap;

  justify-content: center;

  gap: 10px;

  padding: 0 12px 14px;
}

.controlBtn {
  min-width: 70px;
  min-height: 48px;

  padding: 0 18px;

  border: 1px solid rgba(255,255,255,.12);

  border-radius: 14px;

  background: rgba(255,255,255,.045);

  color: #f7f8fa;

  font-weight: 700;

  cursor: pointer;

  user-select: none;

  transition:
    transform .12s ease,
    background .12s ease;
}

.controlBtn:active {
  transform: scale(.95);

  background: rgba(255,255,255,.10);
}


/* =====================================================
   REACTION GAME
===================================================== */

.reactionBox {
  min-height: 430px;

  display: grid;
  place-items: center;

  padding: 25px;

  text-align: center;

  cursor: pointer;

  user-select: none;
}

.reactionInner {
  max-width: 520px;
}

.reactionState {
  font-size: clamp(48px, 10vw, 94px);

  font-weight: 900;

  letter-spacing: -4px;
}

.reactionText {
  color: #919caa;

  margin-top: 16px;

  line-height: 1.6;
}

.reactionReady {
  color: #d6b869;
}


/* =====================================================
   SNAKE BUTTON GRID
===================================================== */

.dpad {
  display: grid;

  grid-template-columns:
    repeat(3, 58px);

  grid-template-rows:
    repeat(2, 52px);

  justify-content: center;

  gap: 7px;

  padding-bottom: 16px;
}

.dpad button:nth-child(1) {
  grid-column: 2;
}

.dpad button:nth-child(2) {
  grid-column: 1;
  grid-row: 2;
}

.dpad button:nth-child(3) {
  grid-column: 2;
  grid-row: 2;
}

.dpad button:nth-child(4) {
  grid-column: 3;
  grid-row: 2;
}


/* =====================================================
   FOOTER
===================================================== */

.footer {
  margin-top: 34px;

  padding: 20px 3px;

  display: flex;
  justify-content: space-between;

  gap: 20px;

  color: #626d7a;

  font-size: 12px;
}


/* =====================================================
   MOBILE
===================================================== */

@media(max-width:720px) {

  .shell {
    width: min(100% - 18px, 1120px);
    padding-top: 10px;
  }

  .topbar {
    border-radius: 15px;
  }

  .network {
    max-width: 150px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hero {
    padding-top: 45px;
  }

  .hero h1 {
    letter-spacing: -2px;
  }

  .games {
    grid-template-columns: 1fr;
  }

  .gameCard {
    min-height: 200px;
  }

  .gameHeader {
    align-items: flex-start;
    flex-direction: column;
  }

  .gameHeader .back {
    order: -1;
  }

  .gameInfo {
    align-items: flex-start;
    flex-direction: column;
  }

  .reactionBox {
    min-height: 360px;
  }

}


@media(max-width:420px) {

  .brand {
    font-size: 12px;
    letter-spacing: 2px;
  }

  .gameCard {
    padding: 20px;
  }

  .canvasWrap {
    padding: 7px;
  }

}

</style>

</head>


<body>

<div class="shell">

  <div class="topbar">

    <a class="brand" href="/">
      ARCADE NODE
    </a>

    <div class="network" id="network">
      WEMOS D1 MINI
    </div>

  </div>


  <main id="app"></main>


  <div class="footer">

    <span>ESP8266 LOCAL ARCADE</span>

    <span id="host"></span>

  </div>

</div>


<script>

// =====================================================
// BASE
// =====================================================

const app = document.getElementById("app");

document.getElementById("host").textContent =
  location.host;

document.getElementById("network").textContent =
  location.host + " • ONLINE";


const path =
  location.pathname.replace(/\/+$/, "") || "/";


// =====================================================
// HOME
// =====================================================

function home() {

  app.innerHTML = `

    <section class="hero">

      <div class="eyebrow">
        LOCAL NETWORK EXPERIENCE
      </div>

      <h1>
        Games living inside your WeMos.
      </h1>

      <p>
        A compact browser arcade served directly from the
        ESP8266. No internet, downloads or external assets required.
      </p>

    </section>


    <section class="games">

      <a class="gameCard" href="/dino">

        <div>

          <div class="gameNo">01</div>

          <h2>Dino Run</h2>

          <p>
            Jump over incoming obstacles and push your score
            as far as possible.
          </p>

        </div>

        <div class="openGame">
          PLAY DINO
          <span>→</span>
        </div>

      </a>


      <a class="gameCard" href="/snake">

        <div>

          <div class="gameNo">02</div>

          <h2>Snake</h2>

          <p>
            Classic grid movement rebuilt for keyboard,
            swipe and mobile controls.
          </p>

        </div>

        <div class="openGame">
          PLAY SNAKE
          <span>→</span>
        </div>

      </a>


      <a class="gameCard" href="/pong">

        <div>

          <div class="gameNo">03</div>

          <h2>Mono Pong</h2>

          <p>
            Control the left paddle against an adaptive
            computer opponent.
          </p>

        </div>

        <div class="openGame">
          PLAY PONG
          <span>→</span>
        </div>

      </a>


      <a class="gameCard" href="/reaction">

        <div>

          <div class="gameNo">04</div>

          <h2>Reaction</h2>

          <p>
            Wait for the signal and measure exactly how
            quickly you can react.
          </p>

        </div>

        <div class="openGame">
          START TEST
          <span>→</span>
        </div>

      </a>

    </section>

  `;
}


// =====================================================
// GENERIC GAME HEADER
// =====================================================

function gameLayout(title, description, content) {

  app.innerHTML = `

    <section class="gameHeader">

      <div>

        <h1>${title}</h1>

        <p>${description}</p>

      </div>

      <a href="/" class="back">
        ← Arcade
      </a>

    </section>

    ${content}

  `;
}


// =====================================================
// DINO
// =====================================================

function dinoGame() {

  gameLayout(
    "Dino Run",
    "Space, tap or click to jump.",

    `

    <div class="gamePanel">

      <div class="gameInfo">

        <span>
          SCORE:
          <strong id="score">0</strong>
        </span>

        <span id="dinoStatus">
          TAP TO START
        </span>

      </div>

      <div class="canvasWrap">

        <canvas
          id="dinoCanvas"
          width="900"
          height="320">
        </canvas>

      </div>

      <div class="controls">

        <button
          class="controlBtn"
          id="jumpBtn">

          JUMP

        </button>

      </div>

    </div>

    `
  );


  const canvas =
    document.getElementById("dinoCanvas");

  const ctx =
    canvas.getContext("2d");

  const scoreEl =
    document.getElementById("score");

  const statusEl =
    document.getElementById("dinoStatus");


  let player;
  let obstacles;

  let speed;
  let score;

  let running = false;
  let dead = false;

  let spawnTimer = 0;
  let previous = 0;


  function reset() {

    player = {
      x: 100,
      y: 230,
      w: 38,
      h: 46,
      vy: 0,
      grounded: true
    };

    obstacles = [];

    speed = 7;

    score = 0;

    spawnTimer = 700;

    dead = false;

    running = true;

    scoreEl.textContent = "0";

    statusEl.textContent =
      "RUNNING";
  }


  function jump() {

    if (!running || dead) {

      reset();
      return;
    }

    if (player.grounded) {

      player.vy = -15;
      player.grounded = false;

    }

  }


  function collision(a,b) {

    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );

  }


  function drawPlayer() {

    ctx.fillStyle = "#f1f3f5";

    ctx.fillRect(
      player.x,
      player.y,
      player.w,
      player.h
    );

    ctx.fillStyle = "#090c10";

    ctx.fillRect(
      player.x + 25,
      player.y + 9,
      5,
      5
    );

    ctx.fillStyle = "#f1f3f5";

    ctx.fillRect(
      player.x - 12,
      player.y + 20,
      16,
      11
    );

  }


  function draw() {

    ctx.fillStyle = "#090c10";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    ctx.strokeStyle =
      "rgba(255,255,255,.14)";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(0,276);
    ctx.lineTo(canvas.width,276);

    ctx.stroke();


    drawPlayer();


    ctx.fillStyle = "#c4a05b";

    obstacles.forEach(o => {

      ctx.fillRect(
        o.x,
        o.y,
        o.w,
        o.h
      );

    });


    if (dead) {

      ctx.fillStyle =
        "rgba(7,9,12,.70)";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      ctx.fillStyle = "#ffffff";

      ctx.textAlign = "center";

      ctx.font =
        "700 34px Arial";

      ctx.fillText(
        "RUN ENDED",
        canvas.width / 2,
        140
      );


      ctx.fillStyle = "#9aa5b3";

      ctx.font =
        "16px Arial";

      ctx.fillText(
        "Tap to restart",
        canvas.width / 2,
        178
      );

    }

  }


  function frame(time) {

    const dt =
      Math.min(35, time - previous);

    previous = time;


    if (running && !dead) {

      player.vy += .82;

      player.y += player.vy;


      if (player.y >= 230) {

        player.y = 230;

        player.vy = 0;

        player.grounded = true;

      }


      spawnTimer -= dt;


      if (spawnTimer <= 0) {

        const height =
          35 + Math.random() * 45;

        obstacles.push({

          x: canvas.width + 20,

          y: 276 - height,

          w: 20 + Math.random() * 18,

          h: height

        });


        spawnTimer =
          850 + Math.random() * 850;

      }


      obstacles.forEach(o => {
        o.x -= speed;
      });


      obstacles =
        obstacles.filter(o =>
          o.x + o.w > -20
        );


      for (const o of obstacles) {

        if (collision(player,o)) {

          dead = true;

          running = false;

          statusEl.textContent =
            "GAME OVER";

        }

      }


      score += dt * .014;

      speed =
        7 + Math.min(6, score / 80);

      scoreEl.textContent =
        Math.floor(score);

    }


    draw();

    requestAnimationFrame(frame);

  }


  document
    .getElementById("jumpBtn")
    .addEventListener("click", jump);


  canvas.addEventListener(
    "pointerdown",
    jump
  );


  window.addEventListener(
    "keydown",
    e => {

      if (
        e.code === "Space" ||
        e.code === "ArrowUp"
      ) {

        e.preventDefault();

        jump();

      }

    }
  );


  reset();

  requestAnimationFrame(frame);

}


// =====================================================
// SNAKE
// =====================================================

function snakeGame() {

  gameLayout(
    "Snake",
    "Arrow keys, swipe or use the controls.",

    `

    <div class="gamePanel">

      <div class="gameInfo">

        <span>
          SCORE:
          <strong id="snakeScore">0</strong>
        </span>

        <span id="snakeStatus">
          ACTIVE
        </span>

      </div>

      <div
        class="canvasWrap"
        style="max-width:560px;margin:auto;">

        <canvas
          id="snakeCanvas"
          width="600"
          height="600">
        </canvas>

      </div>


      <div class="dpad">

        <button class="controlBtn" data-dir="up">
          ↑
        </button>

        <button class="controlBtn" data-dir="left">
          ←
        </button>

        <button class="controlBtn" data-dir="down">
          ↓
        </button>

        <button class="controlBtn" data-dir="right">
          →
        </button>

      </div>

    </div>

    `
  );


  const canvas =
    document.getElementById("snakeCanvas");

  const ctx =
    canvas.getContext("2d");

  const scoreEl =
    document.getElementById("snakeScore");

  const statusEl =
    document.getElementById("snakeStatus");


  const cells = 20;

  const size =
    canvas.width / cells;


  let snake;
  let food;

  let direction;
  let nextDirection;

  let score;

  let interval;

  let touchStartX = 0;
  let touchStartY = 0;


  function randomFood() {

    return {

      x:
        Math.floor(Math.random()*cells),

      y:
        Math.floor(Math.random()*cells)

    };

  }


  function reset() {

    snake = [

      {x:10,y:10},
      {x:9,y:10},
      {x:8,y:10}

    ];

    direction = {
      x:1,
      y:0
    };

    nextDirection = {
      x:1,
      y:0
    };

    food =
      randomFood();

    score = 0;

    scoreEl.textContent = "0";

    statusEl.textContent =
      "ACTIVE";


    clearInterval(interval);

    interval =
      setInterval(step,115);

    draw();

  }


  function setDirection(x,y) {

    if (
      direction.x + x === 0 &&
      direction.y + y === 0
    ) return;

    nextDirection = {x,y};

  }


  function step() {

    direction =
      nextDirection;


    const head = {

      x:
        snake[0].x + direction.x,

      y:
        snake[0].y + direction.y

    };


    if (

      head.x < 0 ||
      head.y < 0 ||
      head.x >= cells ||
      head.y >= cells ||

      snake.some(
        p =>
          p.x === head.x &&
          p.y === head.y
      )

    ) {

      statusEl.textContent =
        "TAP BOARD TO RESTART";

      clearInterval(interval);

      interval = null;

      return;

    }


    snake.unshift(head);


    if (
      head.x === food.x &&
      head.y === food.y
    ) {

      score++;

      scoreEl.textContent =
        score;

      do {

        food = randomFood();

      }

      while (
        snake.some(
          p =>
            p.x === food.x &&
            p.y === food.y
        )
      );

    }

    else {

      snake.pop();

    }


    draw();

  }


  function draw() {

    ctx.fillStyle =
      "#090c10";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    ctx.strokeStyle =
      "rgba(255,255,255,.035)";


    for(let i=0;i<=cells;i++) {

      ctx.beginPath();

      ctx.moveTo(i*size,0);
      ctx.lineTo(i*size,canvas.height);

      ctx.stroke();


      ctx.beginPath();

      ctx.moveTo(0,i*size);
      ctx.lineTo(canvas.width,i*size);

      ctx.stroke();

    }


    snake.forEach(
      (p,index) => {

        ctx.fillStyle =
          index === 0
          ? "#ffffff"
          : "#aeb6c0";

        ctx.fillRect(

          p.x*size + 3,
          p.y*size + 3,

          size - 6,
          size - 6

        );

      }
    );


    ctx.fillStyle =
      "#c9a85e";

    ctx.beginPath();

    ctx.arc(

      food.x*size + size/2,
      food.y*size + size/2,

      size*.32,

      0,
      Math.PI*2

    );

    ctx.fill();

  }


  window.addEventListener(
    "keydown",
    e => {

      if(e.key==="ArrowUp")
        setDirection(0,-1);

      if(e.key==="ArrowDown")
        setDirection(0,1);

      if(e.key==="ArrowLeft")
        setDirection(-1,0);

      if(e.key==="ArrowRight")
        setDirection(1,0);

    }
  );


  document
    .querySelectorAll("[data-dir]")
    .forEach(btn => {

      btn.addEventListener(
        "click",
        () => {

          const d =
            btn.dataset.dir;

          if(d==="up")
            setDirection(0,-1);

          if(d==="down")
            setDirection(0,1);

          if(d==="left")
            setDirection(-1,0);

          if(d==="right")
            setDirection(1,0);

        }
      );

    });


  canvas.addEventListener(
    "pointerdown",
    e => {

      if(!interval) {

        reset();
        return;

      }

      touchStartX =
        e.clientX;

      touchStartY =
        e.clientY;

    }
  );


  canvas.addEventListener(
    "pointerup",
    e => {

      if(!interval) return;


      const dx =
        e.clientX - touchStartX;

      const dy =
        e.clientY - touchStartY;


      if(
        Math.abs(dx) >
        Math.abs(dy)
      ) {

        if(dx > 25)
          setDirection(1,0);

        if(dx < -25)
          setDirection(-1,0);

      }

      else {

        if(dy > 25)
          setDirection(0,1);

        if(dy < -25)
          setDirection(0,-1);

      }

    }
  );


  reset();

}


// =====================================================
// PONG
// =====================================================

function pongGame() {

  gameLayout(
    "Mono Pong",
    "Move your paddle with touch, mouse or arrow keys.",

    `

    <div class="gamePanel">

      <div class="gameInfo">

        <span>
          YOU:
          <strong id="playerScore">0</strong>
        </span>

        <span>
          CPU:
          <strong id="cpuScore">0</strong>
        </span>

      </div>

      <div class="canvasWrap">

        <canvas
          id="pongCanvas"
          width="900"
          height="480">
        </canvas>

      </div>


      <div class="controls">

        <button
          class="controlBtn"
          id="pongUp">
          ↑ UP
        </button>

        <button
          class="controlBtn"
          id="pongDown">
          ↓ DOWN
        </button>

      </div>

    </div>

    `
  );


  const canvas =
    document.getElementById("pongCanvas");

  const ctx =
    canvas.getContext("2d");


  let playerScore = 0;
  let cpuScore = 0;


  const paddle = {

    x:30,
    y:190,

    w:14,
    h:100

  };


  const cpu = {

    x:856,
    y:190,

    w:14,
    h:100

  };


  const ball = {

    x:450,
    y:240,

    r:9,

    vx:7,
    vy:4

  };


  let moveUp = false;
  let moveDown = false;


  function resetBall(direction) {

    ball.x = 450;
    ball.y = 240;

    ball.vx =
      direction * 7;

    ball.vy =
      (Math.random()*.8-.4)*8;

  }


  function paddleHit(p) {

    return (

      ball.x + ball.r > p.x &&

      ball.x - ball.r <
      p.x + p.w &&

      ball.y + ball.r > p.y &&

      ball.y - ball.r <
      p.y + p.h

    );

  }


  function update() {

    if(moveUp)
      paddle.y -= 8;

    if(moveDown)
      paddle.y += 8;


    paddle.y =
      Math.max(
        0,
        Math.min(
          canvas.height-paddle.h,
          paddle.y
        )
      );


    cpu.y +=
      (
        ball.y -
        (cpu.y + cpu.h/2)
      ) * .075;


    cpu.y =
      Math.max(
        0,
        Math.min(
          canvas.height-cpu.h,
          cpu.y
        )
      );


    ball.x += ball.vx;
    ball.y += ball.vy;


    if(

      ball.y-ball.r <= 0 ||
      ball.y+ball.r >=
      canvas.height

    ) {

      ball.vy *= -1;

    }


    if(

      paddleHit(paddle) &&
      ball.vx < 0

    ) {

      ball.vx =
        Math.abs(ball.vx) * 1.025;

      ball.vy +=
        (
          ball.y -
          (
            paddle.y +
            paddle.h/2
          )
        ) * .05;

    }


    if(

      paddleHit(cpu) &&
      ball.vx > 0

    ) {

      ball.vx =
        -Math.abs(ball.vx)*1.025;

    }


    if(ball.x < -30) {

      cpuScore++;

      document
        .getElementById("cpuScore")
        .textContent = cpuScore;

      resetBall(1);

    }


    if(ball.x > canvas.width+30) {

      playerScore++;

      document
        .getElementById("playerScore")
        .textContent =
        playerScore;

      resetBall(-1);

    }

  }


  function draw() {

    ctx.fillStyle =
      "#090c10";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    ctx.strokeStyle =
      "rgba(255,255,255,.15)";

    ctx.setLineDash([10,12]);

    ctx.beginPath();

    ctx.moveTo(
      canvas.width/2,
      0
    );

    ctx.lineTo(
      canvas.width/2,
      canvas.height
    );

    ctx.stroke();

    ctx.setLineDash([]);


    ctx.fillStyle =
      "#ffffff";

    ctx.fillRect(
      paddle.x,
      paddle.y,
      paddle.w,
      paddle.h
    );


    ctx.fillStyle =
      "#aeb5bf";

    ctx.fillRect(
      cpu.x,
      cpu.y,
      cpu.w,
      cpu.h
    );


    ctx.fillStyle =
      "#c7a45b";

    ctx.beginPath();

    ctx.arc(
      ball.x,
      ball.y,
      ball.r,
      0,
      Math.PI*2
    );

    ctx.fill();

  }


  function loop() {

    update();
    draw();

    requestAnimationFrame(loop);

  }


  window.addEventListener(
    "keydown",
    e => {

      if(
        e.key === "ArrowUp"
      ) moveUp = true;

      if(
        e.key === "ArrowDown"
      ) moveDown = true;

    }
  );


  window.addEventListener(
    "keyup",
    e => {

      if(
        e.key === "ArrowUp"
      ) moveUp = false;

      if(
        e.key === "ArrowDown"
      ) moveDown = false;

    }
  );


  const up =
    document.getElementById("pongUp");

  const down =
    document.getElementById("pongDown");


  up.addEventListener(
    "pointerdown",
    () => moveUp = true
  );

  up.addEventListener(
    "pointerup",
    () => moveUp = false
  );


  down.addEventListener(
    "pointerdown",
    () => moveDown = true
  );

  down.addEventListener(
    "pointerup",
    () => moveDown = false
  );


  canvas.addEventListener(
    "pointermove",
    e => {

      if(
        e.buttons === 0 &&
        e.pointerType === "mouse"
      ) return;


      const rect =
        canvas.getBoundingClientRect();

      const y =
        (
          e.clientY -
          rect.top
        )
        /
        rect.height
        *
        canvas.height;


      paddle.y =
        y - paddle.h/2;

    }
  );


  requestAnimationFrame(loop);

}


// =====================================================
// REACTION
// =====================================================

function reactionGame() {

  gameLayout(
    "Reaction",
    "Wait for GO. Tapping early counts as a false start.",

    `

    <div class="gamePanel">

      <div class="gameInfo">

        <span>
          BEST:
          <strong id="bestReaction">
            --
          </strong>
        </span>

        <span>
          TEST YOUR REFLEX
        </span>

      </div>


      <div
        class="reactionBox"
        id="reactionBox">

        <div class="reactionInner">

          <div
            class="reactionState"
            id="reactionState">

            READY

          </div>

          <div
            class="reactionText"
            id="reactionText">

            Tap anywhere to begin.

          </div>

        </div>

      </div>

    </div>

    `
  );


  const box =
    document.getElementById(
      "reactionBox"
    );

  const state =
    document.getElementById(
      "reactionState"
    );

  const text =
    document.getElementById(
      "reactionText"
    );

  const bestEl =
    document.getElementById(
      "bestReaction"
    );


  let mode = "idle";

  let timer = null;

  let startTime = 0;

  let best = null;


  function arm() {

    mode = "waiting";

    state.textContent =
      "WAIT";

    state.classList.remove(
      "reactionReady"
    );

    text.textContent =
      "Do not tap yet.";


    timer =
      setTimeout(
        () => {

          mode = "go";

          startTime =
            performance.now();

          state.textContent =
            "GO";

          state.classList.add(
            "reactionReady"
          );

          text.textContent =
            "Tap now.";

        },

        1300 +
        Math.random()*2600
      );

  }


  box.addEventListener(
    "pointerdown",
    () => {

      if(mode === "idle") {

        arm();
        return;

      }


      if(mode === "waiting") {

        clearTimeout(timer);

        mode = "idle";

        state.textContent =
          "TOO SOON";

        text.textContent =
          "False start. Tap to try again.";

        return;

      }


      if(mode === "go") {

        const result =
          Math.round(
            performance.now() -
            startTime
          );


        if(
          best === null ||
          result < best
        ) {

          best = result;

          bestEl.textContent =
            best + " ms";

        }


        state.textContent =
          result + " ms";

        state.classList.remove(
          "reactionReady"
        );

        text.textContent =
          "Tap to run another test.";

        mode = "idle";

      }

    }
  );

}


// =====================================================
// ROUTING
// =====================================================

if(path === "/") {

  home();

}

else if(path === "/dino") {

  dinoGame();

}

else if(path === "/snake") {

  snakeGame();

}

else if(path === "/pong") {

  pongGame();

}

else if(path === "/reaction") {

  reactionGame();

}

else {

  app.innerHTML = `

    <section class="hero">

      <div class="eyebrow">
        404
      </div>

      <h1>
        Game not found.
      </h1>

      <p>
        That route does not exist on this Arcade Node.
      </p>

      <p>
        <a class="back" href="/">
          Return to Arcade
        </a>
      </p>

    </section>

  `;

}

</script>

</body>
</html>
)rawliteral";


// =====================================================
// SERVE WEBSITE
// =====================================================

void sendWebsite() {

  server.send_P(
    200,
    "text/html",
    WEBSITE
  );

}


// =====================================================
// SETUP
// =====================================================

void setup() {

  Serial.begin(115200);

  delay(500);

  Serial.println();
  Serial.println();
  Serial.println("Arcade Node starting...");


  WiFi.mode(WIFI_STA);

  WiFi.hostname("arcade-node");

  WiFi.begin(
    ssid,
    password
  );


  Serial.print(
    "Connecting to SmartLink"
  );


  while (
    WiFi.status() != WL_CONNECTED
  ) {

    delay(500);

    Serial.print(".");

  }


  Serial.println();
  Serial.println();

  Serial.println(
    "WiFi connected!"
  );


  Serial.print(
    "Arcade IP: "
  );

  Serial.println(
    WiFi.localIP()
  );


  // ---------------------------------
  // mDNS
  // ---------------------------------

  if (
    MDNS.begin("arcade")
  ) {

    MDNS.addService(
      "http",
      "tcp",
      80
    );

    Serial.println(
      "Local name: http://arcade.local"
    );

  }


  // ---------------------------------
  // ROUTES
  // ---------------------------------

  server.on(
    "/",
    sendWebsite
  );

  server.on(
    "/dino",
    sendWebsite
  );

  server.on(
    "/snake",
    sendWebsite
  );

  server.on(
    "/pong",
    sendWebsite
  );

  server.on(
    "/reaction",
    sendWebsite
  );


  server.onNotFound(
    sendWebsite
  );


  server.begin();


  Serial.println();
  Serial.println(
    "Arcade server ready."
  );

}


// =====================================================
// LOOP
// =====================================================

void loop() {

  server.handleClient();

  MDNS.update();

}