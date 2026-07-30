// gameplay.js

const Game = {
    coins: 0,
    gems: 0,
    score: 0,
    currentEvent: null,
    isAdmin: true, // Cambia a false para probar un jugador normal

    addCoins(amount) {
        this.coins += amount;
        this.updateUI();
    },

    addGems(amount) {
        this.gems += amount;
        this.updateUI();
    },

    addScore(amount) {
        this.score += amount;
        this.updateUI();
    },

    updateUI() {
        const coins = document.getElementById("coins");
        const gems = document.getElementById("gems");
        const score = document.getElementById("score");

        if (coins) coins.textContent = this.coins;
        if (gems) gems.textContent = this.gems;
        if (score) score.textContent = this.score;
    },

    startEvent(eventName) {

        if (!this.isAdmin) {
            alert("Solo el administrador puede iniciar eventos.");
            return;
        }

        this.currentEvent = eventName;
        console.log("Evento iniciado:", eventName);

        switch (eventName) {

            case "Free Coins":
                console.log("🪙 ¡Lluvia de monedas!");
                break;

            case "Free Gems":
                console.log("💎 ¡Lluvia de gemas!");
                break;

            case "Asteroid":
                console.log("☄️ ¡Cuidado con los asteroides!");
                break;

            case "Trollge Event":
                console.log("👹 ¡Ha comenzado el Trollge Event!");
                break;
        }
    },

    endEvent() {
        console.log("Evento terminado:", this.currentEvent);
        this.currentEvent = null;
    }
};

// Actualiza los contadores al cargar
Game.updateUI();
