let level1;

/**
 * Initializes the game level by setting up enemies, clouds, backgrounds, coins, bottles, and end screens.
 */
function initLevel() {

level1 = new Level(
    [
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new Boss()
    ],
    [
        new Cloud('img/5_background/layers/4_clouds/1.png', 80),
        new Cloud('img/5_background/layers/4_clouds/2.png', 450),
        new Cloud('img/5_background/layers/4_clouds/1.png', 930),
        new Cloud('img/5_background/layers/4_clouds/1.png', 1350)
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 718),
        new BackgroundObject('img/5_background/layers/air.png', 1436),
        new BackgroundObject('img/5_background/layers/air.png', 2154),

        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1436),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2154),

        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1436),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2154),

        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1436),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2154),
    ],
    [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins()  
    ],
    [
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
    ],
    [
        new GameOver('img/9_intro_outro_screens/game_over/game over.png')
    ],
    [
        new Win('img/9_intro_outro_screens/win/won_2.png', 0)
    ],
    );
}
