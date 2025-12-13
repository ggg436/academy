// Game Configuration
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const gameState = {
    running: false,
    gameOver: false,
    score: 0,
    highScore: localStorage.getItem('dinoHighScore') || 0,
    speed: 6,
    gravity: 0.6,
    jumpForce: -12,
    currentQuestionIndex: 0,
    answeredCorrectly: false
};

const questionBank = [
    { question: "What is the correct way to declare a variable in Python?", options: ["variable x = 5", "var x = 5", "x = 5", "int x = 5"], correctIndex: 2 },
    { question: "Which symbol is used for comments in Python?", options: ["//", "#", "/* */", "<!--"], correctIndex: 1 },
    { question: "What does print() function do?", options: ["Creates a printer", "Displays output", "Prints documents", "Makes a copy"], correctIndex: 1 },
    { question: "Which data type is 'Hello'?", options: ["Integer", "Float", "String", "Boolean"], correctIndex: 2 },
    { question: "What is the result of 10 % 3 in programming?", options: ["3", "1", "0.3", "30"], correctIndex: 1 },
    { question: "Which keyword is used to create a function in JavaScript?", options: ["func", "function", "def", "create"], correctIndex: 1 },
    { question: "What does === mean in JavaScript?", options: ["Assignment", "Comparison", "Strict equality", "Not equal"], correctIndex: 2 },
    { question: "Which loop runs at least once?", options: ["for loop", "while loop", "do-while loop", "foreach loop"], correctIndex: 2 },
    { question: "What is an array?", options: ["A single value", "A collection of values", "A function", "A loop"], correctIndex: 1 },
    { question: "Which operator is used for 'AND' logic?", options: ["||", "&&", "!", "&"], correctIndex: 1 }
];

class Dinosaur {
    constructor() {
        this.width = 44; this.height = 47; this.x = 50;
        this.y = canvas.height - this.height - 50;
        this.velocityY = 0; this.jumping = false;
        this.groundY = canvas.height - this.height - 50;
    }
    jump() { if (!this.jumping) { this.velocityY = gameState.jumpForce; this.jumping = true; } }
    update() {
        this.velocityY += gameState.gravity; this.y += this.velocityY;
        if (this.y >= this.groundY) { this.y = this.groundY; this.velocityY = 0; this.jumping = false; }
    }
    draw() {
        ctx.fillStyle = '#535353';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x + 22, this.y - 13, 22, 22);
        ctx.fillStyle = 'white'; ctx.fillRect(this.x + 32, this.y - 8, 6, 6);
        ctx.fillStyle = '#535353';
        const legOffset = Math.floor(Date.now() / 100) % 2 === 0 ? 0 : 4;
        ctx.fillRect(this.x + 10, this.y + this.height, 6, 10 + legOffset);
        ctx.fillRect(this.x + 28, this.y + this.height, 6, 10 - legOffset);
        ctx.fillRect(this.x - 10, this.y + 10, 15, 6);
    }
    getHitbox() { return { x: this.x + 5, y: this.y + 5, width: this.width - 10, height: this.height - 10 }; }
}

class Obstacle {
    constructor() {
        this.width = 20 + Math.random() * 20; this.height = 40 + Math.random() * 30;
        this.x = canvas.width; this.y = canvas.height - this.height - 50; this.passed = false;
    }
    update() { this.x -= gameState.speed; }
    draw() {
        ctx.fillStyle = '#228B22'; ctx.fillRect(this.x, this.y, this.width, this.height);
        const armY = this.y + this.height * 0.3;
        ctx.fillRect(this.x - 8, armY, 8, 15); ctx.fillRect(this.x + this.width, armY, 8, 15);
    }
    isOffScreen() { return this.x + this.width < 0; }
    getHitbox() { return { x: this.x, y: this.y, width: this.width, height: this.height }; }
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
}

const dino = new Dinosaur();
const obstacles = [];
let frameCount = 0;
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const questionPanel = document.getElementById('questionPanel');
const questionText = document.getElementById('questionText');
const optionButtons = document.querySelectorAll('.option-btn');
const feedbackMessage = document.getElementById('feedbackMessage');
const currentScoreElement = document.getElementById('currentScore');
const finalScoreElement = document.getElementById('finalScore');
const finalHighScoreElement = document.getElementById('finalHighScore');
const highScoreDisplayElement = document.getElementById('highScoreDisplay');
const restartBtn = document.getElementById('restartBtn');
const startBtn = document.getElementById('startBtn');

highScoreDisplayElement.textContent = gameState.highScore;

function loadQuestion() {
    const question = questionBank[gameState.currentQuestionIndex % questionBank.length];
    questionText.textContent = question.question;
    optionButtons.forEach((btn, index) => {
        btn.textContent = question.options[index];
        btn.disabled = false;
        btn.classList.remove('correct', 'wrong');
    });
    feedbackMessage.textContent = '';
    questionPanel.classList.remove('hidden');
}

optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!gameState.running || gameState.gameOver) return;
        const selectedIndex = parseInt(btn.dataset.index);
        const question = questionBank[gameState.currentQuestionIndex % questionBank.length];
        optionButtons.forEach(b => b.disabled = true);

        if (selectedIndex === question.correctIndex) {
            btn.classList.add('correct');
            feedbackMessage.textContent = '🎉 Congratulations! Your answer is correct!';
            feedbackMessage.style.color = '#4CAF50';
            gameState.answeredCorrectly = true;
            setTimeout(() => { questionPanel.classList.add('hidden'); }, 500);
        } else {
            btn.classList.add('wrong');
            feedbackMessage.textContent = '❌ Incorrect!';
            feedbackMessage.style.color = '#f44336';
            gameState.answeredCorrectly = false;
        }
    });
});

function drawGround() {
    ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50); ctx.lineTo(canvas.width, canvas.height - 50); ctx.stroke();
    const dashOffset = (frameCount * gameState.speed) % 40;
    ctx.strokeStyle = '#999'; ctx.lineWidth = 1;
    for (let i = -dashOffset; i < canvas.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, canvas.height - 48); ctx.lineTo(i + 20, canvas.height - 48); ctx.stroke();
    }
}

function drawClouds() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    const cloudOffset = (frameCount * 2) % canvas.width;
    for (let i = 0; i < 3; i++) {
        const x = (i * 300 - cloudOffset) % canvas.width; const y = 50 + i * 30;
        ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI * 2); ctx.arc(x + 25, y, 25, 0, Math.PI * 2); ctx.arc(x + 50, y, 20, 0, Math.PI * 2); ctx.fill();
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClouds(); drawGround();
    if (gameState.running && !gameState.gameOver) {
        frameCount++; dino.update();

        // Spawn obstacle automatically every 5 seconds (300 frames at 60fps)
        if (frameCount % 300 === 0) {
            obstacles.push(new Obstacle());
        }

        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obstacle = obstacles[i];
            obstacle.update(); obstacle.draw();

            // Auto jump when obstacle is close AND answer is correct
            const distanceToObstacle = obstacle.x - dino.x;
            if (gameState.answeredCorrectly && !dino.jumping && distanceToObstacle < 150 && distanceToObstacle > 100) {
                dino.jump();
            }

            if (checkCollision(dino.getHitbox(), obstacle.getHitbox())) endGame();
            if (!obstacle.passed && obstacle.x + obstacle.width < dino.x) {
                obstacle.passed = true;
                gameState.score++;
                currentScoreElement.textContent = gameState.score;
                gameState.answeredCorrectly = false;
                // Load next question after successfully passing obstacle
                setTimeout(() => {
                    gameState.currentQuestionIndex++;
                    loadQuestion();
                }, 500);
            }
            if (obstacle.isOffScreen()) obstacles.splice(i, 1);
        }
    }
    dino.draw();
    requestAnimationFrame(gameLoop);
}

function startGame() {
    gameState.running = true; gameState.gameOver = false; gameState.score = 0; gameState.speed = 6;
    gameState.currentQuestionIndex = 0; gameState.answeredCorrectly = false; frameCount = 0; obstacles.length = 0;
    dino.y = dino.groundY; dino.velocityY = 0; dino.jumping = false;
    currentScoreElement.textContent = '0';
    startScreen.classList.add('hidden'); gameOverScreen.classList.add('hidden');
    loadQuestion();
}

function endGame() {
    gameState.gameOver = true; gameState.running = false; questionPanel.classList.add('hidden');
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('dinoHighScore', gameState.highScore);
    }
    finalScoreElement.textContent = gameState.score;
    final HighScoreElement.textContent = gameState.highScore;
    highScoreDisplayElement.textContent = gameState.highScore;
    gameOverScreen.classList.remove('hidden');
}

startBtn.addEventListener('click', () => { startGame(); });
restartBtn.addEventListener('click', () => { startGame(); });
gameLoop();
