const dino = document.getElementById("dino");
const obstacle = document.querySelector(".obstacle");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

let score = 0;
let isJumping = false;
let gameOver = false;
let gamePaused = true; // start paused

// Jump
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && !isJumping && !gameOver && !gamePaused) {
    jump();
  }
});

function jump() {
  isJumping = true;
  dino.classList.add("jump");
  setTimeout(() => {
    dino.classList.remove("jump");
    isJumping = false;
  }, 500);
}

// Game Loop
const gameLoop = setInterval(() => {
  if (gameOver || gamePaused) return;

  let dinoBottom = parseInt(
    window.getComputedStyle(dino).getPropertyValue("bottom")
  );
  let obstacleRight = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("right")
  );

  // Collision check
  if (obstacleRight > 710 && obstacleRight < 790 && dinoBottom < 50) {
    endGame("💀 Game Over! Final Score: " + score);
  } else {
    score++;
    scoreDisplay.innerText = "Score: " + score;
  }

  // Win condition
  if (score >= 200) {
    endGame("🎉 Congratulations! You Win! Final Score: " + score);
  }
}, 100);

function endGame(text) {
  gameOver = true;
  gamePaused = true;
  obstacle.style.animationPlayState = "paused";
  message.innerText = text;
  message.style.display = "block";
}

// Control Buttons
startBtn.addEventListener("click", () => {
  if (!gameOver) {
    gamePaused = false;
    obstacle.style.animationPlayState = "running";
    message.style.display = "none";
  }
});

pauseBtn.addEventListener("click", () => {
  if (!gameOver) {
    gamePaused = true;
    obstacle.style.animationPlayState = "paused";
    message.innerText = "⏸ Paused";
    message.style.display = "block";
  }
});

stopBtn.addEventListener("click", () => {
  if (!gameOver) {
    endGame("⏹ Stopped! Final Score: " + score);
  }
});
