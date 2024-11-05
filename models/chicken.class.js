class Chicken extends MovableObject {
    height = 80;
    y = 350;
    energy = 1;
    isDead = false;
   
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DIE = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    
    /**
    * Initializes the chicken, loads images, and starts animations.
    */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DIE);
        this.offset = {
            top: 0,
            bottom: 0,
            left: 10,
            right: 10
        };
        this.x = 250 + Math.random() * 1650;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    /**
    * Manages the chicken's movement and animations.
    */
    animate() {
        this.walkingInterval = setStopInterval(() => {
            this.moveLeft();    
        }, 1000 / 60);

        this.walkingAnimationInterval = setStopInterval(() => {
            this.handleWalkingAnimation();
        }, 200);

        this.deadAnimationInterval = setStopInterval(() => {
            this.handleDeadAnimation();
        }, 150);
    } 

    /**
    * Plays the walking animation.
    */
    handleWalkingAnimation() {
        if (!this.isDead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
    * Plays the death animation and handles the chicken's death.
    */
    handleDeadAnimation() {
        if (this.energy <= 0 && !this.isDead) { // Überprüfen, ob das Huhn bereits tot ist
            this.isDead = true; // Setze isDead auf true, um sicherzustellen, dass der Sound nur einmal abgespielt wird
            this.loadImage(this.IMAGES_DIE[0]); // Setze das Todesbild dauerhaft
            this.chickenDieAudio();
            this.speed = 0;
            this.offset = {
                top: 500,
                bottom: 0,
                left: 0,
                right: 0,
            };
            this.gravityDie();
            clearInterval(this.walkingInterval); // Stoppe die Bewegung
            clearInterval(this.walkingAnimationInterval); // Stoppe die Geh-Animation
        }
    }

    chickenDieAudio() {
        window.playSounds('chicken_die_Audio');
    }
}
