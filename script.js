// --- SISTEMA DE SKINS DE CESTAS ---
const skinsShop = [
    { id: 'basket_base', name: 'Cesta Madera', emoji: '🧺', price: 0, purchased: true, equipped: true },
    { id: 'bucket_wood', name: 'Cubeta Vieja', emoji: '🪣', price: 50, purchased: false, equipped: false },
    { id: 'shopping_bag', name: 'Bolsa Súper', emoji: '🛍️', price: 100, purchased: false, equipped: false },
    { id: 'cart', name: 'Carrito Súper', emoji: '🛒', price: 200, purchased: false, equipped: false },
    { id: 'box', name: 'Caja Cartón', emoji: '📦', price: 250, purchased: false, equipped: false },
    { id: 'pot_gold', name: 'Olla de Barro', emoji: '🏺', price: 350, purchased: false, equipped: false },
    { id: 'backpack', name: 'Mochila Viaje', emoji: '🎒', price: 450, purchased: false, equipped: false },
    { id: 'chest', name: 'Cofre Madera', emoji: '🧰', price: 600, purchased: false, equipped: false },
    { id: 'hat_magician', name: 'Sombrero Mago', emoji: '🎩', price: 750, purchased: false, equipped: false },
    { id: 'net', name: 'Red de Pesca', emoji: '🕸️', price: 900, purchased: false, equipped: false },
    { id: 'sack', name: 'Saco de Tela', emoji: '💰', price: 1200, purchased: false, equipped: false },
    { id: 'gift_box', name: 'Caja Regalo', emoji: '🎁', price: 1500, purchased: false, equipped: false },
    { id: 'alien_ship', name: 'Rayo OVNI', emoji: '🛸', price: 1800, purchased: false, equipped: false },
    { id: 'treasure_chest', name: 'Cofre Pirata', emoji: '🏴‍☠️', price: 2500, purchased: false, equipped: false }
];

// LÓGICA DE JUEGO
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let coins = 0;
let isShopOpen = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let player = { x: canvas.width / 2, y: canvas.height - 100, size: 60 };
let coinItem = { x: Math.random() * (canvas.width - 40), y: -50, size: 40, speed: 5 };

canvas.addEventListener('mousemove', (e) => {
    if (!isShopOpen) {
        player.x = e.clientX - player.size / 2;
        if (player.x < 0) player.x = 0;
        if (player.x > canvas.width - player.size) player.x = canvas.width - player.size;
    }
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const currentSkin = skinsShop.find(s => s.equipped).emoji;

    // Dibujar Cesta (Jugador)
    ctx.font = `${player.size}px Arial`;
    ctx.textBaseline = 'top';
    ctx.fillText(currentSkin, player.x, player.y);

    // Dibujar Moneda
    ctx.font = `${coinItem.size}px Arial`;
    ctx.fillText('🪙', coinItem.x, coinItem.y);

    // Marcador
    ctx.fillStyle = '#000';
    ctx.font = "bold 24px 'Courier New', Courier, monospace";
    ctx.fillText(`Monedas: ${coins}`, 20, 90);
}

function update() {
    if (isShopOpen) return;
    coinItem.y += coinItem.speed;

    if (
        coinItem.y + coinItem.size >= player.y &&
        coinItem.x + coinItem.size >= player.x &&
        coinItem.x <= player.x + player.size &&
        coinItem.y <= player.y + player.size
    ) {
        coins += 10;
        resetCoin();
    }

    if (coinItem.y > canvas.height) {
        resetCoin();
    }
}

function resetCoin() {
    coinItem.y = -50;
    coinItem.x = Math.random() * (canvas.width - coinItem.size);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// CONTROL DE TIENDA
function toggleShop() {
    const modal = document.getElementById('shopModal');
    modal.classList.toggle('active');
    isShopOpen = modal.classList.contains('active');
    if (isShopOpen) {
        renderShop();
    }
}

function renderShop() {
    const grid = document.getElementById('skinsGrid');
    document.getElementById('shopCoins').innerText = coins;
    grid.innerHTML = '';

    skinsShop.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = `shop-item ${item.equipped ? 'equipped' : item.purchased ? 'purchased' : ''}`;
        
        let btnText = 'Comprar';
        let btnClass = 'btn-buy';
        
        if (item.equipped) {
            btnText = 'Equipado';
            btnClass = 'btn-equipped';
        } else if (item.purchased) {
            btnText = 'Equipar';
            btnClass = 'btn-equip';
        }

        itemDiv.innerHTML = `
            ${item.price > 1000 ? '<span class="badge-new">ÉPICO</span>' : ''}
            <span class="item-emoji">${item.emoji}</span>
            <div class="item-name">${item.name}</div>
            <div class="item-price">${item.purchased ? 'Obtenido' : '💰 ' + item.price}</div>
            <button class="item-btn ${btnClass}" ${!item.purchased && coins < item.price ? 'disabled' : ''} onclick="handleItemAction('${item.id}')">${btnText}</button>
        `;
        grid.appendChild(itemDiv);
    });
}

function handleItemAction(id) {
    const item = skinsShop.find(s => s.id === id);
    if (!item) return;

    if (!item.purchased) {
        if (coins >= item.price) {
            coins -= item.price;
            item.purchased = true;
        } else {
            alert('¡Te faltan monedas! Sigue jugando para conseguir más.');
            return;
        }
    } else {
        skinsShop.forEach(s => s.equipped = false);
        item.equipped = true;
        document.getElementById('currentAvatar').innerText = item.emoji;
    }
    renderShop();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Iniciar juego
gameLoop();
