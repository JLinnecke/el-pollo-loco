class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottle;
    gameOver;
    win;
    
    level_end_x = 2050;
    level_end_y = 360;

    constructor(enemies, clouds, backgroundObjects, coins, bottle, gameOver, win) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottle = bottle;
        this.gameOver = gameOver;
        this.win = win;
    }
}
