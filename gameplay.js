// Objeto Game global para administrar el estado del juego
const Game = {
    coins: 0,
    gems: 0,
    score: 0,
    currentEvent: null,
    
    // Métodos para agregar recursos
    addCoins: function(amount) {
        this.coins += amount;
        this.updateUI();
    },
    
    addGems: function(amount) {
        this.gems += amount;
        this.updateUI();
    },
    
    addScore: function(amount) {
        this.score += amount;
        this.updateUI();
    },
    
    // Métodos para eventos
    startEvent: function(eventName) {
        this.currentEvent = eventName;
        console.log(`✨ Evento iniciado: ${eventName}`);
    },
    
    endEvent: function() {
        this.currentEvent = null;
        console.log('❌ Evento finalizado');
    },
    
    // Actualizar UI del juego
    updateUI: function() {
        // Actualizar elementos en el DOM si existen
        const coinsDisplay = document.querySelector('[data-coins]');
        const gemsDisplay = document.querySelector('[data-gems]');
        const scoreDisplay = document.querySelector('[data-score]');
        
        if (coinsDisplay) coinsDisplay.textContent = this.coins;
        if (gemsDisplay) gemsDisplay.textContent = this.gems;
        if (scoreDisplay) scoreDisplay.textContent = this.score;
    }
};
