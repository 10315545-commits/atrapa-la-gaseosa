const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Jugador
let player = { x: 400, y: 300, size: 20, color: "lime", speed: 5 };

// Balas
let bullets = [];

// Movimiento
let keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Disparos
canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const angle = Math.atan2(mouseY - player.y, mouseX - player.x);
    bullets.push({
        x: player.x,
        y: player.y,
        size: 5,
        speed: 10,
        dx: Math.cos(angle) * 10,
        dy: Math.sin(angle) * 10,
        color: "red"
    });
});

// Dibujar jugador
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);
}

// Dibujar balas
function drawBullets() {
    bullets.forEach((b, i) => {
        b.x += b.dx;
        b.y += b.dy;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x - b.size/2, b.y - b.size/2, b.size, b.size);

        // Eliminar balas fuera del canvas
        if(b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height){
            bullets.splice(i, 1);
        }
    });
}

// Actualizar posición del jugador
function movePlayer() {
    if(keys["w"] || keys["ArrowUp"]) player.y -= player.speed;
    if(keys["s"] || keys["ArrowDown"]) player.y += player.speed;
    if(keys["a"] || keys["ArrowLeft"]) player.x -= player.speed;
    if(keys["d"] || keys["ArrowRight"]) player.x += player.speed;

    // Limites del canvas
    if(player.x < player.size/2) player.x = player.size/2;
    if(player.x > canvas.width - player.size/2) player.x = canvas.width - player.size/2;
    if(player.y < player.size/2) player.y = player.size/2;
    if(player.y > canvas.height - player.size/2) player.y = canvas.height - player.size/2;
}

// Loop del juego
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePlayer();
    drawPlayer();
    drawBullets();
    requestAnimationFrame(gameLoop);
}

gameLoop();
