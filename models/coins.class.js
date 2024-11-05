class Coins extends MovableObject {
    x = 150;
    y = 120;
    width = 80;
    height = 80;
    coin_sound = new Audio('audio/coin.mp3');

    /**
    * Initializes the coin with a random position and loads its image.
    */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = Math.random() * 2100;
        this.y = 120 + Math.random() * 180;
        this.offset = {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
        };
    }

    /**
    * Plays the coin collection sound.
    */
    playCollectCoinAudio() {
        this.coin_sound.play();
    }
}